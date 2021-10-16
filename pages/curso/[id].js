import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

import { useFetch } from '../../hooks/useFetch';

export function getServerSideProps(context) {
	const { id } = context.params;
	
	return {
		props: {
			id,
		}
	};
}

export default function Curso({ id }) {
	const { data, error } = useFetch(`/api/aulas?curso_id=${id}`);

	if (error) return <p>Error</p>
	if (!data) return <p>Loading</p>

	return (
		<div className={styles.container}>
			<Head>
				<title>iC BF</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h2>{data.curso.nome}</h2>

				<div className={styles.grid}>
					{data.aulas.map(aula => {
						return (
							<a key={aula.id} className={styles.card}>
								<p>{aula.data}</p>
								{aula.modulo.nome}
							</a>
						)
					})}
				</div>

				<Link href="/">
					<a>Voltar</a>
				</Link>
			</main>
		</div>
	)
}