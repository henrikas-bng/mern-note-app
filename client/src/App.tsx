import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/not_found.page';
import HomePage from './pages/home.page';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
