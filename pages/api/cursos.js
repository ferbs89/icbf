import { supabase } from '../../utils/supabaseClient';

export default async(req, res) => {
	const { data, error } = await supabase
		.from('curso')
		.select('*')
		.order('nome');

	if (error)
		return res.status(400).end();
	
	return res.status(200).json(data);
}
