import { createContext, useState } from "react";
import fileFolderData from "../fileFolderData.json";

export const ExplorerContext = createContext();

export const ExplorerProvider = ({ children }) => {
    const [selectedItem, setSelectedItem] = useState(-1);
    const [explorer, setExplorer] = useState(fileFolderData);

    const value = { selectedItem, setSelectedItem, explorer, setExplorer };

    return (
        <ExplorerContext.Provider value={value}>
            {children}
        </ExplorerContext.Provider>
    );
};
