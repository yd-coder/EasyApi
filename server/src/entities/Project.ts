import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export default class Project {
	@PrimaryGeneratedColumn()
	id: string = ''

	@Column()
	logo: string = ''

	@Column()
	title: string = ''

	@Column()
	subTitle: string = ''

	@Column()
	summarize: string = ''

	@Column()
	createdAt: string = ''

	@Column()
	updatedAt: string = ''

	@Column({ default: null })
	deletedAt: string = ''
}
