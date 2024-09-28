import { useContext, useState } from "react";
import { ExplorerContext } from "../../contexts/ExplorerContext";
import AddFileOrFolder from "../AddFileOrFolder";
import File from "../File";
import styles from "./folder.module.scss";

const Folder = ({ folderData }) => {
    const { setSelectedItem } = useContext(ExplorerContext);

    const [isOpen, setIsOpen] = useState(false);
    const [openAddInputBox, setOpenAddInputBox] = useState({
        isOpen: false,
        isFolder: false,
    });

    const handleClick = () => {
        setSelectedItem(folderData.id);
        setIsOpen(!isOpen);
    };

    const ressetOpenAddInputBox = () => {
        setOpenAddInputBox({
            isFolder: false,
            isOpen: false,
        });
    };

    const handleAddNewFolder = (e) => {
        if (isOpen) {
            e.stopPropagation();
        }

        if (openAddInputBox.isOpen && openAddInputBox?.isFolder) {
            ressetOpenAddInputBox();
            return;
        }

        const addNewData = {
            isOpen: true,
            isFolder: true,
        };

        setOpenAddInputBox(addNewData);
        setSelectedItem(folderData.id);
    };

    const handleAddNewFile = (e) => {
        if (isOpen) {
            e.stopPropagation();
        }

        if (openAddInputBox.isOpen && !openAddInputBox?.isFolder) {
            ressetOpenAddInputBox();
            return;
        }

        const addNewData = {
            isOpen: true,
            isFolder: false,
        };

        setOpenAddInputBox(addNewData);
        setSelectedItem(folderData.id);
    };

    return (
        <div className={styles.folderContainer}>
            <div className={styles.folderHead} onClick={handleClick}>
                {folderData?.icon} {folderData?.name}
                <div>
                    <button
                        className={styles.folderHead_actions}
                        onClick={handleAddNewFolder}
                    >
                        + Add Folder
                    </button>
                    <button
                        className={styles.folderHead_actions}
                        onClick={handleAddNewFile}
                    >
                        + Add File
                    </button>
                </div>
            </div>
            <div
                className={`${
                    isOpen ? styles.openExplorer : styles.closeExplorer
                }`}
            >
                {openAddInputBox?.isOpen ? (
                    <AddFileOrFolder
                        ressetOpenAddInputBox={ressetOpenAddInputBox}
                        isFolder={openAddInputBox.isFolder}
                    />
                ) : (
                    ""
                )}
                {folderData?.children.map((item, index) =>
                    item.isFolder ? (
                        <Folder key={item.id} folderData={item} />
                    ) : (
                        <File key={item.id} fileData={item} />
                    )
                )}
            </div>
        </div>
    );
};

export default Folder;
