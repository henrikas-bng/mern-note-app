import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContext, useUserContextSetter } from '../../components/user_context';
import { useEffect } from 'react';
import axios from 'axios';

function LogoutPage() {
    const navigate = useNavigate();
    const userContext = useUserContext();
    const setUserContext = useUserContextSetter();

    useEffect(() => {
        const logoutUser = async () => {
            if (userContext) {
                await axios.post('/api/user/logout')
                    .then((_) => {
                        if (setUserContext) {
                            setUserContext(null);
                            navigate('/login');
                        }
                    })
                    .catch((_) => {
                        navigate('/');
                    })
            }
        };
        
        logoutUser();
    }, [navigate, setUserContext, userContext]);

    return (
        <Navigate to='/' />
    );
}

export default LogoutPage;
