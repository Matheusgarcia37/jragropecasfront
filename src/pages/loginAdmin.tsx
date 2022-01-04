import { ChangeEvent, useState } from 'react';
import Lottie from 'react-lottie';
import loginLottie from '../lotties/login.json'
import styles from "../styles/LoginAdmin.module.scss";
import Image from 'next/image';
import logo from '../images/logoFundoBranco.jpeg';
export default function LoginAdmin() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loginLottie,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [formLogin, setFormLogin] = useState({
        user: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newformLogin: any = { ...formLogin };
        newformLogin[e.target.name] = e.target.value;
        setFormLogin(newformLogin);
    }

    return (
        <div className={styles.container}>
            <div className={styles.illustration}>
                <Lottie options={defaultOptions}
                    height={600}
                    width={600}
                ></Lottie>
            </div>
            <div className={styles.boxLogin}>
                <div className={styles.boxHeader}>
                    <div className={styles.logoImagem}>
                        <Image src={logo} alt="logo" height={200} width={350}/>
                    </div>
                    <h3 className={styles.title}>Login</h3>
                </div>
                <div className={styles.bodyLogin}>
                    <form>
                        <div className={formLogin.user === '' ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                            <label htmlFor="user">Usuario</label>
                            <input type="text" className="form-control" id="user" onChange={handleChange} name="user" value={formLogin.user}/>
                        </div>
                        <div className={formLogin.password === '' ? styles.floatLabel : styles.floatLabel + ' ' + styles.label_active}>
                            <label htmlFor="password">Senha</label>
                            <input type="password" className="form-control" id="password" onChange={handleChange} name="password" value={formLogin.password}/>
                        </div>
                        <div className="form-group">
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" /> Lembrar-me
                                </label>
                            </div>
                        </div>
                        <button type="submit" className={styles.buttonEnter}>Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}