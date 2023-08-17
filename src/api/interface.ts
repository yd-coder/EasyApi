const preurl = '/api/v1/'

const tokenCheck = () => {
	const token = localStorage.getItem('token')
	if (!token) return ''
	else return token
}

export async function postCreateInterface(url: string, data: any) {
	let token = tokenCheck()
	const res = await fetch(preurl + url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: token
		},
		body: JSON.stringify(data)
	})

	return res.json()
}
