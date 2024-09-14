import { Button } from "@mui/material";
import APIPessoa from "../../api/apiPessoa"
import styles from "./styles";

export default function Relatorio() {

    async function gerarRelatorio() {
        try {
            const response = await APIPessoa.get('/pessoas/relatorio', {
                responseType: 'blob',
            })
            console.log("Relatório: ", response.data)

            const url = URL.createObjectURL(response.data);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'relatorio.csv');
            document.body.appendChild(link)
            link.click();
            link.remove();
            
            URL.revokeObjectURL(url)

            console.log("Relatório gerado com sucesso!")

        } catch (error){
            console.log("Erro ao gerar relatório em CSV: ", error)
        }
    }

    return (
        <styles.fileExportCustom>
            <legend>Relatório de pessoas cadastradas</legend>
            <Button 
                variant="contained"
                size="large"                
                role={undefined}                
                onClick={() => gerarRelatorio()}
            >Download Relatório CSV
            </Button>
        </styles.fileExportCustom>

    )
}