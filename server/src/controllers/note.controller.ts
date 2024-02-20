import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import Note from '../models/note';
import IReqNoteBody from '../interfaces/note_request.body';
import IReqNoteParams from '../interfaces/note_request.params';
import mongoose from 'mongoose';
import { isNoteContentValid } from '../utils/format.validation';

export const getById: RequestHandler<IReqNoteParams, unknown, unknown, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!noteId)
            throw createHttpError(400, 'Missing parameters!');

        if (!mongoose.isValidObjectId(noteId))
            throw createHttpError(400, 'Invalid parameters!');

        const note = await Note.findOne({ userId: req.session.userId, _id: noteId }).exec();

        if (!note)
            throw createHttpError(404, 'Note not found!');

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

export const getAll: RequestHandler = async (req, res, next) => {    
    try {
        const notes = await Note.find({ userId: req.session.userId }).exec();

        if (!notes)
            throw createHttpError(404, 'No notes found!');

        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
};

export const create: RequestHandler<unknown, unknown, IReqNoteBody, unknown> = async (req, res, next) => {
    const content = req.body.content;
    const isImportant = req.body.isImportant || false;

    try {
        if (!content)
            throw createHttpError(400, 'Missing parameters!');

        if (!isNoteContentValid(content))
            throw createHttpError(400, 'Invalid data!');

        const newNote = await Note.create({
            userId: req.session.userId,
            content: content,
            isImportant: isImportant,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
};

export const update: RequestHandler<IReqNoteParams, unknown, IReqNoteBody, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;
    const content = req.body.content;
    const isImportant = req.body.isImportant || false;

    try {
        if (!noteId || !content)
            throw createHttpError(400, 'Missing parameters!');

        if (!mongoose.isValidObjectId(noteId))
            throw createHttpError(400, 'Invalid parameters!');

        if (!isNoteContentValid(content))
            throw createHttpError(400, 'Invalid data!');

        const note = await Note.findOne({ userId: req.session.userId, _id: noteId }).exec();

        if (!note)
            throw createHttpError(404, 'Note not found!');

        let updatedNote = {};
        let isNoteEdited = false;

        if (note.content !== content) {
            note.content = content;
            isNoteEdited = true;
        }

        if (note.isImportant !== isImportant) {
            note.isImportant = isImportant;
            isNoteEdited = true;
        }

        if (isNoteEdited)
            updatedNote = await note.save();

        // if empty object comes back - there's nothing to update, same data given
        // if object with note data comes back - note was updated
        // if this place isn't reached - error occured

        res.status(200).json(updatedNote);
    } catch (error) {
        next(error);
    }
};

export const destroy: RequestHandler<IReqNoteParams, unknown, unknown, unknown> = async (req, res, next) => {
    const noteId = req.params.noteId;

    try {
        if (!noteId)
            throw createHttpError(400, 'Missing parameters!');

        if (!mongoose.isValidObjectId(noteId))
            throw createHttpError(400, 'Invalid parameters!');
        
        await Note.findOneAndDelete({ userId: req.session.userId, _id: noteId }).exec();
        
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};
