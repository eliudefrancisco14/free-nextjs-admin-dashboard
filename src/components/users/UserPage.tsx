'use client';
import { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Table from "@/components/users/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AllModal } from "../Layouts/AllModal";
import UserForm from "./form";

export default function UserPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Usuários" />
                <div className="flex flex-col gap-10">
                    <AllModal isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        title="Adicionar Usuário">
                        <UserForm />
                    </AllModal>
                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-plus"
                                >
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </span>
                            Cadastrar
                        </button>


                    </div>
                    <Table />
                </div>
            </DefaultLayout>
        </>
    );
}



