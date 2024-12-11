import { createContext, ReactNode, useContext, useState } from "react";
export const FilesContext = createContext<FilesContextProps | null>(null);

interface FilesContextProps {
    files: Array<File>;
    setFiles: React.Dispatch<React.SetStateAction<Array<File>>>
}

export const FilesProvider = ({children}: {children: ReactNode}) => {
    const [files, setFiles] = useState<Array<File>>([])

    return (
        <FilesContext.Provider value={{files, setFiles}}>
            {children}
        </FilesContext.Provider>
    )
}

export const useFilesContext = (): FilesContextProps => {
    const context = useContext(FilesContext);
    if (!context) {
      throw new Error('useFilesContext must be used within a FileProvider');
    }
    return context;
};

