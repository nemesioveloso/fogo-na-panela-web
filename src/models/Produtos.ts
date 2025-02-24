export interface Produtos {
    nome: string,
    categoria: string,
    precoCompra: number | null,
    precoVenda: number | null,
    quantidade: number | null,
    descricao?: string,
}