export interface User {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
    admissao: string;
    permissao: "USER" | "ADMIN" | "GERENTE";
}

export interface CreateUser {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
    telefone: string;
    permissao: "USER" | "ADMIN" | "GERENTE";
}