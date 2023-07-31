import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { log } from 'console'

const App: React.FC = () => {
	return useRoutes(routes)
}
log('App.tsx')

export default App
