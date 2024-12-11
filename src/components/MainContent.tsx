import { useFilesContext } from "@/context/FilesContext";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadFiles";
import FilesStatus from "./FilesStatus";
import FilesActions from "./FilesActions";

function MainContent() {
  const { files } = useFilesContext();

    if(files?.length) {
        return (
          <>
            <FilesStatus/>
            <FilesActions files={files}/>
          </>
        )
    }
    return (
        <>
          <Hero />
          <UploadSection />
        </>
    )
}

export default MainContent;
