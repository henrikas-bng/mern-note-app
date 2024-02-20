import { useEffect, useState } from 'react';
import Button from '../components/button';
import Note from '../models/note';
import AppLayout from './layouts/app.layout';
import NoteComponent from '../components/note';
import AddForm from '../components/add_form';
import Alert from '../components/alert';
import axios from 'axios';
import DeleteDialog from '../components/delete_dialog';
import EditForm from '../components/edit_form';

function NotesPage() {
    const [notes, setNotes] = useState<Array<Note>>([]);
    const [editableNote, setEditableNote] = useState<Note|null>(null);
    const [deletableNote, setDeletableNote] = useState<Note|null>(null);

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('danger');
    const [alertMessage, setAlertMessage] = useState('');

    const [formAddNoteVisibility, setFormAddNoteVisibility] = useState(false);
    const [formEditNoteVisibility, setFormEditNoteVisibility] = useState(false);
    const [deleteNoteDialogVisibility, setDeleteNoteDialogVisibility] = useState(false);

    const handleFormAddNoteShow = () => setFormAddNoteVisibility(true);
    const handleFormAddNoteHide = () => setFormAddNoteVisibility(false);

    const addNote = (note: Note) => setNotes(notes.concat(note));
    
    const handleFormEditNoteShow = (e: any) => {
        if (e) {
            const button = e.currentTarget as HTMLButtonElement;

            if (button) {
                const noteId = button.dataset.noteid;
                const note = notes.find(n => n._id === noteId);

                if (note) {
                    setEditableNote(note);
                    setFormEditNoteVisibility(true);
                }
            }
        }
    };

    const handleFormEditNoteHide = () => {
        setFormEditNoteVisibility(false);
        setEditableNote(null);
    };

    const updateNote = (note: Note) => {
        const noteIndex = notes.findIndex(n => n._id === note._id);
        notes[noteIndex] = note;
        setNotes(notes);
    };

    const handleDialogDeleteNoteShow = (e: any) => {
        if (e) {
            const button = e.currentTarget as HTMLButtonElement;

            if (button) {
                const noteId = button.dataset.noteid;
                const note = notes.find(n => n._id === noteId);

                if (note) {
                    setDeletableNote(note);
                    setDeleteNoteDialogVisibility(true);
                }
            }
        }
    }

    const handleDialogDeleteNoteHide = () => {
        setDeleteNoteDialogVisibility(false);
        setDeletableNote(null);
    };

    const deleteNote = (noteId: string) => {
        let notesTemp = notes;
        const noteIndex = notesTemp.findIndex(n => n._id === noteId);
        notesTemp.splice(noteIndex, 1);
        setNotes(notesTemp);
    };

    const showNotesAlert = (variant: string, message: string) => {
        setAlertVariant(variant);
        setAlertMessage(message);
        setShowAlert(true);
    };

    const getNotes = async () => {
        await axios.get('/api/note')
            .then((r) => {
                if (r.data)
                    setNotes(r.data);
            })
            .catch((_) => {
                setNotes([]);
            });
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <AppLayout>
            <AddForm 
                show={formAddNoteVisibility} 
                closeHandler={handleFormAddNoteHide} 
                addNoteHandler={addNote}
                notesAlertHandler={showNotesAlert}
            />
            <EditForm 
                show={formEditNoteVisibility} 
                closeHandler={handleFormEditNoteHide} 
                editNoteHandler={updateNote}
                notesAlertHandler={showNotesAlert}
                note={editableNote}
            />
            <DeleteDialog 
                show={deleteNoteDialogVisibility} 
                closeHandler={handleDialogDeleteNoteHide} 
                deleteNoteHandler={deleteNote}
                notesAlertHandler={showNotesAlert}
                note={deletableNote}
            />
            <div className='container mx-auto px-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <h1 className='text-3xl font-bold text-slate-700 mb-2'>Notes</h1>
                        <p className='text-sm text-slate-400'>
                            Here's your notes. Add, edit or delete them.
                        </p>
                    </div>
                    <Button  
                        onClick={handleFormAddNoteShow}
                        className='flex justify-center items-center text-sm text-nowrap px-2 py-1 ms-4'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className='font-semibold ms-2'>Add Note</span>
                    </Button>
                </div>
                <hr className='my-8' />
                <Alert 
                    show={showAlert}
                    closeHandler={() => setShowAlert(false)}
                    variant={alertVariant}
                    className='w-full min-w-full mb-4'
                >
                    {alertMessage}
                </Alert>
                {notes.length > 0 && 
                    <div className='flex justify-center flex-wrap'>
                        {notes.map((note, i) => {
                            return (
                                <NoteComponent 
                                    key={i} 
                                    note={note} 
                                    editFormShowHandler={handleFormEditNoteShow} 
                                    deleteDialogShowHandler={handleDialogDeleteNoteShow}
                                />
                            );
                        })}
                    </div>}
                {notes.length < 1 && 
                    <p className='text-center font-semibold text-slate-400'>
                        No data to display!
                    </p>}
            </div>
        </AppLayout>
    );
}

export default NotesPage;
