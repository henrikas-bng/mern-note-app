import axios from 'axios';
import Note from '../models/note';
import Button from './button';

interface IProps {
    show: boolean;
    deleteNoteHandler: (noteId: string) => void;
    closeHandler: () => void;
    notesAlertHandler: (variant: string, message: string) => void;
    note: Note|null;
}

function DeleteDialog(props: IProps) {
    if (!props.show)
        return (<></>);

    const handleDeleteNote = async () => {
        if (props.note) {
            await axios.delete(`/api/note/delete/${props.note._id}`)
                .then((r) => {
                    if (r.status === 200 && props.note) {
                        props.deleteNoteHandler(props.note._id);
                        props.notesAlertHandler('success', 'Note deleted successfully!');
                    }
                })
                .catch((_) => {
                    props.notesAlertHandler('danger', 'Note could not be deleted!');
                })
                .finally(() => {
                    props.closeHandler();
                });
        }
    };

    return (
        <div className='fixed left-0 top-0 w-screen h-screen flex justify-center items-center bg-black/50 backdrop-blur p-4 z-50'>
            <div className='flex flex-col w-full max-w-sm bg-white rounded-md shadow-lg px-4 py-2 pb-4'>                
                <div className='flex justify-between items-center'>
                    <span className='text-lg font-semibold text-slate-700'>Delete note</span>
                    <button onClick={props.closeHandler} className='text-slate-700 hover:text-slate-400 transition duration-150 p-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {/* <hr className='my-8' /> */}
                <p className='mt-4 mb-8'>
                    Are you sure you want to delete the note?
                </p>
                {/* <hr className='my-8' /> */}
                <div className='flex justify-between items-center'>
                    <Button onClick={handleDeleteNote} variant='danger' className='px-8'>Confirm</Button>
                    <Button onClick={props.closeHandler} variant='outline-primary'>Cancel</Button>
                </div>
            </div>
        </div>
    );
}

export default DeleteDialog;
