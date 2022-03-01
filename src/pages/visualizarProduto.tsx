import Router from "next/router";
import { useEffect, useState } from "react";
import api from "../api";
import styles from "../styles/VisualizarProduto.module.scss";
import ReactLoading from 'react-loading';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import Image from "next/image";

export default function VisualizarProduto() {
    type Data = {
        id: string;
        codigo_interno: string;
        descricao: string;
        codigo_referencia: string;
        aplicacao: string;
        marca: string;
        preco: number;
        imagem: string;
    };
    //pego o id do produto que está na url
    const [done, setDone] = useState(false);
    const [produto, setProduto] = useState<Data | null>(null);
    const [imagesOfProduto, setImagesOfProduto] = useState<string[]>([]);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const imagesProds = [
        "https://www.mgapecasagricolas.com.br/imagens/informacoes/fabricantes-pecas-maquinas-agricolas-02.jpg",
        "https://image.made-in-china.com/202f0j10IUWGzowRHMrm/Investment-Casting-Farm-Machinery-Parts-Steel-Casting-Deep-Plowing-Colt-Boot-Cultivator-Points-Subsoiler-Ripper-Teeth.jpg",
        "https://sc04.alicdn.com/kf/H03dbef7e4c4340bea1e7c8de8f108dbfT.jpg",  
    ];

    const consultarPreco = (produto: Data) => {
        //enviar uma mensagem por whatsapp para o numero 5537999980449
        //com o produto.descricao e o produto.codigo_interno
        let message = `Olá, gostaria de saber se este produto está em estoque e qual o preço, informações sobre o produto: \n\n${produto.descricao}\nCodigo ${produto.codigo_interno}`;
        message = window.encodeURIComponent(message);
        window.open(
            `https://api.whatsapp.com/send?phone=5537999980449&text=${message}`
        );
    }


    useEffect(() => {
        async function loadProduto() {
            const id = Router.query.id;
            let images;
            if (id) {
                const { data } = await api.post(`/produto/getProdutoById`, { id });
                setProduto(data);

                images = data.uploads.map((upload: any) => upload.url);
            } else {
                //pega o id pela url atual
                const id = window.location.href.split('?')[1].split('=')[1];
                if (id) {
                    const { data } = await api.post(`/produto/getProdutoById`, { id });
                    console.log(data);
                    setProduto(data);
                    images = data.uploads.map((upload: any) => upload.url);
                }
            }
            setImagesOfProduto(images?.length > 0 ? images : imagesProds);
            setDone(true);
        }
        loadProduto();
    },[]);

    return (
        <>
        {done ? (
            <div className={styles.container}>
            {produto && (
                <div className={styles.content}>
                    {imagesOfProduto.length > 0 && (
                          <div className={styles.illustration}>
                          <div className={styles.destaqueImage}>
                              <Image  height={400} width={400} layout="intrinsic" src={imagesOfProduto[currentImage]} alt="imagem do produto" />
                          </div>
                          {/* div para escolher outras imagens */}
                          <div>
                              <div className={styles.buttonChangeImage}>
                                  <button onClick={() => {
                                      setCurrentImage(currentImage - 1 >= 0 ? currentImage - 1 : imagesOfProduto.length - 1);
                                  }}>
                                      <MdArrowBack size={30} color="#000" />
                                  </button>
                                  <button onClick={() => {
                                      setCurrentImage(currentImage + 1 === imagesOfProduto.length ? 0 : currentImage + 1);
                                  }}>
                                      <MdArrowForward size={30} color="#000" />
                                  </button>
                              </div>
                              <div className={styles.otherImages}>
                                  {imagesOfProduto.map((image, index) => (
                                     <div key={index} className={styles.otherImage + ' ' + (index === currentImage ? styles.activeImage : '')}>
                                          <Image height={150} width={150} src={image} alt="imagem do produto"  onClick={() => {
                                          setCurrentImage(index);
                                      }}
                                          className={index === currentImage ? styles.activeImage : ''}
                                      />
                                     </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                    )}
                    <div className={styles.description}>
                        <h2>{produto.descricao}</h2>
                        <p>Codigo de Referência: {produto.codigo_interno}</p>
                        <button className={styles.consultPrice} onClick={(e) => {
                            e.preventDefault();
                            consultarPreco(produto);
                        }}>Colsultar preço</button>
                    </div>
                </div>
            )}
        </div>
        ) 
        : (
            <div className={styles.loader}><ReactLoading type={"bars"} color={"#000"} /></div>
        )}
          
        </>
      
        
    )
}