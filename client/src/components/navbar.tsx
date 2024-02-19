import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className='bg-slate-800 text-slate-200 py-4'>
            <div className='container mx-auto px-4'>
                <p>Navbar</p>
                <Link to='/logout'>Logout</Link>
            </div>
        </nav>
    );
}

export default Navbar;
