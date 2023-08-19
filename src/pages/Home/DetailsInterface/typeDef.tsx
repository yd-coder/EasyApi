export type Interface = {
  id: string;
	title: string;
  method: string;
  path: string;
	desc?: string;
  state: string;
	tags?: Tag[];
	catalog: string;
  leader: string;
  createPerson: string;
  createdAt: string;
  updatePerson: string;
  updatedAt: string;
	params?: Category[];
	responses: Response[];
}

export type Tag = {
  id: string;
  name: string;
}

export type Category = {
	id: string,
	name: string,
	params: Param[]
}

export type Param = {
	id: string,
	name: string,
	type: string,
	desc?: string,
	isRequired: string,
	exampleValue?: string
}

export type Response = {
  id: string;
  name: string;
  statusCode: string;
  contentFormat: string;
  node: Node;
}

export type Node = {
  id: string;
  name: string;
  type: string;
  chineseName?: string;
  desc?: string;
  isRequired: string;
  allowNull: string;
  child?: Node[];
}

export type Mock = {
	name: string;
	source: string;
	url: string;
}
