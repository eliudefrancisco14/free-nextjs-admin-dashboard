export type mainResponse = {
    resposta: userTypes | null;
    mensagem: string;
};

export type userTypes = {
    id: number;
    primeiroNome: string;
    ultimoNome: string;
    email: string;
    telefone: string;
    nomeUtilizador: string;
    senha: string;
    ativo: boolean;
    nivelAcesso: string;
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