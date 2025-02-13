import { createLead, uploadLead } from '@/services/api';
import { leadRequest } from '@/types';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

interface LeadUploadProps {
    onSuccess: () => void;
}

const LeadUpload: React.FC<LeadUploadProps> = ({ onSuccess }) => {
    const [file, setFile] = React.useState<File>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        if (!files) {
            toast.info("Campo vazio", {
                description: "Por favor, selecione um arquivo.",
            });
            return;
        }
        const selectedFile = files[0]; // Pegando o primeiro arquivo

        if (!selectedFile) {
            toast.info("Campo vazio", {
                description: "Por favor, selecione um arquivo.",
            });
            return;
        }

        // Verifica se é um xlsx
        const validTypes = ["text/xlsx", "application/vnd.ms-excel"];

        if (!validTypes.includes(selectedFile.type) && !selectedFile.name.toLowerCase().endsWith(".xlsx")) {
            toast.error("Formato inválido", {
                description: "Por favor, selecione um arquivo xlsx válido.",
            });
            return;
        }

        // Se passou na validação
        setFile(selectedFile);
        toast.success("Arquivo válido!", {
            description: "O arquivo xlsx foi aceito.",
        });
    };


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            toast.info("Campo vazio", {
                description: "Por favor, selecione um arquivo.",
            });
            return;
        }

        // Verifica se é um arquivo xlsx
        const validTypes = ["text/xlsx", "application/vnd.ms-excel"];
        if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith(".xlsx")) {
            toast.error("Formato inválido", {
                description: "Por favor, selecione um arquivo xlsx válido.",
            });
            return;
        }

        try {
            const message = await uploadLead(file);
            // Verifica se a mensagem começa com "Erro:"
            if (message.mensagem.startsWith("Erro:")) {
                toast.error("Erro ao salvar lead", {
                    description: message.mensagem,
                    duration: 5000,
                });
                return; // Interrompe a execução para não limpar o arquivo
            }
            if (message.mensagem.startsWith("Info:")) {
                toast.info("ATT ao salvar lead", {
                    description: message.mensagem,
                    duration: 5000,
                });
                return; // Interrompe a execução para não limpar o arquivo
            }
            toast.success("Sucesso", {
                description: `${message.mensagem}`,
            });

            // Limpa o estado do arquivo em vez de recarregar a página
            onSuccess();
        } catch (error) {
            toast.error("Erro ao salvar lead", {
                description: "Verifique os campos e tente novamente.",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="flex space-x-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ficheiro (.xlsx) <span className='text-red-900'>*</span>
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept='.xlsx'
                        onChange={(e) => handleFileChange(e)}
                        className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        placeholder="Digite o nome"
                    />
                </div>

            </div>
            <div>
                <button
                    type="button"
                    onClick={() => window.location.href = '/files/Modelo_EXCEL.xlsx'}
                    className="text-blue-500"
                >
                    Baixar Modelo xlsx
                </button>
            </div>

            <div className="flex justify-end space-x-2">
                <button type="submit" className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">Salvar</button>
            </div>

        </form>
    );
};

export default LeadUpload;