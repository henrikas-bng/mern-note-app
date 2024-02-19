import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/not_found.page';
import HomePage from './pages/home.page';
import LoginPage from './pages/auth/login.page';
import RegisterPage from './pages/auth/register.page';
import UserContext from './components/user_context';

function App() {
	return (
		<div className='App'>
			<UserContext>
				<Routes>
					
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
		
					<Route index element={<HomePage />} />
					
					<Route path='*' element={<NotFoundPage />} />
		
				</Routes>
			</UserContext>
		</div>
	);
}

export default App;
