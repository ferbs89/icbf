import Link from 'next/link';
import { mutate } from 'swr';
import { useFetch } from '../../hooks/useFetch';
import { supabase } from '../../utils/supabaseClient';
import { formatDateDMY } from '../../utils/functions';

import Layout from '../../components/layout';
import ModuloNovo from '../../components/ModuloNovo';

export function getServerSideProps(context) {
	const { id } = context.params;
	
	return {
		props: { id }
	};
}

export default function Curso({ id }) {
	const { data, error } = useFetch(`/api/curso/${id}`);

	if (error) return <p>Ocorreu um erro.</p>
	if (!data) return <p>Carregando...</p>

	async function handleDelete(modulo_id) {
		const { data, error } = await supabase
			.from('modulo')
			.delete()
			.eq('id', modulo_id);

		if (error) {
			console.log(error);
			return;
		}

		if (data)
			await mutate(`/api/curso/${id}`);
	}

	return (
		<Layout>
			<h1>{data.curso.nome}</h1>

			<h2>Módulos</h2>

			<table>
				<thead>
					<tr>
						<th>Nome</th>
						<th className="center" width="20%">Aulas</th>
						<th className="center" width="15%">Ação</th>
					</tr>
				</thead>

				<tbody>
					{data.modulos.map(modulo => {
						return (
							<tr key={modulo.id}>
								<td>{modulo.nome}</td>
								<td className="center">{modulo.aulas}</td>
								<td>
									<button className="button" onClick={() => handleDelete(modulo.id)}>Excluir</button>
								</td>
							</tr>
						)
					})}

					<ModuloNovo curso_id={id} />
				</tbody>
			</table>

			<br/><br/>

			<h2>Aulas</h2>

			{data.aulas.length == 0 ? (
				<p>Nenhum registro encontrado.</p>
			) : (
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
			)}

			<p>
				<Link href="/">
					<a><strong>Voltar</strong></a>
				</Link>
			</p>
		</Layout>
	)
}