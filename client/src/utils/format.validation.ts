export const validateUserLogin = (email: string, password: string) => {
    const regexEmail = new RegExp('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$');
    
    return (
        regexEmail.test(email)
        && password.length >= 8
        && password.length <= 32
    );
};

export const validateUserRegister = (email: string, password: string, passwordConf: string) => {
    const regexEmail = new RegExp('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$');

    return (
        regexEmail.test(email)
        && password.length >= 8
        && password.length <= 32
        && password === passwordConf
    );
};
