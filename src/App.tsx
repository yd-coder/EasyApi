import { useRoutes } from 'react-router-dom'
import 'antd/dist/antd.css'
import routes from './routes'

const App: React.FC = () => {
	return useRoutes(routes)
}

export default App
