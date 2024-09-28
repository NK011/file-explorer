import styles from "./file.module.scss";

const File = ({ fileData }) => {
    return (
        <p className={styles.fileHeader}>
            {fileData.icon} {fileData.name}
        </p>
    );
};

export default File;
