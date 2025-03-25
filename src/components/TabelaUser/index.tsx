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
import { User } from "../../models/Users";
import { CadastroDeUsuario } from "../CadastroDeUsuario";
import { containerResponsivePadding } from "../../models/ResponsivePadding";
import { apiService } from "../../api/request";
import { EditarUsuario } from "../EditarUsuario";
import { AlertaDialog } from "../Alerta";

export function TabelaUser() {
  const [users, setUsers] = useState<User[]>([])
  console.log(users, 'users');
  
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [open, setOpen] = useState(false);
  const handleCloseDialogCreateUser = () => setOpen(false);

  const [openEditUser, setOpenEditUser] = useState(false);
  const [userEdit, setProdutoEdit] = useState<User | null>(null);
  const handleCloseDialogEditUser = () => setOpenEditUser(false);

  const [openAlerta, setOpenAlerta] = useState(false);
  const [idDelet, setIdDelet] = useState(0);


  const handleAbrir = () => {
    setOpenAlerta(true);
  };

  const handleFechar = () => {
    setOpenAlerta(false);
  };

  const handleConfirmar = () => {
    setOpenAlerta(false);
    deletarUsuarios()
  };

  const handleOpenDialog = () => setOpen(true);
  const handleUserEditComSucesso = () => {
    setOpenEditUser(false);
    listarUsuarios()
  }

  const handleUserCadastradoComSucesso = () => {
    setOpen(false);
    listarUsuarios()
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

  const handleOpenDialogEditUser= (produto: User) => {
      setProdutoEdit(produto);
      setOpenEditUser(true);
    };

  const handleDelete = (id: number) => {
    setIdDelet(id)
    handleAbrir()
  };

  async function deletarUsuarios() {
    try {
      const result = await apiService.delete({
        url: `usuarios/${idDelet}`,
      });
      setTotalElements(result.data.totalElements);
      setUsers(result.data.content)
    } catch (error) {
      console.log("Erro na requisição GET:", error);
    } finally {
      listarUsuarios()
    }
  }
  async function listarUsuarios() {
    try {
      const result = await apiService.get({
        url: `usuarios?page=${page}&size=${pageSize}`,
      });
      setTotalElements(result.data.totalElements);
      setUsers(result.data.content)
      
    } catch (error) {
      console.log("Erro na requisição GET:", error);
    }
  }

  useEffect(() => {
    listarUsuarios()
  }, [page, pageSize])

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
          {(users && users.length > 0) ? (
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
                          <td data-label="USERNAME">{user.telefone}</td>
                          <td data-label="PERMISSÃO">{user.permissao}</td>
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
                                  onClick={() => handleOpenDialogEditUser(user)}
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
                Não existe usuario cadastrado.
              </Typography>
            </Box>
          )}
        </Grid2>
      </Grid2>

      <Dialog open={open} maxWidth="md" fullWidth onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
            handleCloseDialogCreateUser()}}>
        <DialogContent>
          <CadastroDeUsuario onClose={handleCloseDialogCreateUser} onSuccess={handleUserCadastradoComSucesso} />
        </DialogContent>
      </Dialog>

      <Dialog open={openEditUser} maxWidth="md" fullWidth onClose={(_event, reason) => {
            if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
            handleCloseDialogEditUser()}}>
        <DialogContent>
          <EditarUsuario user={userEdit || undefined} onClose={handleCloseDialogEditUser} onSuccess={handleUserEditComSucesso} />
        </DialogContent>
      </Dialog>

      <AlertaDialog
        open={openAlerta}
        onClose={handleFechar}
        onConfirm={handleConfirmar}
        titulo="Atenção!"
        mensagem="Tem certeza que deseja apagar este usuario?"
      />

    </Box>
  );
}
