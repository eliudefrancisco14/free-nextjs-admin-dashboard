import { editUser } from '@/services/api'; // Substitua pela função correta de update
import { userTypes } from '@/types';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UserEditProps {
    user: userTypes; // O usuário a ser editado
}

const UserEdit: React.FC<{ user: userTypes, onClose: () => void }> = ({ user, onClose }) => {
    const [form, setForm] = useState<userTypes>(user);

    // Atualiza o estado quando o usuário mudar (evita problemas com estado antigo)
    useEffect(() => {
        setForm(user);
    }, [user]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!form.pessoa.primeiroNome || !form.pessoa.ultimoNome || !form.nomeUtilizador) {
            toast.info("Campos vazios", {
                description: 'Por favor, preencha todos os campos obrigatórios.',
            });
            return;
        }

        const updatePromise = editUser(form.id, form); // A Promise que será passada ao toast

        toast.promise(updatePromise, {
            loading: "Atualizando usuário...",
            success: (data) => {
                setTimeout(() => onClose(), 1000); // Fecha o modal após 1 segundo
                return (
                    <>
                        <strong>Sucesso!</strong>
                        <p>{data.mensagem}</p>
                    </>
                );
            },
            error: () => (
                <>
                    <strong>Erro ao atualizar usuário</strong>
                    <p>Verifique os campos e tente novamente.</p>
                </>
            ),
        }
        );

        try {
            await updatePromise; // Aguarda a execução da Promise
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Primeiro Nome <span className='text-red-900'>*</span>
                    </label>
                    <input
                        type="text"
                        id="primeiroNome"
                        name="primeiroNome"
                        value={form.pessoa.primeiroNome}
                        onChange={(e) => setForm({ ...form, pessoa: { ...form.pessoa, primeiroNome: e.target.value } })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Último Nome <span className='text-red-900'>*</span>
                    </label>
                    <input
                        type="text"
                        id="ultimoNome"
                        name="ultimoNome"
                        value={form.pessoa.ultimoNome}
                        onChange={(e) => setForm({ ...form, pessoa: { ...form.pessoa, ultimoNome: e.target.value } })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Telefone
                    </label>
                    <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={form.pessoa.telefone}
                        onChange={(e) => setForm({ ...form, pessoa: { ...form.pessoa, telefone: e.target.value } })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.pessoa.email}
                        onChange={(e) => setForm({ ...form, pessoa: { ...form.pessoa, email: e.target.value } })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                </div>
            </div>

            <hr />
            <h2 className='text-lg'>Dados de Conta</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nome de Usuário <span className='text-red-900'>*</span>
                </label>
                <input
                    type="text"
                    id="nomeUtilizador"
                    name="nomeUtilizador"
                    value={form.nomeUtilizador}
                    onChange={(e) => setForm({ ...form, nomeUtilizador: e.target.value })}
                    className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button type="submit" className="inline-flex items-center justify-center gap-2.5 rounded-md bg-blue-600 px-10 py-4 text-white hover:bg-blue-700">
                    Atualizar Usuário
                </button>
            </div>
        </form>
    );
};

export default UserEdit;
