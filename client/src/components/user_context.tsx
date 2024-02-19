import { ReactNode, useState } from 'react';
import PageLoader from './page_loader';

interface IProps {
    children?: ReactNode;
}

function UserContext(props: IProps) {
    const [isPageLoading, setPageLoading] = useState(true);

    return (
        <>
            <PageLoader loading={isPageLoading} />
            {props.children}
        </>
    );
}

export default UserContext;
