export function getFormattedDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const validateCPF = (cpf: string): boolean => {
    if (!cpf.trim()) return false;
    const regex = /^[0-9]{11}$/;
    return regex.test(cpf);
};

export const validateEmail = (email: string): boolean => {
    if (!email.trim()) return false;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};