import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import styles2 from "../../styles/Home.module.scss";
import Image from "next/image";
import logo from "../../assets/logo.png";
import logoFundoBranco from "../../images/logoFundoBranco.jpeg";
import {
  AiOutlineHome,
  AiOutlineRead,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineBook,
  AiOutlineWhatsApp,
  AiFillPhone,
} from "react-icons/ai";
import { MdEmail, MdExitToApp } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import whatsapp from "../../lotties/whatsapp.json";
import Lottie from "react-lottie";
import { useRouter } from "next/router";
import { dataMenuAdmin } from "./dataMenu/menu-data";
import { AuthContext } from "../../contexts/AuthContext";
export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useContext(AuthContext);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: whatsapp,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const acessAdmin = router.pathname.includes("/admin");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(user?.username ? user.username : "");
  }, [user])

  const sendMessageWhatsapp = () => {
    //mandar mensagem para o whatsapp 37999980449
    //messagem: "Olá, tudo bem? gostaria de saber mais sobre produtos e serviços da empresa."
    window.open(
      `https://api.whatsapp.com/send?phone=+5537999980449&text=Olá, tudo bem? gostaria de saber mais sobre produtos e serviços da empresa.`
    );
  }
  return (
    <>
      {!acessAdmin ? (
        <div>
          <header className={styles.header}>
            <div className={styles.content_header}>
              <div className={styles.contato_header}>
                <div className={styles.redes_sociais_header}>
                  <a href="#" className={styles.link_social}>
                    <AiOutlineFacebook size={22} />
                  </a>
                  <a href="#" className={styles.link_social}>
                    <AiOutlineInstagram size={22} />
                  </a>
                  <a href="#" className={styles.link_social}>
                    <AiOutlineLinkedin size={22} />
                  </a>
                </div>
                <div className={styles.info_contato_header}>
                  <span className={styles.contato_item}>
                    <AiOutlinePhone
                      size={21}
                      className={styles.info_contato_header}
                    />{" "}
                    37 3458 0136 / 37 99857 5436
                  </span>
                  <span className={styles.contato_item}>
                    <AiOutlineMail
                      size={21}
                      className={styles.info_contato_header}
                    />{" "}
                    autojragropecas@gmail.com
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.content_navbar}>
              <nav className={styles.navbar}>
                <Link href="/">
                  <a className={styles.navlogo}>
                    <Image
                      src={logo}
                /* width={250} height={120} */ alt="produto"
                    />
                  </a>
                </Link>
                <div
                  className={
                    isOpen === false
                      ? styles.navmenu
                      : styles.navmenu + " " + styles.active
                  }
                >
                  <ul className={styles.navbar_ul}>
                    <li className={styles.navitem}>
                      <Link href="/">
                        <a
                          className={
                            isOpen === false
                              ? styles.navlink
                              : styles.navlink + " " + styles.active
                          }
                          onClick={closeMenu}
                        >
                          <AiOutlineHome className={styles.icon} />
                          Home
                        </a>
                      </Link>
                    </li>
                    <li className={styles.navitem}>
                      <Link href="/produtos">
                        <a
                          className={
                            isOpen === false
                              ? styles.navlink
                              : styles.navlink + " " + styles.active
                          }
                          onClick={closeMenu}
                        >
                          <BiShoppingBag className={styles.icon} />
                          Produtos
                        </a>
                      </Link>
                    </li>
                    <li className={styles.navitem}>
                      <Link href="/sobre">
                        <a
                          className={
                            isOpen === false
                              ? styles.navlink
                              : styles.navlink + " " + styles.active
                          }
                          onClick={closeMenu}
                        >
                          <AiOutlineRead className={styles.icon} /> Sobre
                        </a>
                      </Link>
                    </li>
                    <li className={styles.navitem}>
                      <Link href="/representantes">
                        <a
                          className={
                            isOpen === false
                              ? styles.navlink
                              : styles.navlink + " " + styles.active
                          }
                          onClick={closeMenu}
                        >
                          <FaUserFriends className={styles.icon} /> Representantes
                        </a>
                      </Link>
                    </li>
                    <li className={styles.navitem}>
                      <Link href="/comoComprar">
                        <a
                          className={
                            isOpen === false
                              ? styles.navlink
                              : styles.navlink + " " + styles.active
                          }
                          onClick={closeMenu}
                        >
                          <AiOutlineBook className={styles.icon} /> Como comprar
                        </a>
                      </Link>
                    </li>
                    <li className={styles.navitem}>
                      <Link href="/contato">
                        <a
                          className={
                            isOpen === false
                              ? styles.navlink
                              : styles.navlink + " " + styles.active
                          }
                          onClick={closeMenu}
                        >
                          <IoMdContact className={styles.icon} /> Contato
                        </a>
                      </Link>
                    </li>
                  </ul>
                  <ul className={styles.navbar_ul_redes_sociais}>
                    <a href="#" className={styles.link_social}>
                      <AiOutlineFacebook size={30} />
                    </a>
                    <a href="#" className={styles.link_social}>
                      <AiOutlineInstagram size={30} />
                    </a>
                    <a href="#" className={styles.link_social}>
                      <AiOutlineLinkedin size={30} />
                    </a>
                  </ul>
                </div>
                <div
                  className={
                    isOpen === false
                      ? styles.hamburger
                      : styles.hamburger + " " + styles.active
                  }
                  onClick={openMenu}
                >
                  <span className={styles.bar}></span>
                  <span className={styles.bar}></span>
                  <span className={styles.bar}></span>
                </div>
              </nav>
            </div>
          </header>
          {children}
          {/* {footer} */}
         
          <div
            className={
              isOpen === false
                ? styles.mascara_menu
                : styles.mascara_menu + " " + styles.mascara_menu_active
            }
            onClick={closeMenu}
          ></div>
          <div className={styles.whatsapp} onClick={sendMessageWhatsapp}>
            <Lottie options={defaultOptions} height={60} width={60} isClickToPauseDisabled={true} />
          </div>


          <div>
            <footer className={styles.footer}>
              <div className={styles.NavInformations}>
                <div className={styles.NavInformationItem}>
                  <h3>Navegue</h3>
                  <ul>
                    <li>
                      <Link href="/">
                        <a>Home</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/produtos">
                        <a>Produtos</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sobre">
                        <a>Sobre</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/representantes">
                        <a>Representantes</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/catalogo">
                        <a>Catálogo</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contato">
                        <a>Contato</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={styles.NavInformationItem}>
                  <h3>Categorias</h3>
                </div>
                <div className={styles.NavInformationItem}>
                  <h3>Atendimentos</h3>
                  <ul>
                    <li className={styles.telefoneFooter}>
                      <AiFillPhone style={{ marginRight: ".4rem" }} /> 37 3458 0136
                    </li>
                    <li className={styles.telefoneFooter}>
                      <AiFillPhone style={{ marginRight: ".4rem" }} /> 37 99857 5436
                    </li>
                    <li className={styles.emailFooter}>
                      <MdEmail size={22.5} style={{ marginRight: ".4rem" }} />
                      autojragropecas@gmail.com
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.SocialInformations}>
                <div className={styles.SocialInformationsItem}>
                  <div className={styles.imageFooter}>
                    <Image src={logoFundoBranco} alt="logo footer" layout="responsive" />
                  </div>
                </div>
                <div className={styles.SocialInformationsItem}>
                  <p>Redes Sociais</p>
                  <div className={styles.containerIcons}>
                    <a href="#"><AiOutlineFacebook size={30} /></a>
                    <a href="#"><AiOutlineInstagram size={30} /></a>
                    <a href="#"><AiOutlineWhatsApp size={30} /></a>
                  </div>
                </div>
              </div>
              <div className={styles.ReservedRights}>
                <div>
                  <p>
                    © 2021 - <strong>Jr. Agropeças</strong> Todos os direitos
                    reservados.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      ) :
      (
        <div className={styles.adminLayoutComponent}>
          <div className={styles.menuAdmin}>
            <div className={styles.welcomeUser}>
              <span><FaUserCircle size={35} style={{marginRight: ".4rem"}}></FaUserCircle> Olá, {userName}</span>
            </div>
            {dataMenuAdmin.map((item, index) => {
              return (
                <Link href={item.url} key={index}><a><span><item.icon className={styles.iconMenuOff} size={20}></item.icon> {item.name}</span></a></Link>
              )
            })}
           <a className={styles.ExitApp} onClick={logout}><span><MdExitToApp size={20} className={styles.iconMenuOff}></MdExitToApp> Sair</span></a>
          </div>
          <div className={styles.contentAdmin}>
            {children}
          </div>
          
        </div>
      )
    }
    </>
  );
}
