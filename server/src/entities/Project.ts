import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Interface } from './Interface'

@Entity()
export class Project {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ default: '' })
	logo: string

	@Column({ default: '' })
	title: string

	@Column({ default: '' })
	subTitle: string

	@OneToMany(() => Interface, (interfaces) => interfaces.project)
	interfaces: Interface[]

	@Column({ default: '' })
	desc: string

	@Column('bigint')
	createdAt: number

	@Column({ type: 'bigint', default: 0 })
	updatedAt: number

	@Column({ type: 'bigint', default: 0 })
	deletedAt: number
}
