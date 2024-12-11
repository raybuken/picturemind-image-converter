import { useFilesContext } from "@/context/FilesContext";
import FileCard from "./FileCard";
import { IMAGE_FORMATS } from "@/constants/constants";

function FilesStatus() {
    const { files } = useFilesContext();

    const isValidFileFormat = (file: File) => {
        return IMAGE_FORMATS.some(format => file.type === format.value)
    }

    return (
        <section className="grid grid-cols-1 gap-2">
            {files.map((file, i) => {
                const isValidFile = isValidFileFormat(file)
                
                return <FileCard file={file} key={i} isValidFile={isValidFile} index={i}/>
            })}
        </section>
    );
}

export default FilesStatus;
