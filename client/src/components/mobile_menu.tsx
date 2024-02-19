import { ReactNode } from 'react';

interface IProps {
    show?: boolean;
    closeHandler?: () => void;
    children?: ReactNode;
}

function MobileMenu(props: IProps) {
    if (!props.show)
        return (<></>);
    
    return (
        <div className='fixed flex flex-col justify-start items-center top-0 left-0 w-screen h-screen bg-slate-600/80 backdrop-blur py-4 px-8 z-50'>
            <div className='w-full flex justify-between items-center mb-16'>
                <span className='text-xl font-bold'>Menu</span>
                <button
                    onClick={props.closeHandler}
                    className='text-slate-300 hover:text-white transition duration-150'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div className='w-full flex flex-col justify-between items-center flex-grow'>
                {props.children}
            </div>
        </div>
    );
}

export default MobileMenu;
