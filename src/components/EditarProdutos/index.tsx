import { Button, Container, Grid2, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ProdutosEdit } from "../../models/Produtos";
import { containerResponsivePadding } from "../../models/ResponsivePadding";
import { apiService } from "../../api/request";

interface CadastroDeProdutosProps {
  produto?: ProdutosEdit;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function EditarProdutos({
  produto,
  onSuccess,
  onClose,
}: CadastroDeProdutosProps) {
  const [values, setValues] = useState<ProdutosEdit>(
    produto || {
      id: 0,
      nome: "",
      categoria: "",
      precoCompra: null,
      precoVenda: null,
      estoque: null,
      descricao: "",
    }
  );
  const [errorMessages, setErrorMessages] = useState({
    nome: "",
    categoria: "",
    precoCompra: "",
    precoVenda: "",
    estoque: "",
    // descricao: '',
  });

  const [errors, setErrors] = useState({
    nome: false,
    categoria: false,
    precoCompra: false,
    precoVenda: false,
    estoque: false,
    // descricao: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]:
        name === "precoCompra" || name === "precoVenda" || name === "estoque"
          ? value === ""
            ? null
            : Number(value)
          : value,
    });
  };

  const validateFields = () => {
    const newErrors = {
      nome: !values.nome,
      categoria: !values.categoria,
      precoCompra: !values.precoCompra,
      precoVenda: !values.precoVenda,
      estoque: !values.estoque,
      // descricao: !values.descricao,
    };

    const newErrorMessages = {
      nome: !values.nome ? "Nome é obrigatório" : "",
      categoria: !values.categoria ? "Categoria é obrigatório" : "",
      precoCompra:
        values.precoCompra === null ? "Preço de compra é obrigatório" : "",
      precoVenda:
        values.precoVenda === null ? "Preço de venda é obrigatório" : "",
      estoque: values.estoque === null ? "Quantidade é obrigatória" : "",
    };

    setErrors(newErrors);
    setErrorMessages(newErrorMessages);
    return Object.values(newErrors).every((error) => !error);
  };

  async function editarProduto(produto: ProdutosEdit) {
    try {
      const result = await apiService.put({
        url: `produtos/${produto.id}`,
        body: produto,
      });
        if (result.status === 200) {
          toast.success(result.data.message);
          onSuccess?.();
        }
    } catch (error) {
      console.log("Erro na requisição GET:", error);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateFields()) {
      editarProduto(values);
    } else {
      toast.warning("Dados obrigatórios ausentes.");
    }
  };

  return (
    <Container
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={[
        containerResponsivePadding,
        { marginTop: "2rem", borderRadius: "8px" },
      ]}
    >
      <Typography mb={4} variant="h4" textAlign="center" color="textSecondary">
        Cadastro de Produtos
      </Typography>
      <Grid2 container spacing={1}>
        <Grid2 size={12}>
          <TextField
            fullWidth
            error={errors.nome}
            id="outlined-nome"
            name="nome"
            label="Nome"
            value={values.nome}
            onChange={handleChange}
            helperText={errorMessages.nome}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            fullWidth
            error={errors.categoria}
            id="categoria"
            name="categoria"
            label="Categoria"
            value={values.categoria}
            onChange={handleChange}
            helperText={errorMessages.categoria}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            fullWidth
            error={errors.precoCompra}
            id="precoCompra"
            name="precoCompra"
            label="Preço de Compra"
            type="number"
            value={values.precoCompra === null ? "" : values.precoCompra}
            onChange={handleChange}
            helperText={errorMessages.precoCompra}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            fullWidth
            error={errors.precoVenda}
            id="precoVenda"
            name="precoVenda"
            label="Preço de Venda"
            type="number"
            value={values.precoVenda === null ? "" : values.precoVenda}
            onChange={handleChange}
            helperText={errorMessages.precoVenda}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            fullWidth
            error={errors.estoque}
            id="estoque"
            name="estoque"
            label="Quantidade"
            type="number"
            value={values.estoque === null ? "" : values.estoque}
            onChange={handleChange}
            helperText={errorMessages.estoque}
          />
        </Grid2>
        <Grid2 size={12}>
          <TextField
            fullWidth
            // error={errors.descricao}
            id="descricao"
            name="descricao"
            label="Descrição"
            value={values.descricao}
            onChange={handleChange}
            // helperText={errorMessages.descricao}
          />
        </Grid2>
      </Grid2>
      <Grid2 container justifyContent="end" mt={1} spacing={1}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Button fullWidth onClick={onClose} variant="contained" color="error">
            Cancelar
          </Button>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Button fullWidth type="submit" variant="contained" color="success">
            Salvar
          </Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}
