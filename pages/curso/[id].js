import Link from 'next/link';
import { useFetch } from '../../hooks/useFetch';
import Layout from '../../components/layout';
import { formatDateDMY } from '../../utils/functions';

export function getServerSideProps(context) {
	const { id } = context.params;
	
	return {
		props: { id }
	};
}

export default function Curso({ id }) {
	const { data, error } = useFetch(`/api/aulas?curso_id=${id}`);

	if (error) return <p>Ocorreu um erro.</p>
	if (!data) return <p>Carregando...</p>

	return (
		<Layout>
			<h1>{data.curso.nome}</h1>

			<table>
				<thead>
					<tr>
						<th width="20%">Data</th>
						<th>Módulo</th>
					</tr>
				</thead>

				<tbody>
					{data.aulas.map(aula => {
						return (
							<tr key={aula.id}>
								<td>{formatDateDMY(aula.data)}</td>
								<td>{aula.modulo.nome}</td>
							</tr>
						)
					})}
				</tbody>
			</table>

			<p>
				<Link href="/">
					<a><strong>Voltar</strong></a>
				</Link>
			</p>
		</Layout>
	)
}