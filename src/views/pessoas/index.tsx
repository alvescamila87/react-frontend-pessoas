import { TextField, Button } from "@mui/material"
import styles from "./styles"
import { useEffect, useState, FocusEvent } from "react";
import APIViaCEP from "../../api/apiViaCEP";
import APIPessoa from "../../api/apiPessoa";
import { PessoaData } from "../data/data";


// //tipar o dados de pessoa
// interface PessoaInfo {
//     nome: String,
//     cpf: String,
//     telefone?: String,
//     endereco: {
//         id: number,
//         cep: String,
//         logradouro: String,
//         numero: String,
//         bairro: String,
//         complemento: String,
//         localidade: String,
//         uf: String,
//     }
// }

export default function Pessoas() {

    // inicio o usestate com um 'initial state'
    const [entradaDados, setEntradaDados] = useState<PessoaData>({   
        nomeCompleto: "",
        cpf: "",
        telefone: "",
        endereco: {
            id: 0,
            logradouro: "",
            cep: "",
            numero: "",
            bairro: "",
            complemento: "",
            localidade: "",
            uf: "",
        }
    });


    function handleCheckCEP(e: FocusEvent<HTMLInputElement>) {
        const cepFormatado = e.target.value.replace(/\D/g, '');
        console.log(cepFormatado);
        handleBuscaCEP(cepFormatado)
    }

    async function handleBuscaCEP(cepFormatado: String) {

        if(cepFormatado.length === 8) {

            try {

                const consultaCEP = await APIViaCEP.get(`/${cepFormatado}/json/`)
                console.log("Consultando API VIACEP: ", consultaCEP.data) 

                const { logradouro, complemento, bairro, localidade, uf } = consultaCEP.data;

                setEntradaDados(values => ({
                    ...values,
                    endereco: {
                        ...values.endereco,
                        logradouro: logradouro || "",
                        complemento: complemento || "",
                        bairro: bairro || "",
                        localidade: localidade || "",
                        uf: uf || ""
                    }
                }))

            } catch (error) {
                console.error("Erro ao buscar CEP: ", error)
            }

        }
    }

    useEffect(() => {
         //handleBuscaCEP(entradaDados.endereco.cep)
    }, [])

    const handleChangeDados = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value; 
        
        if(['cep', 'logradouro', 'complemento', 'numero', 'bairro', 'cidade', 'uf'].includes(name)) {
          setEntradaDados(values => ({
            ...values, 
            endereco: {
                ...values.endereco,
                [name]: value
            }
          }))  

          console.log("Change dados endereço: ", entradaDados)

        } else {
            setEntradaDados(values => ({...values, [name]: value }))
            console.log("Change dados pessoa: ", entradaDados)
        }

    }
       

    const handleSubmitPessoa = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
        console.log("Submit cadastro pessoa: ", entradaDados)

        try {
            const novoCadastro = await APIPessoa.post('/pessoas', entradaDados)
            console.log("Cadastro pessoa: ", novoCadastro)

        } catch (error){
            console.error("Erro ao enviar cadastro: ", error)
        }
                
    }

    function clearForm() {
        // e.preventDefault();
        setEntradaDados({
            nomeCompleto: "",
            cpf: "",
            telefone: "",
            endereco: {
                id: 0,
                logradouro: "",
                cep: "",
                numero: "",
                bairro: "",
                complemento: "",
                localidade: "",
                uf: "",
            }
        })
    }
        
    return (
        <styles.PessoaForm onSubmit={handleSubmitPessoa}>   
            < styles.PessoaInfo>
                <legend>Informações de cadastro</legend>
                <TextField 
                        name="nomeCompleto" 
                        type="text"
                        label="Nome completo" 
                        placeholder="Informe o nome" 
                        value={(entradaDados.nomeCompleto)}
                        onChange={handleChangeDados}
                        required
                    />
                    <TextField 
                        name='cpf'
                        type="text"
                        label="CPF" 
                        placeholder="000.000.000-00" 
                        value={entradaDados.cpf}                        
                        onChange={handleChangeDados}
                        required 
                    />
                    <TextField 
                        name="telefone"
                        label="Telefone" 
                        placeholder="(XX) XXXX-XXXX"
                        value={entradaDados.telefone}                        
                        onChange={handleChangeDados}                         
                    />
            </styles.PessoaInfo>
            <styles.PessoaEndereco>
                <legend>Endereço</legend>
                    <TextField 
                        name="cep" 
                        label="CEP" 
                        placeholder="00000-000" 
                        type="text" 
                        value={entradaDados.endereco.cep} 
                        onBlur={handleCheckCEP} 
                        onChange= {handleChangeDados} 
                        required
                    />
                    <TextField 
                        name="logradouro" 
                        label="Logradouro" 
                        placeholder="00000-000" 
                        variant="filled" 
                        value={entradaDados.endereco.logradouro}  
                        disabled
                    />
                    <TextField 
                        name="numero" 
                        label="Número" 
                        placeholder="Informe o número" 
                        value={entradaDados.endereco.numero} 
                        onChange={handleChangeDados} 
                    />
                    <TextField 
                        name="complemento" 
                        label="Complemento" 
                        placeholder="Informe o complemento do endereço" 
                        value={entradaDados.endereco.complemento} 
                        onChange={handleChangeDados}
                    />
                    <TextField 
                        name="bairro" 
                        label="Bairro" 
                        variant="filled" 
                        value={entradaDados.endereco.bairro}
                        disabled
                    />
                    <TextField 
                        name="localidade" 
                        label="Cidade" 
                        variant="filled" 
                        value={entradaDados.endereco.localidade}
                        disabled
                        />
                    <TextField 
                        name="uf" 
                        label="UF" 
                        variant="filled" 
                        value={entradaDados.endereco.uf}
                        disabled
                        />
            </styles.PessoaEndereco>
            <styles.PessoaButtons>
                <Button variant="outlined" onClick={clearForm}>Limpar</Button>
                <Button variant="contained" type="submit">Salvar</Button>                
            </styles.PessoaButtons>
        </styles.PessoaForm>
    )
}
