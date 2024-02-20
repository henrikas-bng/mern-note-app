import { useNavigate } from 'react-router-dom';
import { useUserContextSetter } from '../../components/user_context';
import { useEffect } from 'react';
import axios from 'axios';
import PageLoader from '../../components/page_loader';

function LogoutPage() {
    const navigate = useNavigate();
    const setUserContext = useUserContextSetter();

    const logoutUser = async () => {
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
    };

    useEffect(() => {        
        logoutUser();
    });

    return (
        <PageLoader loading={true} />
    );
}

export default LogoutPage;
