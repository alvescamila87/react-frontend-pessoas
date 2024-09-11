import { TextField, Button } from "@mui/material"
import styles from "./styles"
import { useState } from "react";

// tipar o dados de pessoa
interface Pessoa {
    nome: String,
    cpf: String,
    telefone: String,
    cep: Number, 
    numero: String, 
    complemento: String, 
}

export default function Pessoas() {

    // inicio o usestate com um 'initial state'
    const [entradaDados, setEntradaDados] = useState<Pessoa>({
        nome: "",
        cpf: "",
        telefone: "",
        cep: 0,
        numero: "",
        complemento: "",
    });

    const handleChangeDados = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setEntradaDados(values => ({...values, [name]: value }))
        console.log("Change dados: ", entradaDados)
    }

    const handleSubmitSalvarPessoa = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submit dados: ", entradaDados)
    }

    function clearForm() {
//        e.preventDefault();
        setEntradaDados({
            nome: "",
            cpf: "",
            telefone: "",
            cep: 0,
            numero: "",
            complemento: "",
        })
    }
        
    return (
        <styles.PessoaForm onSubmit={handleSubmitSalvarPessoa}>   
            < styles.PessoaInfo>
                <legend>Informações de cadastro</legend>
                <TextField 
                        name="nome" 
                        type="text"
                        label="Nome completo" 
                        placeholder="Informe o nome" 
                        value={(entradaDados.nome || "")}
                        onChange={handleChangeDados}
                        required
                    />
                    <TextField 
                        name='cpf'
                        type="text"
                        label="CPF" 
                        placeholder="000.000.000-00" 
                        value={entradaDados.cpf || ""}                        
                        onChange={handleChangeDados}
                        required 
                    />
                    <TextField 
                        name="telefone"
                        label="Telefone" 
                        placeholder="(XX) XXXX-XXXX"
                        value={entradaDados.telefone || ""}                        
                        onChange={handleChangeDados}                         
                    />
            </styles.PessoaInfo>
            <styles.PessoaEndereco>
                <legend>Endereço</legend>
                    <TextField name="cep" label="CEP" placeholder="00000-000" type="number" value={entradaDados.cep || 0} onChange= {handleChangeDados} required/>
                    <TextField name="logradouro" label="Logradouro" placeholder="00000-000" variant="filled" disabled/>
                    <TextField name="numero" label="Número" placeholder="Informe o número" value={entradaDados.numero || ""} onChange={handleChangeDados} />
                    <TextField name="complemento" label="Complemento" placeholder="Informe o complemento do endereço" value={entradaDados.complemento} onChange={handleChangeDados}/>
                    <TextField name="bairro" label="Bairro" variant="filled" disabled/>
                    <TextField name="cidade" label="Cidade" variant="filled" disabled/>
                    <TextField name="uf" label="UF" variant="filled" disabled/>
            </styles.PessoaEndereco>
            <styles.PessoaButtons>
                <Button variant="outlined" onClick={clearForm}>Limpar</Button>
                <Button variant="contained" type="submit">Salvar</Button>                
            </styles.PessoaButtons>
        </styles.PessoaForm>
    )
}