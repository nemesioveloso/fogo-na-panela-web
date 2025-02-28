export interface User {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    username: string;
    admissao: string;
    role: "admin" | "colaborador";
}

export interface CreateUser {
    nome: string;
    email: string;
    cpf: string;
    username: string;
    role: "admin" | "colaborador";
}