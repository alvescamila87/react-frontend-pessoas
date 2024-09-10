import Data from '../data/mock'
import styles from './styles'

export default function ListaPessoas() {  

    const renderRows = () => {
       return Data().map(pessoa => {
            return (
                <tr key={pessoa.id}>
                    <td>{pessoa.id}</td>
                    <td>{pessoa.nome}</td>
                    <td>{pessoa.cpf}</td>
                    <td>{pessoa.telefone}</td>
                    <td>{pessoa.cep}</td>
                </tr>
            )
        })
    }

    return (
        <table >
            <styles.headerTable>
                <tr>
                    <th>ID</th>
                    <th>Nome completo</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>CEP</th>
                    <th>Ações</th>
                </tr>
            </styles.headerTable>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}