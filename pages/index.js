import Link from 'next/link';
import { useFetch } from '../hooks/useFetch';
import Layout from '../components/layout';

export default function Home() {
	const { data, error } = useFetch('/api/cursos');

	if (error) return <p>Ocorreu um erro.</p>
	if (!data) return <p>Carregando...</p>

	return (
		<Layout>
			<table>
				<thead>
					<tr>
						<th>Cursos</th>
					</tr>
				</thead>

				<tbody>
					{data.map(curso => {
						return (
							<tr key={curso.id}>
								<td>
									<Link href={`/curso/${curso.id}`}>
										<a>{curso.nome}</a>
									</Link>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</Layout>
  	)
}