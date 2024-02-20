import { FormEvent, useState } from 'react';
import Button from './button';
import Input from './input';
import Alert from './alert';
import axios from 'axios';
import Note from '../models/note';

interface IProps {
    show: boolean;
    addNoteHandler: (note: Note) => void;
    closeHandler: () => void;
    notesAlertHandler: (variant: string, message: string) => void;
}

function AddForm(props: IProps) {
    const [alertVisibility, setAlertVisibility] = useState(false);

    if (!props.show)
        return (<></>);
    
    const handleNoteAdd = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const inputContent = document.getElementById('fna-c') as HTMLTextAreaElement;
        const inputIsImportant = document.getElementById('fna-ii') as HTMLInputElement;

        const content = inputContent.value.trim();
        const isImportant = inputIsImportant.checked;

        const isContentValid = (content.length > 0 && content.length <= 255);

        if (isContentValid) {
            await axios.post('/api/note/create', {
                content: content,
                isImportant: isImportant,
            })
                .then((r) => {
                    if (r.data) {
                        props.addNoteHandler(r.data);
                        props.closeHandler();
                        props.notesAlertHandler('success', 'Note created successfully!');
                    }
                })
                .catch((_) => {
                    setAlertVisibility(true);
                })
                .finally(() => {
                    props.closeHandler();
                });
        } else {
            setAlertVisibility(true);
        }
    };
    
    return (
        <div className='fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur p-4 z-50'>
            <div className='flex flex-col w-full max-w-sm bg-white rounded-md shadow-lg p-8'>
                <div className='flex justify-between items-center'>
                    <span className='text-lg font-semibold text-slate-700'>Create note</span>
                    <button onClick={props.closeHandler} className='text-slate-700 hover:text-slate-400 transition duration-150 p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <hr className='my-8' />
                <Alert 
                    show={alertVisibility}
                    closeHandler={() => setAlertVisibility(false)}
                    variant='danger'
                    className='w-full mb-4'
                >
                    Check input and try again!
                </Alert>
                <form id='form-note-add' onSubmit={handleNoteAdd}>
                    <Input 
                        id='fna-c' 
                        type='textarea' 
                        name='fna-content' 
                        placeholder='Note..' 
                        className='w-full mb-4' 
                        minLength={1}
                        maxLength={255}
                    />
                    <div className='flex justify-start items-center'>
                        <input id='fna-ii' type='checkbox' name='fna-is-important' />
                        <label htmlFor='fna-ii' className='text-slate-500 ms-2'>Check if note is important</label>
                    </div>
                </form>
                <hr className='my-8' />
                <div className='flex justify-between items-center'>
                    <Button type='submit' form='form-note-add' className='px-8'>Create</Button>
                    <Button onClick={props.closeHandler} variant='outline-danger'>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default AddForm;
