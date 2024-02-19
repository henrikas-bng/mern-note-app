import logo from '../logo.svg';

interface IProps {
    loading?: boolean;
}

function PageLoader(props: IProps) {
    if (!props.loading)
        return <></>;
    
    return (
        <div className='fixed left-0 top-0 w-full h-full flex justify-center items-center bg-slate-100/80 backdrop-blur p-4 z-20'>
            <img src={logo} alt={process.env.REACT_APP_NAME} className='animate-spin h-24' />
        </div>
    );
}

export default PageLoader;
