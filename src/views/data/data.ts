export interface PessoaData {
    id: Number,
    nomeCompleto: String,
    cpf: String,
    telefone?: String,
    endereco: EnderecoData[],
}

export interface EnderecoData {
    id: Number,
    cep: String,
    logradouro: String,
    numero: String,
    complemento: String,
    bairro: String,
    localidade: String,
    uf: String,
    ddd: String,
    gia: String,
    ibge: String,
    siafi: String
}