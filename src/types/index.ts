export type mainResponse = {
    resposta: userTypes | null;
    mensagem: string;
};

export type dtoResponse = {
    resposta: any | null;
    mensagem: string;
};

export type userTypes = {
    id: number;
    nomeUtilizador: string;
    pessoa: pessoaTypes;
    ativa: boolean;
};

export type LoginResponse = {
    resposta: {
        token: string;
    };
};

export type LoginRequest = {
    nomeUtilizador: string;
    senha: string;
};

export type editMyPasswordTypes = {
    senhaAntiga: string;
    senhaNova: string;
};

export type pessoaTypes = {
    id: number;
    primeiroNome: string;
    ultimoNome: string;
    telefone: string;
    email: string;
}