import styles from '../styles/ComoComprar.module.scss';

const ComoComprar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.informationsContato}>
        <h3>COMO COMPRAR</h3>
        <h2>Aqui na Jr Agropeças você pode comprar suas peças por WhatsApp</h2>
       {/* criar uma lista numerada 
        Escolha o produto que deseja comprar.
        Clique no botão de "Comprar pelo WhatsApp".
        Você será direcionado para o WhatsApp do nosso vendedor.
        Envie o código ou a referência da peça que você precisa.
        Escolha a transportadora que melhor lhe atender.
        Você pode escolher sua forma de pagamento, PIX, cartão, boleto.
        Após o pagamento sua peça já será despachada.
        E é só esperar que a peça chegará na sua casa!
       */}
        <ul>
          <li>
            <span>1.</span>
            Escolha o produto que deseja comprar.
          </li>
          <li>
            <span>2.</span>
            Clique no botão de "Consultar preço".
          </li>
          <li>
            <span>3.</span>
            Você será direcionado para o WhatsApp do nosso vendedor.
          </li>
          <li>
            <span>4.</span>
            Envie o código ou a referência da peça que você precisa.
          </li>
          <li>
            <span>5.</span>
            Escolha a transportadora que melhor lhe atender.
          </li>
          <li>
            <span>6.</span>
            Você pode escolher sua forma de pagamento, PIX, cartão, boleto.
          </li>
          <li>
            <span>7.</span>
            Após o pagamento sua peça já será despachada.
          </li>
          <li>
            <span>8.</span>
            E é só esperar que a peça chegará na sua casa!
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ComoComprar;