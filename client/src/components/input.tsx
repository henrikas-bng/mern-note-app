import { DetailedHTMLProps } from 'react';

interface IProps extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    validity?: string|undefined;
}

function Input(props: IProps) {
    const setFieldValidation = () => {
        if (props.validity !== undefined) {
            if (props.validity === '1')
                return 'border-green-400 focus:outline-0';

            return 'border-red-400 focus:outline-0';
        } else {
            return 'border-slate-200 focus:outline-2';
        }
    };

    if (props.type === 'textarea')
        return (
            <textarea 
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                className={`min-h-[64px] max-h-[128px] ring-0 border focus:outline-sky-400/25 transition duration-150 rounded px-4 py-2 ${props.className}`}
            >
                {props.children}
            </textarea>
        );

    return (
        <input 
            {... props}
            className={`ring-0 border ${setFieldValidation()} focus:outline-sky-400/25 transition duration-150 rounded px-4 py-2 ${props.className}`}
        />
    );
}

export default Input;
