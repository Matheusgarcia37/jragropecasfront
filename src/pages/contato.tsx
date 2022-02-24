import styles from '../styles/Contato.module.scss';
import { BsWhatsapp, BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { GrLocation } from 'react-icons/gr'

const Contato = () => {
  return (
    <div className={styles.container}>
      <div className={styles.informationsContato}>
        <div className={styles.linha}>
          <h2> Contatos</h2>
        </div>
        <div className={styles.linha}>
          <div className={styles.icon}>
            <BsWhatsapp />
          </div>
          <p>WhatsApp: (37) 99857 5436</p>
        </div>
        <div className={styles.linha}>
          <div className={styles.icon}>
            <BsTelephone />
          </div>
          <p>Telefone: (37) 3458 0136</p>
        </div>
        <div className={styles.linha}>
          <div className={styles.icon}>
            <AiOutlineMail />
          </div>
          <p>E-mail: autojragropecas@gmail.com</p>
        </div>
        <div className={styles.linha}>
          <div className={styles.icon}>
            <GrLocation />
          </div>
        <p>Endereço: </p>
        </div>
      </div>
    </div>
  );
}

export default Contato;