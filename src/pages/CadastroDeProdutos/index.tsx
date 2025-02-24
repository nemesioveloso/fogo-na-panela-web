import { Button, Container, Grid2, TextField, Typography } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Produtos } from '../../models/Produtos'

export function CadastroDeProdutos() {
    const [values, setValues] = useState<Produtos>({
        nome: '',
        categoria: '',
        precoCompra: null,
        precoVenda: null,
        quantidade: null,
        descricao: '',
    })
    const [errorMessages, setErrorMessages] = useState({
        nome: '',
        categoria: '',
        precoCompra: '',
        precoVenda: '',
        quantidade: '',
        // descricao: '',
    })

    const [errors, setErrors] = useState({
        nome: false,
        categoria: false,
        precoCompra: false,
        precoVenda: false,
        quantidade: false,
        // descricao: false,
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]:
                name === "precoCompra" || name === "precoVenda" || name === "quantidade"
                    ? value === '' ? null : Number(value)
                    : value,
        });
    };



    const validateFields = () => {
        const newErrors = {
            nome: !values.nome,
            categoria: !values.categoria,
            precoCompra: !values.precoCompra,
            precoVenda: !values.precoVenda,
            quantidade: !values.quantidade,
            // descricao: !values.descricao,
        }

        const newErrorMessages = {
            nome: !values.nome ? 'Nome é obrigatório' : '',
            categoria: !values.categoria ? 'Categoria é obrigatório' : '',
            precoCompra: values.precoCompra === null ? 'Preço de compra é obrigatório' : '',
            precoVenda: values.precoVenda === null ? 'Preço de venda é obrigatório' : '',
            quantidade: values.quantidade === null ? 'Quantidade é obrigatória' : '',
        }

        setErrors(newErrors)
        setErrorMessages(newErrorMessages)
        return Object.values(newErrors).every((error) => !error)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (validateFields()) {
            console.log('Formulário válido', values)
        } else {
            toast.warning('Dados obrigatórios ausentes.')
        }
    }

    return (
        <Container component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ background: '#f7f7f7', marginTop: '2rem', borderRadius: '8px', padding: '2rem' }}>
            <Typography mb={4} variant="h4" textAlign='center' color='textSecondary'>
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
                        type='number'
                        value={values.precoCompra === null ? '' : values.precoCompra}
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
                        type='number'
                        value={values.precoVenda === null ? '' : values.precoVenda}
                        onChange={handleChange}
                        helperText={errorMessages.precoVenda}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <TextField
                        fullWidth
                        error={errors.quantidade}
                        id="quantidade"
                        name="quantidade"
                        label="Quantidade"
                        type='number'
                        value={values.quantidade === null ? '' : values.quantidade}
                        onChange={handleChange}
                        helperText={errorMessages.quantidade}
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
            <Grid2 container justifyContent='end' mt={1}>
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <Button fullWidth type="submit" variant="contained" color='success'>
                        Salvar
                    </Button>
                </Grid2>
            </Grid2>
        </Container>
    )
}
