import { useRoutes } from 'react-router-dom'
import routes from './routes'

const App: React.FC = () => {
	return useRoutes(routes)
}

export default App
