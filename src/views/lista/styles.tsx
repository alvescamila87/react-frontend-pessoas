import { styled, TableHead } from "@mui/material"

const TableHeadCustom = styled(TableHead)`
    background-color: lightgray;
`

const TableButtonsCustom = styled('div')`
    display: flex;
    justify-content: center;
    gap: 5px;

`

const PessoaInfo = styled('fieldset')`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px;
    padding: 36px;
`;

const EnderecoInfo = styled('fieldset')`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 20px;
    padding: 36px;
`

const ModalButtonCustom = styled('div')`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    padding: 20px;
`

export default { TableHeadCustom, TableButtonsCustom, PessoaInfo, EnderecoInfo, ModalButtonCustom}