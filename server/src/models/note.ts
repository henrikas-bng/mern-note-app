import { InferSchemaType, Schema, model } from 'mongoose';

const noteSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    content: { type: String, required: true },
    isImportant: { type: Boolean, default: false },
}, { timestamps: true });

type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>('Note', noteSchema);
