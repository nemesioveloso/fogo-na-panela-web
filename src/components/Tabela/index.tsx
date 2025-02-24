import {
  Box,
  Button,
  Grid2,
  TablePagination,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";
import { ProductsList } from "./style";
import { DadosProduto } from "../../models/DadosProduto";

const dadosProdutos = [
  {
    id: 1,
    nome: "Cerveja Pilsen",
    categoria: "Bebida",
    precoCompra: 2.0,
    precoVenda: 5.0,
    estoque: 20,
    adicionado: "2023-01-10",
    ultimaAlteracao: "2023-01-20",
  },
  {
    id: 2,
    nome: "Suco de Laranja",
    categoria: "Bebida",
    precoCompra: 3.0,
    precoVenda: 7.0,
    estoque: 20,
    adicionado: "2023-02-05",
    ultimaAlteracao: "2023-02-10",
  },
  {
    id: 3,
    nome: "Hambúrguer Artesanal",
    categoria: "Refeição",
    precoCompra: 8.0,
    precoVenda: 15.0,
    estoque: 20,
    adicionado: "2023-02-15",
    ultimaAlteracao: "2023-02-20",
  },
  {
    id: 4,
    nome: "Pizza Margherita",
    categoria: "Refeição",
    precoCompra: 10.0,
    precoVenda: 20.0,
    estoque: 20,
    adicionado: "2023-03-01",
    ultimaAlteracao: "2023-03-05",
  },
  {
    id: 5,
    nome: "Água Mineral",
    categoria: "Bebida",
    precoCompra: 1.0,
    precoVenda: 2.0,
    estoque: 20,
    adicionado: "2023-01-05",
    ultimaAlteracao: "2023-01-10",
  },
  {
    id: 6,
    nome: "Suco de Uva",
    categoria: "Bebida",
    precoCompra: 3.5,
    precoVenda: 8.0,
    estoque: 20,
    adicionado: "2023-04-01",
    ultimaAlteracao: "2023-04-15",
  },
  {
    id: 7,
    nome: "X-Salada",
    categoria: "Refeição",
    precoCompra: 7.0,
    precoVenda: 12.0,
    estoque: 20,
    adicionado: "2023-04-10",
    ultimaAlteracao: "2023-04-20",
  },
  {
    id: 8,
    nome: "Batata Frita",
    categoria: "Acompanhamento",
    precoCompra: 4.0,
    precoVenda: 9.0,
    estoque: 20,
    adicionado: "2023-03-15",
    ultimaAlteracao: "2023-03-20",
  },
  {
    id: 9,
    nome: "Refrigerante",
    categoria: "Bebida",
    precoCompra: 2.5,
    precoVenda: 5.0,
    estoque: 20,
    adicionado: "2023-02-25",
    ultimaAlteracao: "2023-03-01",
  },
  {
    id: 10,
    nome: "Salada Verde",
    categoria: "Refeição",
    precoCompra: 5.0,
    precoVenda: 10.0,
    estoque: 20,
    adicionado: "2023-05-01",
    ultimaAlteracao: "2023-05-02",
  },
];

export function TabelaPaginada() {
  // const [dados, setDados] = useState([])
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const [dialogEdit, setDialogEdit] = useState(false);
  const [dadosEdit, setDadosEdit] = useState<DadosProduto>();

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (item: DadosProduto) => {
    console.log(item, "ìtem");
    setDadosEdit(item);
    setDialogEdit(true);
  };

  return (
    <Box>
      <Grid2 container p={1}>
        <Grid2 size={12}>
          {dadosProdutos.length > 1 && (
            <Box>
              <ProductsList>
                <table>
                  <thead>
                    <tr>
                      <th>NOME</th>
                      <th>CATEGORIA</th>
                      <th>PREÇO DE COMPRA</th>
                      <th>PRECO DE VENDA</th>
                      <th>ADICIONADO</th>
                      <th>ULTIMA ALTERAÇÃO</th>
                      <th>ESTOQUE</th>
                      <th>AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosProdutos.map((dado: DadosProduto) => {
                      return (
                        <tr key={dado.id}>
                          <td>{dado.nome}</td>
                          <td>{dado.categoria}</td>
                          <td>{dado.precoCompra}</td>
                          <td>{dado.precoVenda}</td>
                          <td>{dado.adicionado}</td>
                          <td>{dado.ultimaAlteracao}</td>
                          <td>{dado.estoque}</td>
                          <td>
                            <Grid2 container spacing={1}>
                              <Grid2 size={6}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="warning"
                                  onClick={() => handleEdit(dado)}
                                >
                                  Editar
                                </Button>
                              </Grid2>
                              <Grid2 size={6}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="error"
                                >
                                  Apagar
                                </Button>
                              </Grid2>
                            </Grid2>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </ProductsList>
              <TablePagination
                sx={{
                  background: "#212121",
                  marginTop: "0.2rem",
                  color: "#f7f7f7",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
                component="div"
                count={totalElements}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          )}
        </Grid2>
      </Grid2>

      <Dialog open={dialogEdit}>
        {/* onClose={} aria-labelledby={} */}
        <DialogContent>
          <DialogContentText textAlign='center'>Produto Editar</DialogContentText>
          <Grid2 container p={2} spacing={2}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="nome"
                label="Nome"
                value={dadosEdit!.nome}
                // onChange={}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="categoria"
                label="Categoria"
                value={dadosEdit!.categoria}
                // onChange={}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="precoDeCompra"
                label="Preço de Compra"
                value={dadosEdit!.precoCompra}
                // onChange={}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="precoDeVenda"
                label="Preço de Venda"
                value={dadosEdit!.precoVenda}
                // onChange={}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="estoque"
                label="Estoque"
                value={dadosEdit!.estoque}
                // onChange={}
              />
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions>
          <Button color="error">Cancel</Button>
          <Button color="success">Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
