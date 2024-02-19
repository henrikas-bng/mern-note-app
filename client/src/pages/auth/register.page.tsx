import { ChangeEvent, FormEvent, useState } from 'react';
import Alert from '../../components/alert';
import Button from '../../components/button';
import Input from '../../components/input';
import logo from '../../logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateUserRegister } from '../../utils/format.validation';

function RegisterPage() {
    const navigate = useNavigate();

    const [alertVisibility, setAlertVisibility] = useState(false);
    const [isPswConfirmValid, setPswConfirmValid] = useState<boolean|undefined>(undefined);

    const handleAlertShow = () => setAlertVisibility(true);
    const handleAlertClose = () => setAlertVisibility(false);

    const validatePswConfirm = () => setPswConfirmValid(true);
    const invalidatePswConfirm = () => setPswConfirmValid(false);

    const getValidity = () => {
        if (isPswConfirmValid === undefined) {
            return isPswConfirmValid;
        } else {
            if (isPswConfirmValid) {
                return '1';
            } else {
                return '';
            }
        }
    };
    
    const handlePswConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
        const pswConfirmVal = e.currentTarget.value;
        
        if (pswConfirmVal) {
            const pswInput = document.getElementById('register-input-password') as HTMLInputElement;
            const pswVal = pswInput.value;

            (pswConfirmVal === pswVal)
                ? validatePswConfirm()
                : invalidatePswConfirm();
        } else {
            invalidatePswConfirm();
        }
    };

    const handleRegisterFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const inputEmail = document.getElementById('register-input-email') as HTMLInputElement;
        const inputPassword = document.getElementById('register-input-password') as HTMLInputElement;
        const inputPasswordConf = document.getElementById('register-input-conf-password') as HTMLInputElement;

        const email = inputEmail.value;
        const password = inputPassword.value;
        const passwordConfirm = inputPasswordConf.value;

        if (email && password && passwordConfirm) {
            if (validateUserRegister(email, password, passwordConfirm)) {
                await axios.post('/api/user/register', {
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
        } else {
            handleAlertShow();
        }

        inputPassword.value = '';
        inputPasswordConf.value = '';
        setPswConfirmValid(undefined);
    };

    return (
        <main className='flex justify-center items-center min-h-screen py-12'>
            <div className='container flex flex-col justify-center items-center mx-auto px-4'>
                <div className='flex justify-center items-center mb-2'>
                    <img 
                        src={logo} 
                        alt={process.env.REACT_APP_NAME} 
                        className='h-10 me-1' 
                    />
                    <span className='text-2xl font-semibold text-slate-600'>
                        {process.env.REACT_APP_NAME}
                    </span>
                </div>
                <h2 className='text-lg font-semibold text-slate-400 mb-24'>
                    Create an account
                </h2>
                <Alert 
                    show={alertVisibility}
                    closeHandler={handleAlertClose}
                    variant='danger'
                >
                    Check input and try again!
                </Alert>
                <form id='register-form' className='flex flex-col justify-center items-center mb-24' onSubmit={handleRegisterFormSubmit}>
                    <Input 
                        id='register-input-email' 
                        type='email' 
                        placeholder='Email address' 
                        className='mb-4'
                        required 
                    />
                    <Input 
                        id='register-input-password' 
                        type='password' 
                        placeholder='Password' 
                        className='mb-4'
                        minLength={8}
                        maxLength={32}
                        required 
                    />
                    <Input 
                        id='register-input-conf-password' 
                        type='password' 
                        placeholder='Confirm password' 
                        className='mb-8'
                        onChange={handlePswConfirmChange}
                        validity={getValidity()}
                        minLength={8}
                        maxLength={32}
                        required 
                    />
                    <Button 
                        type='submit' 
                        form='register-form'
                        className='px-8'
                    >
                        Register
                    </Button>
                </form>
                <div className='flex justify-center items-center mb-4'>
                    <span className='text-slate-400'>Already have an account?</span>
                    <Link 
                        to='/login' 
                        className='text-slate-600 hover:text-sky-500 transition duration-150 ms-2'
                    >
                        Login
                    </Link>
                </div>
                <p className='text-sm font-semibold text-slate-400'>github.com/henrikas-bng</p>
            </div>
        </main>
    );
}

export default RegisterPage;
