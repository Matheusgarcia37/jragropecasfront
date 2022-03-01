import styles from "../styles/Produtos.module.scss";
import Image from "next/image";
import { AiOutlineSearch } from "react-icons/ai";
import Select from 'react-select'
import { useEffect, useState } from "react";
import api, { Api } from "../api";
import { GetServerSideProps } from "next";
import ReactLoading from 'react-loading';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { useForm } from "react-hook-form";
import Router from 'next/router';
const Produtos = () => {
  type Data = {
    id: string;
    nome: string;
    descricao: string;
    codigo: string;
    preco: number;
    imagem: string;
    uploads: Image[];
  };

  type Image = {
    id: string; 
    url: string 
  };

  const [done, setDone] = useState(false);

  const [produtosData, setProdutosData] = useState<Data[] | []>([]);
  const [produtos, setProdutos] = useState<Data[] | []>([]);


  const MAX_ITEMS = 9;
  const MAX_LEFT = (MAX_ITEMS - 1) / 2;
  const limit = 100;
  const [offset, setOffset] = useState(0);


  const pages = Math.ceil(produtos.length / limit);

  const current = offset ? (offset / limit) + 1 : 1;

  const firstPage = Math.max(current - MAX_LEFT, 1);

  const currentItens = produtos.slice(offset, offset + limit);

  const {register, handleSubmit} = useForm({});


  const optionsRelevancia = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const optionsModelo = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const optionsCategoria = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  

  const filterProds = (e: any) => {
    const { descricao } = e;
    const produtosFiltrados = produtosData.filter(produto => produto.descricao.toLowerCase().includes(descricao.toLowerCase()));
    setProdutos(produtosFiltrados);
    setOffset(0);
  }

  useEffect(() => {
    const getProducts = async () => {
      const { data } = await api.get('/produto');
      setProdutosData(data);
      setProdutos(data);
      setDone(true);
    }
    getProducts();
  }, [])

  const changePage = (page: any) => {
    setOffset((page - 1) * limit)
  }
  return (
    <div className={styles.container}>
      <div className={styles.filtroInfo}>
        <div>
          <p>Categorias</p>
          <ul>
            <li>Apparel</li>
            <li>Shop All</li>
          </ul>
        </div>

        <div>
          <p>Modelos</p>
          <ul>
            <li>teste1</li>
            <li>teste2</li>
          </ul>
        </div>
      </div>

      <div className={styles.containerProdutos}>
        <div className={styles.headerProduto}>
          <h3>{produtos.length === 1 ? `Foi encontrado ${produtos.length} produto` : `Foram encontrados ${produtos.length} produtos`}</h3>
          <div className={styles.filtroPorPesquisa}>
           <form onSubmit={handleSubmit(filterProds)}>
            <input type="text" placeholder="Pesquisar produtos" className={styles.inputPesquisa} {...register('descricao')}/>
              <button className={styles.caixaIconePesquisa}><AiOutlineSearch/></button>
           </form>
          </div>
          <div className={styles.selectsFilterMobile}>
            <div className={styles.selectfilterMovile}><Select options={optionsCategoria} /></div>
            <div className={styles.selectfilterMovile}><Select options={optionsModelo} /></div>
            <div className={styles.selectfilterMovile}><Select options={optionsRelevancia} /></div>
          </div>
        </div>

        {
          done ?
            <div className={styles.boxProdutos}>
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
              <div className={styles.contentProdutos}>
                {currentItens.map((produto, key) => {
                  return (
                    <div className={styles.contentProduto} key={key} onClick={() => {
                      //envio para a pagina de visualizar produto com a query produto.id
                      Router.push({
                        pathname: '/visualizarProduto', query: { id: produto.id }
                      })
                    }}>
                      <div className={styles.imageProduto}>
                        <Image
                          src={produto.uploads[0]?.url || "https://via.placeholder.com/300x300"}
                          width={200}
                          height={200}
                          alt="produto"
                        />
                      </div>
                      <div className={styles.informationsProduto}>
                        <p>{produto.descricao || 'Produto sem nome'}</p>
                        {/* <p>{produto.descricao}</p> */}
                      </div>
                    </div>
                  );
                })}
              </div>
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
            </div>
            : <div className={styles.loader}><ReactLoading type={"bars"} color={"#000"}  /></div>
        }
      </div>

      <div className={styles.filtroPorRelevancia}>
        <p>Relevancia</p>
        <ul>
          <li>Preço</li>
          <li>Vendidos</li>
          <li>Data de lançamento</li>
          <li>Valor</li>
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {

    }
  }
}



export default Produtos;
