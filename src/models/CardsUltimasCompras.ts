export interface Pedido {
  id: number;
  cliente: string;
  itens: string[];
  valor: number;
  status: "preparando" | "rota de entrega" | "entregue";
  horario: string;
  avatar?: string;
}
