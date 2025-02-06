import { useState } from 'react';

type Pagination = {
    currentPage: number;
    totalPages: number;
    setTotalPages: (totalPages: number) => void;
    ITEMS_PER_PAGE: number;
    updateTotalPages: (totalItems: number) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    setCurrentPage: (page: number) => void;
};

const ITEMS_PER_PAGE = 8;

export const usePagination = (): Pagination => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const handlePreviousPage = (): void => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = (): void => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const updateTotalPages = (totalItems: number): void => {
        setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    };

    return {
        currentPage,
        totalPages,
        setTotalPages,
        handlePreviousPage,
        handleNextPage,
        updateTotalPages,
        setCurrentPage,
        ITEMS_PER_PAGE
    };
};
