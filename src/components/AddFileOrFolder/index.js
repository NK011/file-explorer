import { useContext, useRef } from "react";
import styles from "./addFileFolder.module.scss";
import { ExplorerContext } from "../../contexts/ExplorerContext";

const AddFileOrFolder = ({ ressetOpenAddInputBox, isFolder }) => {
    const { selectedItem, explorer, setExplorer } = useContext(ExplorerContext);

    const itemNameRef = useRef("");

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
        }
    };

    const updateFolder = (arr, newItem) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === selectedItem) {
                arr[i].children.push(newItem);
                break;
            } else {
                updateFolder(arr[i].children, newItem);
            }
        }
    };

    const handleSubmit = () => {
        let explorerCopy = [...explorer];

        let newItem = {
            id: new Date().getMilliseconds(),
            name: itemNameRef.current?.value,
            isFolder: isFolder,
            icon: isFolder ? "📁" : "📄",
            children: [],
        };

        updateFolder(explorerCopy, newItem);
        setExplorer(explorerCopy);
        ressetOpenAddInputBox();
    };

    return (
        <div className={styles.container}>
            {isFolder ? "📁" : "📄"}
            <input
                ref={itemNameRef}
                autoFocus
                type="text"
                placeholder={`Enter ${isFolder ? "folder" : "file"} name...`}
                onKeyDown={handleKeyDown}
            />

            <button className={styles.container__closeInput} onClick={ressetOpenAddInputBox}>
                x
            </button>
        </div>
    );
};

export default AddFileOrFolder;
