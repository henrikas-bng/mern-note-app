import { useState } from 'react';
import AppLayout from './layouts/app.layout';
import image from '../assets/img/home_decor.gif';

function HomePage() {
    const [imgVisibility, setImgVisibility] = useState(false);

    const handleImgVisibilityShow = () => setImgVisibility(true);

    return (
        <AppLayout>
            <div className='container min-h-full flex justify-center items-center mx-auto px-4'>
                {imgVisibility && 
                    <img src={image} alt={process.env.REACT_APP_NAME} />}
                {!imgVisibility && 
                    <button 
                        onClick={handleImgVisibilityShow}
                        className='font-semibold text-slate-600 hover:text-slate-400 transition duration-150'
                    >
                        Click me
                    </button>}
            </div>
        </AppLayout>
    );
}

export default HomePage;
