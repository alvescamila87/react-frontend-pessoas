import { styled, TableHead } from "@mui/material"

const TableHeadCustom = styled(TableHead)`
    background-color: lightgray;
`

const TableButtonsCustom = styled('div')`
    display: flex;
    justify-content: flex-end;
    gap: 5px;

`
export default { TableHeadCustom, TableButtonsCustom }