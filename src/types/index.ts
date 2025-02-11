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
    activo: boolean;
};

export type userRequest = {
    id: number;
    nomeUtilizador: string;
    pessoa: pessoaTypes;
    senha: string;
    activo: boolean;
}

export type userEditRequest = {
    id: number;
    pessoa: pessoaTypes;
    nomeUtilizador: string;
    activo: boolean;
}

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

export type leadTypes = {
    id: number;
    nome: string;
    provincia: string;
    endereco: string;
    telefone: string;
    dataCriacao: string;
}

export type leadRequest = {
    id: number;
    nome: string;
    provincia: string;
    endereco: string;
    telefone: string;
}

export type estagioTypes = {
    id: number;
    estagio: string;
}

export type estagioRequest = {
    id: number;
    estagio: string;
    descricao: string;
}

export type clienteTypes = {
    id: number;
    endereco: string;
    imagem: string;
    genero: string;
    data: string;
    pessoa: pessoaTypes;
    activo: boolean;
}

export type clienteRequest = {
    id: number;
    endereco: string;
    imagem: string;
    genero: string;
    dataNascimento: string;
    pessoa: pessoaTypes;
    activo: boolean;
}

export type notificacaoTypes = {
    id: number;
    cliente: string;
    titulo: string;
    texto: string;
    publicacao: string;
    aberta: boolean;
    removida: boolean;
}
export type notificacaoRequest = {
    id: number;
    clienteId: number;
    titulo: string;
    texto: string;
    publicacao: string;
    aberta: boolean;
    removida: boolean;
}
export type notificacaoByIdTypes = {
    id: number;
    cliente: pessoaTypes;
    titulo: string;
    texto: string;
    publicacao: string;
    aberta: boolean;
    removida: boolean;
}