import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useState } from 'react';
import MobileMenu from './mobile_menu';

function Navbar() {
    const [mobileMenuVisibility, setMobileMenuVisibility] = useState(false);

    const handleMobileMenuOpen = () => {
        setMobileMenuVisibility(true);
        document.body.classList.add('overflow-hidden');
    };

    const handleMobileMenuClose = () => {
        setMobileMenuVisibility(false);
        document.body.classList.remove('overflow-hidden');
    };

	return (
		<nav className='bg-slate-800 text-slate-200 py-4'>
			<div className='container flex justify-between items-center mx-auto px-4'>
				<div className='flex justify-start items-center'>
					<img
						src={logo}
						alt={process.env.REACT_APP_NAME}
						className='h-8 me-2'
					/>
					<span className='text-xl font-semibold'>
						{process.env.REACT_APP_NAME}
					</span>
					<div className='hidden md:flex justify-center items-center ms-8'>
						<Link
							to='/'
							className='hover:text-sky-500 transition duration-150 me-4'
						>
							Home
						</Link>
						<Link
							to='/notes'
							className='hover:text-sky-500 transition duration-150'
						>
							Notes
						</Link>
					</div>
				</div>
                <div className='hidden md:flex bg-white/5 hover:bg-white/10 transition duration-150 rounded'>
				    <Link
				    	to='/logout'
				    	className='text-red-600 hover:text-red-500 text-sm font-semibold transition duration-150 px-2 py-1'
				    >
				    	Logout
				    </Link>
                </div>
                <button 
                    onClick={handleMobileMenuOpen}
                    className='flex md:hidden bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition duration-150 rounded px-2 py-1'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                    <span className='text-sm font-semibold ms-1'>Menu</span>
                </button>
			</div>
            <MobileMenu 
                show={mobileMenuVisibility} 
                closeHandler={handleMobileMenuClose}
            >
                <div className='flex flex-col justify-center items-center'>
                    <Link 
                        to='/' 
                        onClick={handleMobileMenuClose} 
                        className='text-2xl font-semibold text-slate-300 hover:text-white transition duration-150 mb-4'
                    >
                        Home
                    </Link>
                    <Link 
                        to='/notes' 
                        onClick={handleMobileMenuClose} 
                        className='text-2xl font-semibold text-slate-300 hover:text-white transition duration-150'
                    >
                        Notes
                    </Link>
                </div>
                <Link 
                    to='/logout' 
                    onClick={handleMobileMenuClose} 
                    className='text-lg font-semibold text-red-500 hover:text-red-300 transition duration-150'
                >
                    Logout
                </Link>
            </MobileMenu>
		</nav>
	);
}

export default Navbar;
