export const fetchProjects = async () => {
	const url = 'http://localhost:5000/project';
	const options: any = {
		method: 'GET',
		mode: 'cors',
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	};
	try {
		const response = await fetch(url, options);
		const { business_code, business_data, business_msg } = await response.json();
		if (business_code === 0) {
			return business_data;
		} else {
			throw new Error('获取项目列表失败');
		}
	} catch(error) {
		console.log(error);
	}
}
