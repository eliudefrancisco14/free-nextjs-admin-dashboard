import { useState, useEffect } from "react";

export const useSearch = <T>(
    searchFunction: (term: string) => Promise<T[]>,
    initialTerm: string = ""
) => {
    const [searchTerm, setSearchTerm] = useState(initialTerm);
    const [filteredItems, setFilteredItems] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (term: string) => {
        setSearchTerm(term);
        setIsLoading(true);
        setError(null);

        if (term) {
            try {
                const searchResults = await searchFunction(term);
                setFilteredItems(searchResults);
            } catch (err) {
                setError("Erro ao pesquisar. Por favor, tente novamente.");
            }
        } else {
            setFilteredItems([]);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        handleSearch(searchTerm);
    }, [searchTerm]);

    return {
        searchTerm,
        setSearchTerm: handleSearch,
        filteredItems,
        isLoading,
        error,
    };
};
