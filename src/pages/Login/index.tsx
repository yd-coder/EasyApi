import Welcome from '@/components/Welcome'
import LoginForm from './LoginForm'
import styles from './index.module.scss'

const Login: React.FC = () => {
	return (
		<div className={styles.container}>
			<Welcome />
			<LoginForm />
		</div>
	)
}

export default Login
