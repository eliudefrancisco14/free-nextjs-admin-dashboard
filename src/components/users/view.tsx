import { userTypes } from '@/types';
import React from 'react';
interface UserViewProps {
    user: userTypes | undefined;
}

const UserView: React.FC<UserViewProps> = ({ user }) => {
    return (
        <div className="p-4 bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p className="mb-2"><strong>Nome:</strong> {user?.pessoa.primeiroNome} {user?.pessoa.ultimoNome}</p>
            <p className="mb-2"><strong>Email:</strong> {user?.pessoa.email}</p>
            <p className="mb-2"><strong>Telefone:</strong> {user?.pessoa.telefone}</p>
            <p className="mb-2"><strong>Nome de Usuário:</strong> {user?.nomeUtilizador}</p>
        </div>
    );
};

export default UserView;