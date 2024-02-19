import { FormEvent, useState } from 'react';
import Alert from '../../components/alert';
import Button from '../../components/button';
import Input from '../../components/input';
import logo from '../../logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { validateUserLogin } from '../../utils/format.validation';
import axios from 'axios';

function LoginPage() {
    const navigate = useNavigate();

    const [alertVisibility, setAlertVisibility] = useState(false);

    const handleAlertShow = () => setAlertVisibility(true);
    const handleAlertClose = () => setAlertVisibility(false);

    const handleLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const inputEmail = document.getElementById('login-input-email') as HTMLInputElement;
        const inputPassword = document.getElementById('login-input-password') as HTMLInputElement;

        const email = inputEmail.value;
        const password = inputPassword.value;

        if (email && password && validateUserLogin(email, password)) {
            await axios.post('/api/user/login', {
                email: email,
                password: password,
            }).then((_) => {
                navigate('/');
            }).catch((_) => {
                handleAlertShow();
            });
        } else {
            handleAlertShow();
        }

        inputPassword.value = '';
    };

    return (
        <main className='flex justify-center items-center min-h-screen py-12'>
            <div className='container flex flex-col justify-center items-center mx-auto px-4'>
                <img 
                    src={logo} 
                    alt={process.env.REACT_APP_NAME} 
                    className='h-24 mb-4' 
                />
                <span className='text-2xl font-semibold text-slate-600 mb-24'>
                    {process.env.REACT_APP_NAME}
                </span>
                <Alert 
                    show={alertVisibility}
                    closeHandler={handleAlertClose}
                    variant='danger'
                >
                    Invalid credentials!
                </Alert>
                <form 
                    id='login-form' 
                    className='flex flex-col justify-center items-center mb-24'
                    onSubmit={handleLoginFormSubmit}
                >
                    <Input 
                        id='login-input-email' 
                        type='email' 
                        placeholder='Email address' 
                        className='mb-4'
                        required 
                    />
                    <Input 
                        id='login-input-password' 
                        type='password' 
                        placeholder='Password' 
                        className='mb-8'
                        minLength={8}
                        maxLength={32}
                        required 
                    />
                    <Button 
                        type='submit' 
                        form='login-form'
                        className='px-8'
                    >
                        Login
                    </Button>
                </form>
                <div className='flex justify-center items-center mb-4'>
                    <span className='text-slate-400'>Don't have an account?</span>
                    <Link 
                        to='/register' 
                        className='text-slate-600 hover:text-sky-500 transition duration-150 ms-2'
                    >
                        Register
                    </Link>
                </div>
                <p className='text-sm font-semibold text-slate-400'>github.com/henrikas-bng</p>
            </div>
        </main>
    );
}

export default LoginPage;
