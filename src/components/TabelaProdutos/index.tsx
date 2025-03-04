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
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ProductsList } from "./style";
import { DadosProduto } from "../../models/DadosProduto";
import { getFormattedDate } from "../../function/function";
import { CadastroDeProdutos } from "../CadastroDeProdutos";
import { containerResponsivePadding } from "../../models/ResponsivePadding";

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

export function TabelaProdutos() {
  // const [dados, setDados] = useState([])
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const [dialogEdit, setDialogEdit] = useState(false);
  const [dadosEdit, setDadosEdit] = useState<DadosProduto | null>(null);

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleProdutoCadastradoComSucesso = () => {
    setOpen(false);
  };

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
    setDadosEdit(item);
    setDialogEdit(true);
  };

  const handleSave = () => {
    setDadosEdit((prev) =>
      prev ? { ...prev, ultimaAlteracao: getFormattedDate() } : null
    );
    setDialogEdit(false);
  };

  const handleClose = () => {
    setDialogEdit(false);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <Box sx={containerResponsivePadding}>
      <Grid2 p={1} container>
        <Grid2 size={6}>
          <Typography variant="h5" textAlign="center">
            Tabela de Produtos
          </Typography>
        </Grid2>
        <Grid2 size={6} textAlign="end">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
          >
            Adicionar Produto
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container p={1}>
        <Grid2 size={12}>
          {dadosProdutos.length > 1 ? (
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
                      <th>LUCRO ESTIMADO</th>
                      <th>AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dadosProdutos.map((dado: DadosProduto) => {
                      const lucroEstimado =
                        (dado.precoVenda - dado.precoCompra) * dado.estoque;
                      return (
                        <tr key={dado.id}>
                          <td data-label="NOME">{dado.nome}</td>
                          <td data-label="CATEGORIA">{dado.categoria}</td>
                          <td data-label="PREÇO DE COMPRA">
                            {dado.precoCompra}
                          </td>
                          <td data-label="PREÇO DE VENDA">{dado.precoVenda}</td>
                          <td data-label="ADICIONADO">{dado.adicionado}</td>
                          <td data-label="ULTIMA ALTERAÇÃO">
                            {dado.ultimaAlteracao}
                          </td>
                          <td data-label="ESTOQUE">{dado.estoque}</td>
                          <td data-label="LUCRO ESTIMADO">
                            {lucroEstimado.toFixed(2)}
                          </td>
                          <td data-label="AÇÕES">
                            <Grid2
                              container
                              spacing={1}
                              wrap="nowrap"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Grid2 size="auto">
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="warning"
                                  onClick={() => handleEdit(dado)}
                                >
                                  Editar
                                </Button>
                              </Grid2>
                              <Grid2 size="auto">
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDelete(dado.id)}
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
          ) : (
            <Box>
              <Typography variant="h4" textAlign="center">
                Não existe produtos cadastrados.
              </Typography>
            </Box>
          )}
        </Grid2>
      </Grid2>

      <Dialog
        fullWidth
        open={dialogEdit}
        aria-hidden="true"
        onClose={(_event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          handleClose();
        }}
      >
        <DialogContent>
          <DialogContentText textAlign="center">
            Produto Editar
          </DialogContentText>
          <Grid2 container p={2} spacing={2}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="nome"
                label="Nome"
                value={dadosEdit?.nome || ""}
                onChange={(e) =>
                  setDadosEdit((prev) =>
                    prev ? { ...prev, nome: e.target.value } : null
                  )
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="categoria"
                label="Categoria"
                value={dadosEdit?.categoria || ""}
                onChange={(e) =>
                  setDadosEdit((prev) =>
                    prev ? { ...prev, categoria: e.target.value } : null
                  )
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="precoDeCompra"
                label="Preço de Compra"
                value={dadosEdit?.precoCompra || ""}
                onChange={(e) =>
                  setDadosEdit((prev) =>
                    prev
                      ? {
                          ...prev,
                          precoCompra: parseFloat(e.target.value) || 0,
                        }
                      : null
                  )
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="precoDeVenda"
                label="Preço de Venda"
                value={dadosEdit?.precoVenda || ""}
                onChange={(e) =>
                  setDadosEdit((prev) =>
                    prev
                      ? { ...prev, precoVenda: parseFloat(e.target.value) || 0 }
                      : null
                  )
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="estoque"
                label="Estoque"
                value={dadosEdit?.estoque || ""}
                onChange={(e) =>
                  setDadosEdit((prev) =>
                    prev
                      ? { ...prev, estoque: parseInt(e.target.value) || 0 }
                      : null
                  )
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="ultimaAlteracao"
                label="Data Alteração"
                value={dadosEdit?.ultimaAlteracao || ""}
                disabled
              />
            </Grid2>
          </Grid2>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button color="success" onClick={handleSave}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        maxWidth="md"
        fullWidth
        onClose={(_event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          handleCloseDialog();
        }}
      >
        <DialogContent>
          <CadastroDeProdutos onClose={handleCloseDialog} onSuccess={handleProdutoCadastradoComSucesso} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
