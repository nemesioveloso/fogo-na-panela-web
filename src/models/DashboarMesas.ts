export interface DetalheConsumo {
    categoria: string;
    nome: string;
    quantidade: number;
    precoUnitario: number;
}

export interface Mesa {
    id: number;
    status: 'Aberta' | 'Fechada';
    total: number;
    detalhes: DetalheConsumo[];
}