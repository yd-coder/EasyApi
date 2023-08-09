import { ApiResponseProps } from '../types'

const defaultRes = {
	business_code: 0,
	business_msg: '',
	business_data: {
		// id: string,
		// createdAt: string,
		// updatedAt: string,
		// deletedAt: string,
		// username: string
	}
}

// 接口统一的响应格式
export class ApiResponse {
	res: ApiResponseProps = {}

	constructor(params: ApiResponseProps) {
		this.res = Object.assign({}, defaultRes, params)
	}

	toJSON() {
		return this.res
	}
}
