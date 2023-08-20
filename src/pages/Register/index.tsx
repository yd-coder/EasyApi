import Welcome from '@/components/Welcome'
import RegisterForm from './RegisterForm'
import styles from './index.module.scss'

const Register: React.FC = () => {
	return (
		<div className={styles.container}>
			<Welcome />
			<RegisterForm />
		</div>
	)
}

export default Register
