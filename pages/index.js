import Link from 'next/link';
import { useFetch } from '../hooks/useFetch';

import Layout from '../components/Layout';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Home() {
	const { data, error } = useFetch('/api/cursos');

	if (error) return <Error />
	if (!data) return <Loading />

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
