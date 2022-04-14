import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { Api } from '../../api'
import styles from '../../styles/admin/DashBoard.module.scss'

export default function AcessAdmin() {
    return (
        <div className={styles.container}>
            <div>
                <h1>Bem vindo ao Sistema de Controle</h1>
            </div>
        </div>
    )
}



