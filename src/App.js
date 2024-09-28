import { useContext } from "react";
import "./App.css";
import Folder from "./components/Folder";
import { ExplorerContext, ExplorerProvider } from "./contexts/ExplorerContext";

const FileExplorerApp = () => {
    const { explorer } = useContext(ExplorerContext);
    return (
        <div className="App">
            {explorer.map((item, index) => (
                <Folder key={item.id} folderData={item} />
            ))}
        </div>
    );
};

function App() {
    return (
        <ExplorerProvider>
            <FileExplorerApp />
        </ExplorerProvider>
    );
}

export default App;
