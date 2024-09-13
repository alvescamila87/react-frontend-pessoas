export interface PessoaData {
    id?: number,
    nomeCompleto: string,
    cpf: string,
    telefone?: string,
    endereco: EnderecoData
}

export interface EnderecoData {
    id?: number,
    cep: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ddd?: string,
    gia?: string,
    ibge?: string,
    siafi?: string
}