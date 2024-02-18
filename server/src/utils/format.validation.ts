// some kind of validation for note content
export const isNoteContentValid = (content: string): boolean => {
    return (
        content.length > 0 
        && content.length <= 255
    );
};
