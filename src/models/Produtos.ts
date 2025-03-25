export interface Produtos {
    nome: string,
    categoria: string,
    precoCompra: number | null,
    precoVenda: number | null,
    estoque: number | null,
    descricao?: string,
}

export interface ProdutosEdit {
    id: number,
    nome: string,
    categoria: string,
    precoCompra: number | null,
    precoVenda: number | null,
    estoque: number | null,
    descricao?: string,
}