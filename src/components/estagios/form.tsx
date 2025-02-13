import { createLead } from '@/services/api';
import { leadRequest } from '@/types';
import React from 'react';
import { toast } from 'sonner';

interface LeadFormProps {
    onSuccess: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {

    const [form, setForm] = React.useState<leadRequest>({
        
        id: 0,
        nome: "",
        provincia: "",
        endereco: "",
        telefone: "",
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (
            !form.nome ||
            !form.provincia ||
            !form.endereco ||
            !form.telefone
        ) {
            toast.info("Campos vazios", {
                description: 'Por favor, preencha todos os campos.',
            });

            return;
        }

        try {
            const message = await createLead(form);
            toast.success("Sucesso", {
                description: `${message.mensagem}`,
            });
            onSuccess();
        } catch (error) {
            toast.error("Erro ao salvar lead", {
                description: 'Verifique os campos e tente novamente',
            });
        }
        
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nome <span className='text-red-900'>*</span>
                    </label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o nome"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Província <span className='text-red-900'>*</span>
                    </label>
                    <input
                        type="text"
                        id="provincia"
                        name="provincia"
                        onChange={(e) => setForm({ ...form, provincia: e.target.value })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o Província"
                    />
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Telefone <span className='text-red-900'>*</span>
                    </label>
                    <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o nº de telefone"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Endereço <span className='text-red-900'>*</span>
                    </label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o Endereço"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                <button type="submit" className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Salvar</button>
            </div>
        </form>
    );
};

export default LeadForm;