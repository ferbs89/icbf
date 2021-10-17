export function formatDateDMY(value) {
	const date = value.split('-');
	return date[2] + '/' + date[1] + '/' + date[0];
}