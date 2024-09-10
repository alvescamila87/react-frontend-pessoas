import { TextField, Button } from "@mui/material"
import styles from "./styles"
import { useState } from "react";

const INITIAL_STATE = {
    nome: 'Zebedeu Abraão',
    cpf: '123.456.789-00',
    telefone: '(47) 9999-5555',
    cep: 89030500,
}

export default function Pessoas() {

    const [pessoa, setPessoa] = useState(INITIAL_STATE);
    //console.log(pessoa);
        
    return (
        <styles.PessoaForm>   
            < styles.PessoaInfo>
                <legend>Informações de cadastro</legend>
                <TextField 
                        name="nome" 
                        label="Nome completo" 
                        placeholder="Informe o nome" 
                        required 
                        onChange={e => setPessoa({...pessoa, nome: e.target.value})}
                    />
                    <TextField 
                        name='cpf'
                        label="CPF" 
                        placeholder="000.000.000-00" 
                        required 
                        onChange={e => setPessoa({...pessoa, cpf: e.target.value})}
                    />
                    <TextField 
                        name="telefone"
                        label="Telefone" 
                        placeholder="(XX) XXXX-XXXX"
                        onChange={e => setPessoa({...pessoa, telefone: e.target.value})}
                    />
            </styles.PessoaInfo>
            <styles.PessoaEndereco>
                <legend>Endereço</legend>
                    <TextField name="cep" label="CEP" placeholder="00000-000" type="number" required/>
                    <TextField name="logradouro" label="Logradouro" placeholder="00000-000" variant="filled" disabled/>
                    <TextField name="numero" label="Número" placeholder="Informe o número" />
                    <TextField name="complemento" label="Complemento" placeholder="Informe o complemento do endereço"/>
                    <TextField name="bairro" label="Bairro" variant="filled" disabled/>
                    <TextField name="cidade" label="Cidade" variant="filled" disabled/>
                    <TextField name="uf" label="UF" variant="filled" disabled/>
            </styles.PessoaEndereco>
            <styles.PessoaButtons>
                <Button variant="contained" type="submit">Salvar</Button>
                <Button variant="outlined">Cancelar</Button>
            </styles.PessoaButtons>
        </styles.PessoaForm>
    )
}