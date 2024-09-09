import { TextField, Button } from "@mui/material"
import styles from "./styles"

export default function Pessoas() {
    return (
        <styles.CustomForm>
            <TextField label="Nome completo" placeholder="Informe o nome" required/>
            <TextField label="CPF" placeholder="000.000.000-00" required />
            <TextField label="Telefone" placeholder="(XX) XXXX-XXXX"/>
            <styles.Endereco>
                <legend>Endereço</legend>
                <TextField label="CEP" placeholder="00000-000" type="number" required/>
                <TextField label="Logradouro" placeholder="00000-000" variant="filled" disabled/>
                <TextField label="Número" placeholder="Informe o número" />
                <TextField label="Complemento" placeholder="Informe o complemento do endereço" variant="filled" disabled/>
                <TextField label="Bairro" variant="filled" disabled/>
                <TextField label="Cidade" variant="filled" disabled/>
                <TextField label="UF" variant="filled" disabled/>
            </styles.Endereco>
            <Button variant="contained">Salvar</Button>
            <Button variant="outlined">Cancelar</Button>
        </styles.CustomForm>
    )
}