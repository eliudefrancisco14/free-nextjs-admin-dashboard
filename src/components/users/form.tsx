import { createUser } from '@/services/api';
import { userRequest } from '@/types';
import React from 'react';
import { toast } from 'sonner';

const UserForm: React.FC = () => {

    const [form, setForm] = React.useState<userRequest>({
        
        id: 0,
        nomeUtilizador: "",
        pessoa: {
            id: 0,
            primeiroNome: "",
            ultimoNome: "",
            telefone: "",
            email: "",
        },
        senha: "",
        activo: true,
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (
            !form.pessoa.primeiroNome ||
            !form.pessoa.ultimoNome ||
            !form.nomeUtilizador ||
            !form.senha
        ) {
            toast.info("Campos vazios", {
                description: 'Por favor, preencha todos os campos.',
            });

            return;
        }

        try {
            const message = await createUser(form);
            toast.success("Sucesso", {
                description: `${message.mensagem}`,
            });
        } catch (error) {
            toast.error("Erro ao salvar usuário", {
                description: 'Verifique os campos e tente novamente',
            });
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
                        onChange={(e) => setForm({ ...form, pessoa: { ...form.pessoa, primeiroNome: e.target.value } })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o primeiro nome"
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
                        onChange={(e) => setForm({ ...form, pessoa: { ...form.pessoa, ultimoNome: e.target.value } })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o último nome"
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
                        onChange={(e) => setForm({ ...form, pessoa: { ...form.pessoa, telefone: e.target.value } })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o nº de telefone"
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
                        onChange={(e) => setForm({ ...form, pessoa: { ...form.pessoa, email: e.target.value } })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o email"
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
                    onChange={(e) => setForm({ ...form, nomeUtilizador: e.target.value })}
                    className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: eliudefrancisco14"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Senha <span className='text-red-900'>*</span>
                </label>
                <input
                    type="password"
                    id="senha"
                    name="senha"
                    onChange={(e) => setForm({ ...form, senha: e.target.value })}
                    className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="********"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button type="submit" className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Salvar</button>
            </div>

        </form>
    );
};

export default UserForm;