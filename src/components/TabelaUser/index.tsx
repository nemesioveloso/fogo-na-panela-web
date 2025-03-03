import {
  Box,
  Button,
  Grid2,
  TablePagination,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogContentText, Typography,
} from "@mui/material";
import { useState } from "react";
import { ProductsList } from "./style";
import { getFormattedDate } from "../../function/function";
import { User } from "../../models/Users";
import { CadastroDeUsuario } from "../CadastroDeUsuario";
import { containerResponsivePadding } from "../../models/ResponsivePadding";

const users: User[] = [
  {
    id: 1,
    nome: "João da Silva",
    email: "joao.admin@example.com",
    cpf: "111.111.111-11",
    username: "joao_admin",
    role: "admin",
    admissao: "2025-01-01"
  },
  {
    id: 2,
    nome: "Maria Souza",
    email: "maria.souza@example.com",
    cpf: "222.222.222-22",
    username: "maria_souza",
    role: "colaborador",
    admissao: "2025-01-01"
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@example.com",
    cpf: "333.333.333-33",
    username: "pedro_oliveira",
    role: "colaborador",
    admissao: "2025-01-01"
  },
  {
    id: 4,
    nome: "Ana Santos",
    email: "ana.santos@example.com",
    cpf: "444.444.444-44",
    username: "ana_santos",
    role: "colaborador",
    admissao: "2025-01-01"
  },
  {
    id: 5,
    nome: "Carlos Almeida",
    email: "carlos.almeida@example.com",
    cpf: "555.555.555-55",
    username: "carlos_almeida",
    role: "colaborador",
    admissao: "2025-01-01"
  },
];


export function TabelaUser() {
  // const [dados, setDados] = useState([])
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const [dialogEdit, setDialogEdit] = useState(false);
  const [dadosEdit, setDadosEdit] = useState<User | null>(null);

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);
  const handleProdutoCadastradoComSucesso = () => {
    setOpen(false);
  }

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

  const handleEdit = (item: User) => {
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
          <Typography variant="h5" textAlign='center'>
            Tabela de Usuário
          </Typography>
        </Grid2>
        <Grid2 size={6} textAlign='end'>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Adicionar Usuário
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 container p={1}>
        <Grid2 size={12}>
          {users.length > 1 ? (
            <Box>
              <ProductsList>
                <table>
                  <thead>
                    <tr>
                      <th>NOME</th>
                      <th>EMAIL</th>
                      <th>CPF</th>
                      <th>USERNAME</th>
                      <th>PERMISSÃO</th>
                      <th>ADMISSÃO</th>
                      <th>AÇÕES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: User) => {
                      return (
                        <tr key={user.id}>
                          <td data-label="NOME">{user.nome}</td>
                          <td data-label="EMAIL">{user.email}</td>
                          <td data-label="CPF">{user.cpf}</td>
                          <td data-label="USERNAME">{user.username}</td>
                          <td data-label="PERMISSÃO">{user.role}</td>
                          <td data-label="ADMISSÃO">{user.admissao}</td>
                          <td data-label="AÇÕES">
                            <Grid2 container spacing={1}
                              wrap="nowrap"
                              alignItems="center"
                              justifyContent='center'>
                              <Grid2 size='auto'>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="warning"
                                  onClick={() => handleEdit(user)}
                                >
                                  Editar
                                </Button>
                              </Grid2>
                              <Grid2 size='auto'>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleDelete(user.id)}
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
              <Typography variant="h4" textAlign='center'>
                Não existe produtos cadastrados.
              </Typography>
            </Box>
          )}
        </Grid2>
      </Grid2>

      <Dialog open={dialogEdit} aria-hidden='true' fullWidth onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
             handleClose()}}>
        <DialogContent>
          <DialogContentText textAlign="center">Produto Editar</DialogContentText>
          <Grid2 container p={2} spacing={2}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="nome"
                label="Nome"
                value={dadosEdit?.nome || ""}
                onChange={(e) =>
                  setDadosEdit((prev) =>
                    prev
                      ? { ...prev, nome: e.target.value }
                      : null
                  )
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="email"
                label="E-mail"
                value={dadosEdit?.email || ""}
                onChange={(e) =>
                  setDadosEdit((prev) =>
                    prev
                      ? { ...prev, categoria: e.target.value }
                      : null
                  )
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="cpf"
                label="CPF"
                value={dadosEdit?.cpf || ""}
                onChange={(e) =>
                  setDadosEdit((prev) =>
                    prev
                      ? { ...prev, precoCompra: parseFloat(e.target.value) || 0 }
                      : null
                  )
                }
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                value={dadosEdit?.username || ""}
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
                id="role"
                label="Tipo de Permissão"
                value={dadosEdit?.role || ""}
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
                type="date"
                id="admissao"
                label="Admissão"
                value={dadosEdit?.admissao || ""}
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
      <Dialog open={open} maxWidth="md" fullWidth onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
            handleCloseDialog()}}>
        <DialogContent>
          <CadastroDeUsuario onSuccess={handleProdutoCadastradoComSucesso} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
