import styles from './index.module.scss'
import logo from '@/assets/icon/icon.svg'
import welcome from '@/assets/welcome.svg'
const Welcome: React.FC = () => {
	return (
		<div className={styles.main}>
			<div className={styles.appIntro}>
				<div className={styles.appLogo}>
					<img src={logo} alt="" />
				</div>
				<div className={styles.appName}>EasyApi</div>
			</div>
			<div className={styles.appWelcome}>
				<img src={welcome} alt="欢迎捏" />
			</div>
		</div>
	)
}

export default Welcome
