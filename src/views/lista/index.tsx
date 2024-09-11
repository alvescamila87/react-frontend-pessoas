import Data from '../data/mock'
import styles from './styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import API from '../../api/api';
import { useEffect, useState } from 'react';
import { PessoaData } from '../data/data';

export default function ListaPessoas() {  

    const [pessoaInfo, setPessoaInfo] = useState<PessoaData[]>([])   

    async function consultarPessoas() {
        const pessoas = await API.get('/pessoas')
        //setPessoaInfo(pessoas.data)
        console.log(pessoas.data)       
        setPessoaInfo(pessoas.data)
    }

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
                            <button>
                                Detalhes
                            </button>
                            <button>
                                Editar
                            </button>
                            <button>
                                Deletar
                            </button>
                        </styles.TableButtonsCustom>

                    </TableCell>
                </TableRow>
            )
        })
    }

    return ( 
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <styles.TableHeadCustom>
                    <TableRow >
                        <TableCell>ID</TableCell>
                        <TableCell align='right'>Nome completo</TableCell>
                        <TableCell align='right'>CPF</TableCell>
                        <TableCell align='right'>Telefone</TableCell>
                        <TableCell align='right'>Ações</TableCell>
                    </TableRow>
                </styles.TableHeadCustom>
                <TableBody>
                    {renderRows()}
                </TableBody>
            </Table>
        </TableContainer>
    )
}