import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import formatData from "../../../services/formatData";
import { Api } from "../../../api";
import api from "../../../api";
import Link from "next/link";
import styles from '../../../styles/admin/Usuarios.module.scss';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import Swal from "sweetalert2";
type Users = [
    {
        id: string;
        username: string;
        createdAt: string;
        updatedAt: string;
    }
]
export default function Usuarios() {
    const [usuarios, setUsuarios] = useState<Users | []>([]);
    useEffect(() => {
        const getUsers = async () => {
            const { data } = await api.get("/user");
            setUsuarios(data);
        }
        getUsers();
    }, []);

    const deleteUser = async (e: any, id: string) => {
        e.preventDefault();
        try {
            await api.delete(`/user`, {data: {id}});
            const newUsers: any = usuarios.filter((user) => user.id !== id);
            setUsuarios(newUsers);
            Swal.fire({
                title: "Usuário deletado com sucesso!",
                icon: "success",
                confirmButtonText: "Ok"
            });
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Erro",
                text: "Ocorreu um erro ao deletar o usuário",
                icon: "error",
                confirmButtonText: "Ok"
            });
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.headerContent}>
                <h1>Usuarios</h1>
                {/* botâo para criar novos usuarios */}
                <Link href="/admin/usuarios/novo">
                    <a className={styles.buttonNovoUsuario}>
                        Criar Usuario
                    </a>
                </Link>
            </div>
            <div className={styles.containerTableUsuarios}><table className={styles.tableUsuarios}>
                <thead className={styles.headerTableUsuarios}>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Data de criação</th>
                        <th>Ultima atualização</th>
                        <th>Editar</th>
                        <th>Deletar</th>
                    </tr>
                </thead>
                <tbody className={styles.bodyTableUsuarios}>
                    {usuarios.map((usuario, key) => (
                        <tr key={usuario.id} className={styles.contentTableUsuarios}>
                            <td>{key + 1}</td>
                            <td>{usuario.username}</td>
                            <td>{formatData(usuario.createdAt)}</td>
                            <td>{formatData(usuario.updatedAt)}</td>
                            <td>
                                <Link href={{
                                    pathname: `/admin/usuarios/editar`,
                                    query: { id: usuario.id }
                                }}>

                                    <a className={styles.iconButton}><FaEdit size={22}></FaEdit></a>
                                </Link>

                            </td>
                            <td>
                                <RiDeleteBinFill onClick={(e) => deleteUser(e, usuario.id)} size={22} className={styles.iconButton}></RiDeleteBinFill>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

        </div>
    )
}