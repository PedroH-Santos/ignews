import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import  Head  from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";
import Link from 'next/link';

import styles from '../post.module.scss';
import { useEffect } from "react";
import { useRouter } from "next/router";
interface PostPreviewProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updated: string,
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    
    const {data: session, status} = useSession();
    const router = useRouter();
    useEffect(() => {
        if(session.activeSubscription){
            router.push(`/posts/${post.slug}`)
        }
    }, [session]);

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time> {post.updated}</time>
                    <div 
                    className={`${styles.postContent} ${styles.previewContent}`}
                    dangerouslySetInnerHTML={ {__html: post.content}} />
                
                    <div className={styles.continueReading}>
                        Wanna Continue reading?
                        <Link href="/">
                            <a href=""> Subscribe now 🤗 </a>
                        </Link>
                    </div>
                </article>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [ ],
        fallback: 'blocking' 
                // => true - post que ainda não foi gerado de forma estática o post é gerado pelo browser
                // => false - post que ainda não foi gerado retorna um 404
                // => blocking - post que ainda não foi gerado carrega esse na camada do next 
    }
}


export const getStaticProps: GetStaticProps = async ({params }) => {
    const { slug } = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('publication', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0,3)),
        updated: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })

    }

    return {
        props: { post },
        redirect: 60 *  30,
    }
}