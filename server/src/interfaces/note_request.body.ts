import mongoose from 'mongoose';

export default interface IReqNoteBody {
    userId?: mongoose.Types.ObjectId;
    content?: string;
    isImportant?: boolean;
}
