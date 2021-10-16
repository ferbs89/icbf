import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

import { useFetch } from '/hooks/useFetch';

export default function Home() {
	const { data, error } = useFetch('/api/cursos');

	if (error) return <p>Error</p>
	if (!data) return <p>Loading</p>

	return (
		<div className={styles.container}>
			<Head>
				<title>iC BF</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h2>Cursos</h2>

				<div className={styles.grid}>
					{data.map(curso => {
						return (
							<Link key={curso.id} href={`/curso/${curso.id}`}>
								<a className={styles.card}>{curso.nome}</a>
							</Link>
						)
					})}
				</div>
			</main>
		</div>
  	)
}