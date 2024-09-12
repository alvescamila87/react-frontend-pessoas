import styles from './styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import API from '../../api/apiPessoa';
import { useEffect, useState } from 'react';
import { PessoaData } from '../data/data';
import { Button, Dialog, DialogTitle, TextField } from '@mui/material';

export default function ListaPessoas() {  

    const [pessoaInfo, setPessoaInfo] = useState<PessoaData[]>([])  

    const [permiteEditar, setPermitirEditar] = useState(false)
    
    const [abreModal, setAbreModal] = useState(false)

    async function consultarPessoas() {
        const pessoas = await API.get('/pessoas')
        console.log(pessoas.data)       
        setPessoaInfo(pessoas.data)
    }

    const handleAbrirModal = (isEdit: boolean) => {
        setAbreModal(true);
        setPermitirEditar(!isEdit);
      };

    const handleFecharModal = () => {
        setAbreModal(false);
      };


    useEffect(() => {
        consultarPessoas()
    }, []) 


    const renderRows = () => {
       return pessoaInfo.map(pessoa => {
            return (
                <TableRow key={`${pessoa.id}`}>
                    <TableCell>{`${pessoa.id}`}</TableCell>
                    <TableCell align="right" >{pessoa.nomeCompleto}</TableCell>
                    <TableCell align="right" >{pessoa.cpf}</TableCell>
                    <TableCell align="right" >{pessoa.telefone}</TableCell>
                    <TableCell align="right" >
                        <styles.TableButtonsCustom>
                            <Button 
                                variant="outlined"
                                color="info"
                                onClick={() => handleAbrirModal(false)}
                            >
                                Detalhes
                            </Button>                             
                            <Button 
                                variant="contained"
                                color="info"
                                onClick={() => handleAbrirModal(true)}
                            >
                                Editar
                            </Button>                             
                            <Button 
                                variant="contained" 
                                color="error"
                                onClick={() => handleAbrirModal(true)}
                            >
                                Deletar
                            </Button>                             
                        </styles.TableButtonsCustom>

                    </TableCell>
                </TableRow>
            )
        })
    }

    return ( 
        <>   
            <Dialog fullWidth maxWidth="md" onClose={handleFecharModal} open={abreModal}>
                <DialogTitle>Detalhes de cadastro</DialogTitle>
                <styles.PessoaInfo>
                    <legend>Pessoa</legend>
                        <TextField 
                            name="nomeCompleto" 
                            type="text"
                            label="Nome completo" 
                            variant={permiteEditar ? "filled" : "outlined"}
                            disabled={permiteEditar}
                        />                
                        <TextField 
                            name="cep" 
                            type="text"
                            label="CPF" 
                            variant={permiteEditar ? "filled" : "outlined"}  
                            disabled={permiteEditar}
                        />                
                        <TextField 
                            name="telefone" 
                            type="text"
                            label="Telefone" 
                            variant={permiteEditar ? "filled" : "outlined"}  
                            disabled={permiteEditar}
                        />        
                </styles.PessoaInfo>
                <styles.EnderecoInfo>
                    <legend>Endereço</legend>
                        <TextField 
                            name="cep" 
                            type="text"
                            label="CEP" 
                            variant={permiteEditar ? "filled" : "outlined"}  
                            disabled={permiteEditar}
                        />   
                        <TextField 
                            name="logradouro" 
                            type="text"
                            label="Logradouro" 
                            variant="filled"
                            disabled
                        />                
                        <TextField 
                            name="numero" 
                            type="text"
                            label="Número" 
                            variant={permiteEditar ? "filled" : "outlined"}  
                            disabled={permiteEditar}
                        />              
                        <TextField 
                            name="complemento" 
                            type="text"
                            label="Complemento" 
                            variant={permiteEditar ? "filled" : "outlined"} 
                            disabled={permiteEditar}
                        />   
                        <TextField 
                            name="bairro" 
                            type="text"
                            label="Bairro" 
                            variant="filled" 
                            disabled
                        />   
                        <TextField 
                            name="localidade" 
                            type="text"
                            label="Cidade" 
                            variant="filled"  
                            disabled
                        />   
                        <TextField 
                            name="uf" 
                            type="text"
                            label="UF" 
                            variant="filled"   
                            disabled
                        />    
                </styles.EnderecoInfo>                               
            </Dialog>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <styles.TableHeadCustom>
                        <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell align='right'>NOME COMPLETO</TableCell>
                            <TableCell align='right'>CPF</TableCell>
                            <TableCell align='right'>TELEFONE</TableCell>
                            <TableCell align="center" >AÇÕES</TableCell>
                        </TableRow>
                    </styles.TableHeadCustom>
                    <TableBody>
                        {renderRows()}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}