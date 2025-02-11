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

                        {/* <button
                            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-black px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
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
                                    className="lucide lucide-upload"
                                >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                </svg>
                            </span>
                            Upload
                        </button> */}
                    </div>
                    <Table />
                </div>
            </DefaultLayout>
        </>
    );
}



