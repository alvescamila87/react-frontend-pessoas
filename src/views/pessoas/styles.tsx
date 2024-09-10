import { styled } from "@mui/material";

const PessoaForm = styled('form')`
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
`;

const PessoaInfo = styled('fieldset')`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 36px;
`;

const PessoaEndereco = styled('fieldset')`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 36px;
    margin-top: 20px;
`

const PessoaButtons = styled('div')`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 5px;   
    
`
export default { PessoaForm, PessoaInfo, PessoaEndereco, PessoaButtons };