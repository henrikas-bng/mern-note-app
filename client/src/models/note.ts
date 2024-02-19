export default interface Note {
    _id: string;
    userId: string;
    content: string;
    isImportant: boolean;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
