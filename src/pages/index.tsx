import Head from 'next/head';
import { GetStaticProps } from 'next';
import { SubscribeButton } from '../Components/SubscribeButton';
import styles from './home.module.scss';
import { stripe } from '../services/stripe';

// Client-side (CSR) - Outros casos , sem indexação, menos processamento
// Server-side (SSR) - Dados dinâmicos em tempo real do usuário, indexação, mais processamento
// Static Site Generation (SSG) - Páginas estáticas ( mesmo conteúdo ), indexação , mais ainda processamento


//Ex: blog

//Conteudo (SSG)
//Comentários (CSR)


interface HomeProps{
  product:{
    priceId: string;
    amount: string;
  }
}

export default function Home({product} : HomeProps) {
  return (
    <>
      <Head> Home | ig.news </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome </span>
          <h1> News about the <span> React </span> world. </h1>
          <p> Get access to all the publications <br />
            <span> for {product.amount} month </span>
          </p>

          <SubscribeButton/>
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>

    </>
  )
}

export const getStaticProps : GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KJ49BDWiMzeTT8e0Hs3SNl3');
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    }).format((price.unit_amount / 100))
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
} 

