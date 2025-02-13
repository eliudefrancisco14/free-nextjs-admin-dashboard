import React, { useEffect, useState } from "react";
import { editLead } from "@/services/api"; // Substitua pela sua função correta de edição
import { leadRequest } from "@/types";
import { toast } from "sonner";

interface LeadEditProps {
    lead: leadRequest;
    onClose: () => void; // Para fechar o modal após a edição
}

const LeadEdit: React.FC<LeadEditProps> = ({ lead, onClose }) => {
    const [form, setForm] = useState<leadRequest>({
        id: 0,
        nome: "",
        provincia: "",
        endereco: "",
        telefone: "",
    });

    useEffect(() => {
        if (lead) {
            setForm(lead); // Preenche os dados do lead selecionado
        }
    }, [lead]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!form.nome || !form.provincia || !form.endereco || !form.telefone) {
            toast.info("Campos vazios", {
                description: "Por favor, preencha todos os campos.",
            });
            return;
        }

        const updatePromise = editLead(form.id, form);

        toast.promise(updatePromise, {
            loading: "Atualizando lead...",
            success: (data) => {
                onClose(); 
                return (
                    <>
                        <strong>Sucesso!</strong>
                        <p>{data.mensagem}</p>
                    </>
                );
            },
            error: () => (
                <>
                    <strong>Erro ao atualizar lead</strong>
                    <p>Verifique os campos e tente novamente.</p>
                </>
            ),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nome <span className="text-red-900">*</span>
                    </label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o nome"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Província <span className="text-red-900">*</span>
                    </label>
                    <input
                        type="text"
                        id="provincia"
                        name="provincia"
                        value={form.provincia}
                        onChange={(e) => setForm({ ...form, provincia: e.target.value })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite a província"
                    />
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Telefone <span className="text-red-900">*</span>
                    </label>
                    <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={form.telefone}
                        onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o nº de telefone"
                    />
                </div>
                <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Endereço <span className="text-red-900">*</span>
                    </label>
                    <input
                        type="text"
                        id="endereco"
                        name="endereco"
                        value={form.endereco}
                        onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o endereço"
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 rounded-md bg-blue-600 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90"
                >
                    Atualizar
                </button>
            </div>
        </form>
    );
};

export default LeadEdit;
