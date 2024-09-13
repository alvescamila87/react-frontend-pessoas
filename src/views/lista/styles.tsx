import { styled, TableHead, Box } from "@mui/material"

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

const BoxListCustom = styled(Box)`
    padding: 20px;
    display: flex;
    flex-direction: colunm;
    align-item: center;
`

const DialogFormCustom = styled('form')`
    height: 50%vh;
    overflow-y: scroll;
`

export default { 
    TableHeadCustom, 
    TableButtonsCustom, 
    PessoaInfo, 
    EnderecoInfo, 
    ModalButtonCustom, 
    BoxListCustom,
    DialogFormCustom
}