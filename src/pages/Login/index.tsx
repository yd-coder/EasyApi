import styles from './index.module.scss'
import logo from '@/assets/icon/icon.svg'
import welcome from '@/assets/welcome.svg'
import { Button, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
const onFinish = (values: any) => {
	console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
	console.log('Failed:', errorInfo)
}

type FieldType = {
	username?: string
	password?: string
	remember?: string
}

const Login: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
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
			<div className={styles.right}>
				<div className={styles.loginTitle}>
					<p>登录</p>
				</div>
				<Form
					name="basic"
					style={{ paddingTop: 40, width: '30vw' }}
					className={styles.loginForm}
					initialValues={{
						remember: true
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="horizontal"
				>
					<p>用户名</p>
					<Form.Item<FieldType>
						name="username"
						rules={[{ required: true, message: 'Please input your username!' }]}
					>
						<Input className={styles.loginInput} placeholder="请输入用户名" />
					</Form.Item>
					<p>密码</p>
					<Form.Item<FieldType>
						name="password"
						rules={[{ required: true, message: 'Please input your password!' }]}
					>
						<Input.Password
							className={styles.loginInput}
							placeholder="请输入密码"
						/>
					</Form.Item>

					<Form.Item style={{ textAlign: 'center' }}>
						<Button className={styles.loginButton} htmlType="submit">
							<p>Login</p>
						</Button>
					</Form.Item>
					<Form.Item style={{ textAlign: 'center' }}>
						<Link to="/register">创建账户</Link>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Login
