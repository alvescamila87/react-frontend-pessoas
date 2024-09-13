import styles from './styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import API from '../../api/apiPessoa';
import { useEffect, useState, FocusEvent } from 'react';
import { PessoaData } from '../data/data';
import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import APIPessoa from '../../api/apiPessoa';
import APIViaCEP from '../../api/apiViaCEP';

export default function ListaPessoas() {  

    const [pessoaInfo, setPessoaInfo] = useState<PessoaData[]>([])  

    const [pessoaSelecionada, setPessoaSelecionada] = useState<PessoaData>();
    
    const [permiteEditar, setPermitirEditar] = useState(false)
    
    const [abreModal, setAbreModal] = useState(false)

    async function consultarPessoas() {
        const pessoas = await API.get('/pessoas')
        console.log(pessoas.data)       
        setPessoaInfo(pessoas.data)
    }

    async function editarPessoa(id: number) {        
       if(pessoaSelecionada) {
            try {
                const atualizarPessoa = await APIPessoa.put(`/pessoas/${id}`, pessoaSelecionada)
                console.log(atualizarPessoa.data)
                handleFecharModal();
                //alert('Atualização realizada com sucesso!')
                consultarPessoas();
            } catch (error) {
                console.error("Erro ao atualizar a pessoa selecionada: ", error)
            }
        } else {
            console.error("ID '", id, "' não foi encontrado.")
        }
    }

    const handleAbrirModal = (isEdit: boolean, pessoa: PessoaData) => {
        setAbreModal(true);
        setPessoaSelecionada(pessoa)
        setPermitirEditar(!isEdit);
      };

    const handleFecharModal = () => {
        setAbreModal(false);
      };

    function handleCheckCEP(e: FocusEvent<HTMLInputElement>) {
        const cepFormatado = e.target.value.replace(/\D/g, '');
        console.log("Checagem de CEP: ", cepFormatado);
        handleBuscaCEP(cepFormatado);
    }

    async function handleBuscaCEP(cepFormatado: String) {
       
        if(cepFormatado.length === 8) {
            try {
                const consultaCEP = await APIViaCEP.get(`${cepFormatado}/json/`)
                console.log("Dialog: Consultando API VIACEP: ", consultaCEP.data)

                const { logradouro, complemento, bairro, localidade, uf } = consultaCEP.data;

                setPessoaSelecionada(pessoaAtual => {
                    if (pessoaAtual) {
                        return {
                            ...pessoaAtual,
                            endereco: {
                                ...pessoaAtual.endereco,
                                logradouro: logradouro || "",
                                complemento: complemento || "",
                                bairro: bairro || "",
                                localidade: localidade || "",
                                uf: uf || "",
                            }
                        };
                    }
                    return pessoaAtual;
                });

            } catch (error ){
                console.error('Erro ao consutar o CEP: ', cepFormatado, " Motivo: ", error)
            }
        }
    }

    const handleChangeDados = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value }= e.target;

        if (['cep', 'logradouro', 'numero', 'complemento', 'bairro', 'localidade', 'uf'].includes(name)) {
            setPessoaSelecionada(pessoaAtual => {
                if (pessoaAtual) {
                    return {
                        ...pessoaAtual,
                        endereco: {
                            ...pessoaAtual.endereco,
                            [name]: value
                        }
                    };
                }
                return pessoaAtual;
            });
        } else {
            setPessoaSelecionada(pessoaAtual => {
                if (pessoaAtual) {
                    return {
                        ...pessoaAtual,
                        [name]: value
                    };
                }
                return pessoaAtual;
            });
        }
    }


    useEffect(() => {
        consultarPessoas()
    }, []) 

    const renderRows = () => {
       return pessoaInfo.map(pessoa => {
            return (
                <TableRow key={`${pessoa.id}`} >
                    <TableCell>{`${pessoa.id}`}</TableCell>
                    <TableCell align="right" >{pessoa.nomeCompleto}</TableCell>
                    <TableCell align="right" >{pessoa.cpf}</TableCell>
                    <TableCell align="right" >{pessoa.telefone}</TableCell>
                    <TableCell align="center" >
                        <styles.TableButtonsCustom>
                            <Button 
                                variant="contained"
                                color="info"
                                onClick={() => handleAbrirModal(false, pessoa)}
                            >
                                Detalhes
                            </Button>                             
                            <Button 
                                variant="outlined"
                                color="info"
                                onClick={() => handleAbrirModal(true,  pessoa)}
                            >
                                Editar
                            </Button>                             
                            <Button 
                                variant="contained" 
                                color="error"
                                onClick={() => console.log('Deletar não implementado')}
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
                            name="id" 
                            type="number"
                            label="ID" 
                            variant="filled"
                            value={pessoaSelecionada?.id  || 0}
                            onChange={handleChangeDados}
                            disabled
                        />                
                        <TextField 
                            name="nomeCompleto" 
                            type="text"
                            label="Nome completo" 
                            variant={permiteEditar ? "filled" : "outlined"}
                            value={pessoaSelecionada?.nomeCompleto  || ''}
                            onChange={handleChangeDados}
                            disabled={permiteEditar}
                            required
                        />                
                        <TextField 
                            name="cpf" 
                            type="text"
                            label="CPF" 
                            variant={permiteEditar ? "filled" : "outlined"} 
                            value={pessoaSelecionada?.cpf  || ''}                            
                            onChange={handleChangeDados} 
                            disabled={permiteEditar}
                            required
                        />                
                        <TextField 
                            name="telefone" 
                            type="text"
                            label="Telefone" 
                            variant={permiteEditar ? "filled" : "outlined"}  
                            value={pessoaSelecionada?.telefone  || ''} 
                            onChange={handleChangeDados}
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
                            value={pessoaSelecionada?.endereco?.cep  || ''}
                            onBlur={handleCheckCEP}
                            onChange={handleChangeDados} 
                            disabled={permiteEditar}
                            required
                        />   
                        <TextField 
                            name="logradouro" 
                            type="text"
                            label="Logradouro" 
                            variant="filled"
                            value={pessoaSelecionada?.endereco?.logradouro || ''}
                            onChange={handleChangeDados}
                            disabled
                        />                
                        <TextField 
                            name="numero" 
                            type="text"
                            label="Número" 
                            variant={permiteEditar ? "filled" : "outlined"}  
                            value={pessoaSelecionada?.endereco?.numero  || ''}
                            onChange={handleChangeDados}
                            disabled={permiteEditar}
                        />              
                        <TextField 
                            name="complemento" 
                            type="text"
                            label="Complemento" 
                            variant={permiteEditar ? "filled" : "outlined"} 
                            value={pessoaSelecionada?.endereco?.complemento  || ''}
                            onChange={handleChangeDados}
                            disabled={permiteEditar}
                        />   
                        <TextField 
                            name="bairro" 
                            type="text"
                            label="Bairro" 
                            variant="filled" 
                            value={pessoaSelecionada?.endereco?.bairro  || ''}
                            onChange={handleChangeDados}
                            disabled
                        />   
                        <TextField 
                            name="localidade" 
                            type="text"
                            label="Cidade" 
                            variant="filled"  
                            value={pessoaSelecionada?.endereco?.localidade || ''}
                            onChange={handleChangeDados}
                            disabled
                        />   
                        <TextField 
                            name="uf" 
                            type="text"
                            label="UF" 
                            variant="filled" 
                            value={pessoaSelecionada?.endereco?.uf  || ''}  
                            onChange={handleChangeDados}
                            disabled
                        />    
                </styles.EnderecoInfo>
                <styles.ModalButtonCustom>
                    <Button 
                        variant='contained'
                        color="info"
                        type="submit"
                        disabled={permiteEditar}
                        onClick={() => editarPessoa(pessoaSelecionada?.id || 0)}
                    >Salvar</Button>
                    <Button 
                        variant='outlined'
                        color="info"
                        disabled={permiteEditar}
                        onClick={handleFecharModal}
                    >Cancelar</Button>
                </styles.ModalButtonCustom>                               
            </Dialog>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <styles.TableHeadCustom>
                        <TableRow hover={true}>
                            <TableCell>ID</TableCell>
                            <TableCell align='right'>NOME COMPLETO</TableCell>
                            <TableCell align='right'>CPF</TableCell>
                            <TableCell align='right'>TELEFONE</TableCell>
                            <TableCell align="center">AÇÕES</TableCell>
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