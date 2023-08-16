export interface Interface {
  id: number;
	title: string;
  method: string;
  path: string;
	desc: string;
  state: number;
	tags: Tag[];
	catalog: string;
  leader: string;
  createPerson: string;
  createdAt: string;
  updatePerson: string;
  updatedAt: string;
	params: Category[];
	responses: Response[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface Category {
	id: number,
	name: string,
	params: Param[]
}

export interface Param {
	id: number,
	name: string,
	type: string,
	desc: string,
	isRequired: string,
	exampleValue: string
}

export interface Response {
  id: number;
  name: string;
  statusCode: number;
  contentFormat: string;
  node: Node;
}

export interface Node {
  id: number;
  name: string;
  type: string;
  chineseName: string;
  desc: string;
  isRequired: string;
  allowNull: string;
  child?: Node[];
}

export interface Mock {
	id: number;
	name: string;
	source: string;
	url: string;
}
