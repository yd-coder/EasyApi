export interface Interface {
  id: number;
  method: string;
  path: string;
  name: string;
  state: number;
  leader: string;
  desc: string;
  creator: string;
  createdAt: string;
  changer: string;
  changedAt: string;
  catalog: string;
  tags: Tag[];
	paramCategories: Category[];
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
  nodes: Node[];
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
