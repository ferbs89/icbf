import { useState } from 'react';
import { mutate } from 'swr';
import { supabase } from '../utils/supabaseClient';

export default function CursoModuloNovo({ curso_id }) {
	const [nome, setNome] = useState('');
	const [aulas, setAulas] = useState('');

	async function handleCreate() {
		if (!nome || !aulas)
			return;

		const { data, error } = await supabase
			.from('modulo')
			.insert([
				{
					curso_id,
					nome,
					aulas,
				}
			]);

		if (error)
			return;

		if (data) {
			await mutate(`/api/curso/${curso_id}`);
			
			setNome('');
			setAulas('');
		}
	}

	return (
		<tr>
			<td>
				<input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
			</td>

			<td className="center">
				<input type="text" className="center" placeholder="Aulas" value={aulas} onChange={e => setAulas(e.target.value)} />
			</td>

			<td className="center">
				<button className="button" onClick={handleCreate}>Adicionar</button>
			</td>
		</tr>
	)
}
