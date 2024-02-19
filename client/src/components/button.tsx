import { DetailedHTMLProps } from 'react';

interface IProps extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: string;
}

function Button(props: IProps) {
    const setVariant = () => {
        switch (props.variant) {
            case 'outline-primary':
                return 'border border-slate-600 hover:border-slate-400 text-slate-600 hover:text-slate-400 px-3.5 py-1.5';
            case 'danger':
                return 'bg-red-600 hover:bg-red-500 text-slate-200 hover:text-white px-4 py-2';
            case 'outline-danger':
                return 'border border-red-600 hover:border-red-400 text-red-600 hover:text-red-400 px-3.5 py-1.5';
            case 'primary': default:
                return 'bg-slate-600 hover:bg-slate-500 text-slate-200 hover:text-white px-4 py-2';
        }
    };

    return (
        <button 
            {... props}
            className={`${setVariant()} ring-0 outline-0 rounded transition duration-150 ${props.className}`}
        >
            {props.children}
        </button>
    );
}

export default Button;
