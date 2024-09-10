import { Link } from "react-router-dom";

export default function Menu() {
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/listar">Lista de pessoas</Link>
                    </li>
                    <li>
                        <Link to="/cadastro">Cadastro de pessoas</Link>
                    </li>
                    <li>
                        <Link to="/relatorio">Gerar relatório CSV</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}