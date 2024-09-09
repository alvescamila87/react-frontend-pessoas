import { Box, styled } from "@mui/material";

const CustomForm = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Endereco = styled('fieldset')`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 36px;
`

export default { CustomForm, Endereco };