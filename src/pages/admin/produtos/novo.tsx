import { useForm } from "react-hook-form";
import { MdUploadFile } from "react-icons/md";
import api from "../../../api";
import styles from "../../../styles/admin/NovoProduto.module.scss"
import Image from "next/image";
import Swal from "sweetalert2";
import router from "next/router";
export default function NovoProduto() {
    type FormData = {
        codigo_interno: string;
        descricao: string;
        codigo_referencia: string;
        aplicacao: string;
        marca: string;
        preco: number;
        imagens: FileList;
        destaque: boolean;
    }
    const { register, handleSubmit, watch } = useForm<FormData>({
      
    });
    const imagensUpload = watch("imagens");
    const onSubmit = async (data: FormData) => {
        console.log(data)
        const { codigo_interno, descricao, codigo_referencia, aplicacao, marca, preco, imagens, destaque } = data;
        try {
            const formData = new FormData();
            formData.append("codigo_interno", codigo_interno);
            formData.append("descricao", descricao);
            formData.append("codigo_referencia", codigo_referencia);
            formData.append("aplicacao", aplicacao);
            formData.append("marca", marca);
            formData.append("preco", preco.toString());
            formData.append("destaque", destaque.toString());
            for(let i = 0; i < imagens.length; i++) {
                formData.append("file", imagens[i]);
            }
            
            await api.post("/produto", formData);
            Swal.fire({
                title: "Sucesso!",
                text: "Produto cadastrado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok"
            }).then(() => {
                router.push("/admin/produtos");
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao cadastrar o produto",
                icon: "error",
                confirmButtonText: "Ok"
            })
        }
    }
  
    return (
        <div className={styles.container}>
            <h1 className={styles.titleForm}>Criar Produto</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formNovoUser}>
                <div>
                    <div className={!watch('codigo_interno') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="codigo_interno">Codigo interno</label>
                        <input type="text" className="form-control" id="codigo_interno" {...register("codigo_interno")} />
                    </div>
                    <div className={!watch('descricao') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" className="form-control" id="descricao" {...register("descricao")}/>
                    </div>
                    <div className={!watch('codigo_referencia') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="codigo_referencia">Codigo de referência</label>
                        <input type="text" className="form-control" id="codigo_referencia" {...register("codigo_referencia")}/>
                    </div>
                    <div className={!watch('aplicacao') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="aplicacao">Aplicação</label>
                        <input type="text" className="form-control" id="aplicacao" {...register("aplicacao")}/>
                    </div>
                    <div className={!watch('marca') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="marca">Marca/Fornecedor</label>
                        <input type="text" className="form-control" id="marca" {...register("marca")}/>
                    </div>
                    <div className={!watch('preco') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="preco">Preço</label>
                        <input type="number" className="form-control" id="preco" {...register("preco")}/>
                    </div>
                    <div className={styles.checkbox}>
                        <input type="checkbox" className={styles.checkbox_input} id="destaque" {...register("destaque")} />
                        <label htmlFor="destaque" className={styles.checkbox_label}>Produto em destaque</label>
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
                                        <Image height={150} width={150} src={URL.createObjectURL(imagem)} alt="imagem" />
                                    </div>
                                )
                            })
                            :
                            null
                        }
                        <input type="file" className="form-control" multiple id="imagens" {...register("imagens")}/>
                    </div>

                    <button type="submit">Criar Produto</button>
                </div>
            </form>
        </div>
    )
}