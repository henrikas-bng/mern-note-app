import { ReactNode, useState, createContext, useContext, useEffect, Dispatch, SetStateAction } from 'react';
import PageLoader from './page_loader';
import Note from '../models/note';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IProps {
    children?: ReactNode;
}

const UserDataContext = createContext<Note|null>(null);
const UserDataSetterContext = createContext<Dispatch<SetStateAction<Note | null>>|undefined>(undefined);

function UserContext(props: IProps) {
    const navigate = useNavigate();
    
    const [isPageLoading, setPageLoading] = useState(false);
    const [user, setUser] = useState<Note|null>(null);

    const getLoggedInUser = async () => {
        if (!user) {
            setPageLoading(true);

            await axios.get('/api/user')
                .then((r) => {
                    setUser(r.data);
                })
                .catch((_) => {
                    setUser(null);
                    navigate('/login');
                })
                .finally(() => {
                    setPageLoading(false);
                });
        }
    };

    useEffect(() => {
        getLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserDataContext.Provider value={user}>
            <UserDataSetterContext.Provider value={setUser}>
                <PageLoader loading={isPageLoading} />
                {props.children}
            </UserDataSetterContext.Provider>
        </UserDataContext.Provider>
    );
}

export const useUserContext = () => useContext(UserDataContext);
export const useUserContextSetter = () => useContext(UserDataSetterContext);

export default UserContext;
