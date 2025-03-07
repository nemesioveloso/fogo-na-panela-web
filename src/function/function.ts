export function getFormattedDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const validateCPFOrCNPJ = (value: string): boolean => {
    const onlyDigits = value.trim().replace(/\D/g, "");

    if (onlyDigits.length === 11) {
        return validateCPF(onlyDigits);
    }

    if (onlyDigits.length === 14) {
        return validateCNPJ(onlyDigits);
    }

    return false;
};

export const validateCPF = (cpf: string): boolean => {
    if (!cpf.trim()) return false;
    const regex = /^[0-9]{11}$/;
    return regex.test(cpf);
};

function validateCNPJ(cnpj: string): boolean {
    if (/^(\d)\1{13}$/.test(cnpj)) {
        return false;
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
}

export const validateEmail = (email: string): boolean => {
    if (!email.trim()) return false;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
};