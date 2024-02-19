import { ReactNode } from 'react';

interface IProps {
    show?: boolean;
    closeHandler?: () => void;
    variant?: string;
    className?: string;
    children?: ReactNode;
}

function Alert({ show, closeHandler, variant, className, children }: IProps) {
    const setVariant = () => {
        switch (variant) {
            case 'success':
                return 'bg-green-300 text-green-700';
            case 'danger':
                return 'bg-red-300 text-red-700';
            case 'warning':
                return 'bg-amber-300 text-amber-700';
            case 'info': default:
                return 'bg-sky-300 text-sky-700';
        }
    };

    const setVisibility = () => {
        if (show)
            return 'flex';

        return 'hidden';
    };

    return (
        <div className={`${setVariant()} ${setVisibility()} justify-between items-center min-w-[128px] max-w-[512px] font-semibold rounded px-4 py-2 my-4 ${className}`}>
            {children}
            <button onClick={closeHandler} className='hover:text-white transition duration-150 ms-8'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

export default Alert;
