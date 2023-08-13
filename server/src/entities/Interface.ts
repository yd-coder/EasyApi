import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn
} from 'typeorm'
import { Project } from './Project'

@Entity()
export class Interface {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	path: string = '' // 请求接口

	@Column('longtext')
	title: string = '' // 接口名称

	@Column('longtext')
	desc: string = '' // 接口描述

	@Column()
	method: string = '' // 请求方式

	@Column()
	params: string = ''

	@Column()
	body: string = '' // 请求内容

	@Column()
	state: number = 0 // 接口开发状态

	@Column()
	catalog: string = '' // 目录

	@ManyToOne(() => Project, (project) => project.interfaces)
	@JoinColumn()
	project: Project

	@Column('simple-array')
	tags: string[]

	@Column({ default: '' })
	revision: string // 历史版本

	@Column({ default: '' })
	owner: string // 负责人

	@Column({ default: '' })
	leader: string // 责任人

	@Column({ default: '' })
	createPerson: string // 创建者

	@Column({ default: '' })
	updatePerson: string // 修改者

	@Column('bigint')
	createdAt: number // 创建时间

	@Column({ type: 'bigint', default: 0 })
	updatedAt: number // 修改时间

	@Column({ type: 'bigint', default: 0 })
	deletedAt: number // 删除时间
}
