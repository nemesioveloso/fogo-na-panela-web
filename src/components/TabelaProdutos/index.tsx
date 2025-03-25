import {
  Box,
  Button,
  Grid2,
  TablePagination,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProductsList } from "./style";
import { DadosProduto } from "../../models/DadosProduto";
import { CadastroDeProdutos } from "../CadastroDeProdutos";
import { containerResponsivePadding } from "../../models/ResponsivePadding";
import { apiService } from "../../api/request";
import { EditarProdutos } from "../EditarProdutos";

export function TabelaProdutos() {
  const [dadosProdutos, setDadosProdutos] = useState<DadosProduto[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const [produtoEdit, setProdutoEdit] = useState<DadosProduto | null>(null);

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const handleOpenDialogAddProduct = () => setOpenAddProduct(true);
  const handleCloseDialogAddProduct = () => setOpenAddProduct(false);
  const handleProdutoCadastradoComSucesso = () => {
    setOpenAddProduct(false);
    listarProdutos();
  };

  const [openEditProduct, setOpenEditProduct] = useState(false);
  const handleOpenDialogEditProduct = (produto: DadosProduto) => {
    setProdutoEdit(produto);
    setOpenEditProduct(true);
  };
  const handleCloseDialogEditProduct = () => setOpenEditProduct(false);
  const handleProdutoEditadoComSucesso = () => {
    setOpenEditProduct(false);
    listarProdutos();
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  async function listarProdutos() {
    try {
      const result = await apiService.get({
        url: `produtos?page=${page}&size=${pageSize}`,
      });
      setDadosProdutos(result.data.content);
      setTotalElements(result.data.totalElements);
    } catch (error) {
      console.log("Erro na requisição GET:", error);
    }
  }

  useEffect(() => {
    listarProdutos();
  }, [page, pageSize]);

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
            onClick={handleOpenDialogAddProduct}
          >
            Adicionar Produto
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container p={1}>
        <Grid2 size={12}>
          {(dadosProdutos && dadosProdutos.length > 0) ? (
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
                                  onClick={() =>
                                    handleOpenDialogEditProduct(dado)
                                  }
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
        open={openAddProduct}
        maxWidth="md"
        fullWidth
        onClose={(_event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          handleCloseDialogAddProduct();
        }}
      >
        <DialogContent>
          <CadastroDeProdutos
            onClose={handleCloseDialogAddProduct}
            onSuccess={handleProdutoCadastradoComSucesso}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEditProduct}
        maxWidth="md"
        fullWidth
        onClose={(_event, reason) => {
          if (reason === "backdropClick" || reason === "escapeKeyDown") return;
          handleCloseDialogEditProduct();
        }}
      >
        <DialogContent>
          <EditarProdutos
            produto={produtoEdit || undefined}
            onClose={handleCloseDialogEditProduct}
            onSuccess={handleProdutoEditadoComSucesso}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
