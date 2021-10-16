import { supabase } from '../../utils/supabaseClient';

export default async(req, res) => {
	const { curso_id } = req.query;

	let { data: cursoData, error: cursoError } = await supabase
		.from('curso')
		.select('*')
		.eq('id', curso_id)
		.single();

	if (cursoError)
		return res.status(400).end();

	let { data: aulasData, error: aulasError } = await supabase
		.from('aula')
		.select(`
			id, curso_id, modulo_id, data,
			modulo (
				id, nome, qtde_aulas
			)
		  `)
		.eq('curso_id', curso_id)
		.order('data');
	
	if (aulasError)
		return res.status(400).end();
	
	return res.status(200).json({
		curso: cursoData,
		aulas: aulasData,
	});
}