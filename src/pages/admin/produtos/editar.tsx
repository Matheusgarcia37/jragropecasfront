import { useForm } from "react-hook-form";
import styles from "../../../styles/admin/EditarProdutos.module.scss";
import api, { Api } from "../../../api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { MdUploadFile } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
type Produto = {
    id: string;
    codigo_interno: string;
    descricao: string;
    codigo_referencia: string;
    aplicacao: string;
    marca: string;
    preco: number;
    uploads: Imagem[];
    destaque: boolean;
}

type Imagem = {
    id: string;
    url: string
}

export default function EditarProdutos({ produto: prod }: { produto: Produto }) {
    const [produto, setProduto] = useState<Produto>(prod);

    type FormData = {
        codigo_interno: string;
        descricao: string;
        codigo_referencia: string;
        aplicacao: string;
        marca: string;
        preco: number | string;
        imagens: FileList;
        destaque: boolean;
    }

    const { register, handleSubmit, watch } = useForm<FormData>({
        defaultValues: {
            codigo_interno: produto?.codigo_interno ? produto.codigo_interno : "",
            descricao: produto?.descricao ? produto.descricao : "",
            codigo_referencia: produto?.codigo_referencia ? produto.codigo_referencia : "",
            aplicacao: produto?.aplicacao ? produto.aplicacao : "",
            marca: produto?.marca ? produto.marca : "",
            preco: produto?.preco ? produto.preco : "",
            destaque: produto?.destaque ? produto.destaque : false,
        }
    });
    const imagensUpload = watch("imagens");

    const onSubmit = async (data: any) => {
        const { codigo_interno, descricao, codigo_referencia, aplicacao, marca, preco, imagens, destaque } = data;
        try {
            const formData = new FormData();
            formData.append("id", produto.id);
            formData.append("codigo_interno", codigo_interno);
            formData.append("descricao", descricao);
            formData.append("codigo_referencia", codigo_referencia);
            formData.append("aplicacao", aplicacao);
            formData.append("marca", marca);
            formData.append("preco", preco);
            formData.append("destaque", destaque);
            for (let i = 0; i < imagens.length; i++) {
                formData.append("file", imagens[i]);
            }
            await api.put("/produto", formData);
            atualizaProduto();
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao atualizar o produto",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

    const excluirFoto = async (e: any, imagem: Imagem) => {
        e.preventDefault();

        try {
            await api.delete(`/produto/images/${imagem.id}`);
            //removo a imagem de dentro de produto.uploads
            const newProduto = { ...produto };
            newProduto.uploads = newProduto.uploads.filter(i => i.id !== imagem.id);
            setProduto(newProduto);
        }
        catch (error: any) {
            console.log(error);
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao excluir a imagem",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

    const atualizaProduto = async () => {
        try {
            const { data } = await api.post("/produto/getProdutoById", { id: produto.id });
            setProduto(data);
            Swal.fire({
                title: "Sucesso",
                text: "Produto atualizado com sucesso",
                icon: "success",
                confirmButtonText: "Ok"
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titleForm}>Editar Produto</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formNovoProduto}>
                <div>
                    <div className={!watch('codigo_interno') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="codigo_interno">Codigo interno</label>
                        <input type="text" className="form-control" id="codigo_interno" {...register("codigo_interno")} />
                    </div>
                    <div className={!watch('descricao') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" className="form-control" id="descricao" {...register("descricao")} />
                    </div>
                    <div className={!watch('codigo_referencia') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="codigo_referencia">Codigo de referência</label>
                        <input type="text" className="form-control" id="codigo_referencia" {...register("codigo_referencia")} />
                    </div>
                    <div className={!watch('aplicacao') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="aplicacao">Aplicação</label>
                        <input type="text" className="form-control" id="aplicacao" {...register("aplicacao")} />
                    </div>
                    <div className={!watch('marca') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="marca">Marca/Fornecedor</label>
                        <input type="text" className="form-control" id="marca" {...register("marca")} />
                    </div>
                    <div className={!watch('preco') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="preco">Preço</label>
                        <input type="number" className="form-control" id="preco" {...register("preco")} />
                    </div>
                    <div className={styles.checkbox}>
                        <input type="checkbox" className={styles.checkbox_input} id="destaque" {...register("destaque")} />
                        <label htmlFor="destaque" className={styles.checkbox_label}>Produto em destaque</label>
                    </div>
                    <div>
                        <p>Imagens</p>
                        <div className={styles.containerImages}>
                            {/* mostra todas as imagens cadastradas do produto */}
                            {produto?.uploads?.map((imagem, index) => {
                                return (
                                    <div key={index} className={styles.imagem}>
                                        <Image height={150} width={150} src={imagem.url} alt="imagem" onClick={(e) => {
                                            e.preventDefault();
                                            window.open(imagem.url, '_blank');
                                        }} />
                                        <button type="button" className={styles.btn_excluir} onClick={(e) => { excluirFoto(e, imagem) }}>
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* input de imagens */}
                    <div className={styles.inputImagens}>
                        <label htmlFor="imagens"><MdUploadFile size={25}></MdUploadFile> Upload de imagens
                        </label>
                        {
                            imagensUpload && imagensUpload.length > 0 ?
                                Array.from(imagensUpload).map((imagem, index) => {
                                    return (
                                        <div key={index} className={styles.imagemUpload}>
                                            <Image height={100} width={100} src={URL.createObjectURL(imagem)} alt="imagem" />
                                        </div>
                                    )
                                })
                                :
                                null
                        }
                        <input type="file" className="form-control" multiple id="imagens" {...register("imagens")} />
                    </div>



                    <button type="submit">Editar Produto</button>
                </div>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { ['jragropecas-token']: token } = parseCookies(context);
    const { id } = context.query;
    if (!token) {
        return {
            redirect: {
                destination: '/loginAdmin',
                permanent: false
            }
        }
    }

    const apiClient = Api(context);
    const { data } = await apiClient.post("/produto/getProdutoById", { id });
    return {
        props: {
            produto: data
        }
    }
}
