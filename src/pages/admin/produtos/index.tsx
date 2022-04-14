import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import formatData from "../../../services/formatData";
import { Api } from "../../../api";
import api from "../../../api";
import Link from "next/link";
import styles from '../../../styles/admin/Produtos.module.scss';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import * as XLSX from 'xlsx';
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Table from "../../../components/table/index";

type Produtos = [
    {
        id: string;
        codigo_interno: string;
        descricao: string;
        codigo_referencia: string;
        aplicacao: string;
        marca: string;
        marcaId: string;
        createdAt: string;
        updatedAt: string;
    }
]
export default function Produtos() {
    const [produtos, setProdutos] = useState<Produtos | []>([]);
    const [produtosData, setProdutosData] = useState<Produtos | []>([]);

    const { register, handleSubmit } = useForm({});

    const MAX_ITEMS = 9;
    const MAX_LEFT = (MAX_ITEMS - 1) / 2;
    const limit = 100;
    const [offset, setOffset] = useState(0);


    const pages = Math.ceil(produtos.length / limit);

    const current = offset ? (offset / limit) + 1 : 1;

    const firstPage = Math.max(current - MAX_LEFT, 1);

    const currentItens = produtos.slice(offset, offset + limit);


    const changePage = (page: any) => {
        setOffset((page - 1) * limit)
    }

    useEffect(() => {
        const getProdutos = async () => {
            const { data } = await api.get('/produto');
            setProdutosData(data);
            setProdutos(data);
        }
        getProdutos();
    }, []);

    const deleteProduto = async (e: any, id: string) => {
        e.preventDefault();
        try {
            await api.delete(`/produto`, { data: { id } });
            const newProdutos: any = produtos.filter((produto) => produto.id !== id);
            setProdutos(newProdutos);
        } catch (error: any) {
            console.log(error)
            Swal.fire({
                title: 'Erro',
                text: error.response.data.error,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }
    }

    const changeImages = async (e: any, id: string, produto: any) => {
        e.preventDefault();
        try {
            console.log(e.target.files);
            const formData = new FormData();
            for (let i = 0; i < e.target.files.length; i++) {
                formData.append('file', e.target.files[i]);
            }
            formData.append('id', id);
            const { data } = await api.put(`/produto/images`, formData);
            e.target.value = "";

            if(data){
                produto.uploads.push({
                    files: e.target.files
                })
                setProdutos([...produtos]);
            }
           
        } catch (error: any) {
            console.log(error)
            Swal.fire({
                title: 'Erro ao enviar imagens',
                text: `${error.response.data.error}`,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    const readExel = async (file: any) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e: any) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });

                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            }

            file.onerror = (err: any) => {
                reject(err);
            }
        });

        const data: any = await promise;
        console.log("daata", data);
        const newProdutos = data.map((produto: any) => {
            return {
                codigo_interno: produto.codigo_interno || '',
                descricao: produto.descricao || '',
                codigo_referencia: produto.codigo_referencia || '',
                aplicacao: produto.aplicacao || '',
                marca: produto.marca || '',
                createdAt: produto.createdAt,
                updatedAt: produto.updatedAt
            }
        });

        //enviar produtos para o banco de dados
        try {
            const { data } = await api.post("/produto/import", newProdutos);
            setProdutos(data);
        } catch (error) {
            console.log(error);
        }
    }

    const filterProds = (e: any) => {
        let search = e.descricao.toLowerCase();
        const newProds: any = produtosData.filter((produto: any) => {
            return produto.descricao.toLowerCase().includes(search);
        })
        console.log('newProds', newProds);
        if (newProds) setProdutos(newProds);
        setOffset(0);
    }

    // <th>Codigo</th>
    //                     <th>Descricao</th>
    //                     <th>Codigo de referência</th>
    //                     <th>Aplicação</th>
    //                     <th>Marca</th>
    //                     <th>Data de criação</th>
    //                     <th>Ultima atualização</th>
    //                     <th>Imagens</th>
    //                     <th>Editar</th>
    //                     <th>Deletar</th>
    const columns = [
        {
            name: "Codigo",
        },
        {
            name: "Descricao",
        },
        {
            name: "Codigo de referência",
        },
        {
            name: "Aplicação",
        },
        {
            name: "Marca",
        },
        {
            name: "Data de criação",
        },
        {
            name: "Ultima atualização",
        },
        {
            name: "Imagens",
        },
        {
            name: "Editar",
        },
        {
            name: "Deletar",
        }
    ];


    return (
        <div className={styles.container}>
            <div className={styles.headerContent}>
                <h1>Produtos</h1>
                {/* botâo para criar novos produtos */}
                <div>
                    <input
                        type="file" style={{ display: 'none' }} name="inputXlsx" id="inputXlsx"
                        onChange={(e: any) => {
                            const file = e.target.files[0];
                            readExel(file);
                            e.target.value = "";

                        }}
                    />
                    <label htmlFor="inputXlsx" className={styles.buttonNovoProduto}>Importar produtos</label>
                    <Link href="/admin/produtos/novo">
                        <a className={styles.buttonNovoProduto}>
                            Criar Produto
                        </a>
                    </Link>
                </div>
            </div>
            <form onSubmit={handleSubmit(filterProds)} className={styles.filtroProduto}>
                <input type="text" placeholder="Pesquisar produtos" className={styles.inputPesquisa} {...register('descricao')} />
                <button className={styles.caixaIconePesquisa}><AiOutlineSearch /></button>
            </form>
            <div className={styles.pagination}>
                <button className={styles.ant_next} onClick={() => changePage(current - 1)} disabled={current == 1}>
                    <MdArrowBack></MdArrowBack>
                </button>
                {Array.from(Array(Math.min(MAX_ITEMS, pages)), (_, index) => {
                    return index + firstPage;
                }).map((page: any, key) => {
                    if (page <= pages) {
                        return (
                            (
                                <button key={key} onClick={() => {
                                    changePage(page);
                                }} className={page === current ? styles.active_pagination + ' ' + styles.pagination_pagina : styles.pagination_pagina}>{page}</button>
                            )
                        )
                    }
                })}
                <button className={styles.ant_next} disabled={current == pages} onClick={() => changePage(current + 1)}>
                    <MdArrowForward></MdArrowForward>
                </button>
            </div>

            <Table data={currentItens as any} columns={columns}  changeImages={changeImages} deletarItem={deleteProduto}/>

            {/*  <div className={styles.containerTableProdutos}><table className={styles.tableProdutos}>
                <thead className={styles.headerTableProdutos}>
                    <tr>
                        <th>Codigo</th>
                        <th>Descricao</th>
                        <th>Codigo de referência</th>
                        <th>Aplicação</th>
                        <th>Marca</th>
                        <th>Data de criação</th>
                        <th>Ultima atualização</th>
                        <th>Imagens</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody className={styles.bodyTableProdutos}>
                    {currentItens.map((produto, key) => (
                        <tr key={key} className={styles.contentTableProdutos}>
                            <td>{produto.codigo_interno}</td>
                            <td>{produto.descricao || "Produto sem nome"}</td>
                            <td>{produto.codigo_referencia}</td>
                            <td>{produto.aplicacao}</td>
                            <td>{produto.marca}</td>
                            <td>{formatData(produto.createdAt)}</td>
                            <td>{formatData(produto.updatedAt)}</td>
                            <td>

                                <label htmlFor={`images${key}`}>
                                    <IoMdImages size={25} className={styles.iconButton}></IoMdImages>
                                </label>
                                <input type="file" className="form-control" multiple id={`images${key}`} style={{ display: 'none' }} onChange={(e) => changeImages(e, produto.id)}
                                />
                            </td>
                            <td>
                                <Link href={{
                                    pathname: `/admin/produtos/editar`,
                                    query: { id: produto.id }
                                }}>

                                    <a className={styles.iconButton}><FaEdit size={22}></FaEdit></a>
                                </Link>

                            </td>
                            <td>
                                <RiDeleteBinFill onClick={(e) => deleteProduto(e, produto.id)} size={22} className={styles.iconButton}></RiDeleteBinFill>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div> */}

        </div>
    )
}
