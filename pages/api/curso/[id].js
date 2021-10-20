import { supabase } from '../../../utils/supabaseClient';

export default async(req, res) => {
	const { id } = req.query;

	// Buscar curso
	const { data: cursoData, error: cursoError } = await supabase
		.from('curso')
		.select('*')
		.eq('id', id)
		.single();

	if (cursoError)
		return res.status(400).end();

	// Buscar módulos do curso
	const { data: modulosData, error: modulosError } = await supabase
		.from('modulo')
		.select('*')
		.eq('curso_id', id)
		.order('nome');

	if (modulosError)
		return res.status(400).end();

	// Buscar aulas do curso
	const { data: aulasData, error: aulasError } = await supabase
		.from('aula')
		.select(`
			id, data,
			modulo:modulo_id (nome)
		`)
		.eq('curso_id', id)
		.order('data');
	
	if (aulasError)
		return res.status(400).end();
	
	return res.status(200).json({
		curso: cursoData,
		modulos: modulosData,
		aulas: aulasData,
	});
}