import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/not_found.page';
import LoginPage from './pages/auth/login.page';
import RegisterPage from './pages/auth/register.page';
import LogoutPage from './pages/auth/logout.page';
import HomePage from './pages/home.page';
import NotesPage from './pages/notes.page';

function App() {
	return (
		<div className='App'>
			<Routes>

				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/logout' element={<LogoutPage />} />

				<Route index element={<HomePage />} />
				<Route path='/notes' element={<NotesPage />} />

				<Route path='*' element={<NotFoundPage />} />

			</Routes>
		</div>
	);
}

export default App;
