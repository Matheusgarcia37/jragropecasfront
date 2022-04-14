import { useForm } from "react-hook-form";
import styles from "../../../styles/admin/EditarUsuarios.module.scss";
import api, { Api } from "../../../api";
import { GetServerSideProps, GetStaticProps } from "next";
import { parseCookies } from "nookies";
import Swal from "sweetalert2";
import router from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

type User = {
    id: string;
    username: string;
}

export default function EditarUsuarios() {
    const { user: auth } = useContext(AuthContext);
    const [user, setUser] = useState({
        id: "",
        username: "",
    });
    useEffect(() => {
        const getInitial = async () => {
            //get jragropecas-token of cookie
            const token = parseCookies()['jragropecas-token'];
            if (!token || !auth) {
                return router.push("/loginAdmin");
            }
            //get id of params
            const id = router.query.id;
            const apiClient = Api();
            const { data } = await apiClient.post("/user/getUserById", { id }); 
            setUser({username: data.username, id: data.id});
            reset({username: data.username});
        }
        getInitial();
    }, [auth])

    type FormData = {
        username: string;
        password: string;
    }
    const { register, handleSubmit, watch, reset  } = useForm<FormData>({
        defaultValues: {
                username: user.username ? user.username : "",
                password: ""
            }
    });

    const onSubmit = async (data: any) => {
        const { username, password } = data;
        try {
            await api.put("/user", { id: user.id, username, password });
            Swal.fire({
                title: "Sucesso!",
                text: "Usuário editado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok"
            }).then(() => {
                router.push("/admin/usuarios");
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao editar o usuário",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titleForm}>Editar Usuário</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formNovoUser}>
                <div>
                    <div className={!watch('username') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="user">Usuario</label>
                        <input type="text" className="form-control" id="user" {...register("username")} />
                    </div>
                    <div className={!watch('password') ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                        <label htmlFor="password">Senha</label>
                        <input type="password" className="form-control" id="password" {...register("password")} />
                    </div>


                    <button type="submit">Editar Usuário</button>
                </div>
            </form>
        </div>
    )
}


