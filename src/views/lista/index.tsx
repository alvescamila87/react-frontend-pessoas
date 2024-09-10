import Data from '../data/mock'
import styles from './styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ListaPessoas() {  

    const renderRows = () => {
       return Data().map(pessoa => {
            return (
                <TableRow key={pessoa.id}>
                    <TableCell>{pessoa.id}</TableCell>
                    <TableCell align="right" >{pessoa.nome}</TableCell>
                    <TableCell align="right" >{pessoa.cpf}</TableCell>
                    <TableCell align="right" >{pessoa.telefone}</TableCell>
                    <TableCell align="right" >{pessoa.cep}</TableCell>
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
                        <TableCell align='right'>CEP</TableCell>
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