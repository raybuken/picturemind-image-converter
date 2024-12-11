import { useFilesContext } from "@/context/FilesContext";
import React, { ChangeEvent, useState } from "react";

function UploadSection() {
  const { setFiles } = useFilesContext();
  const [isDragging, setIsDragging] = useState(false);

  const onEnterUploader = () => {
    setIsDragging(true);
  };

  const onLeaveUploader = () => {
    setIsDragging(false);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target) {
        return;
    }

    const files = e.target.files
    
    setFiles(files ? Array.from(files): [])
  };

  return (
    <section
      className={`flex justify-center items-center bg-primary-content rounded-box h-[35rem] mx-4 md[mx-0] relative ${
        isDragging ? " bg-gray-600 border  border-dashed" : ""
      }`}
    >
      <input
        accept="image/png, image/jpeg, image/avif, image/webp"
        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
        type="file"
        multiple
        onDragEnter={onEnterUploader}
        onDragLeave={onLeaveUploader}
        onDrop={onLeaveUploader}
        onChange={(e) => handleOnChange(e)}
      />
      <div className="flex flex-col items-center gap-2">
        <svg viewBox="0 0 24 24" fill="currentColor" height="4rem" width="4rem">
          <path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z" />
          <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8z" />
          <path d="M12 12l-1-1-2 3h10l-4-6z" />
        </svg>
        <p className="text-gray-400 text-center">
          Click or drag your files (.png, .jpg, .avif, .web) to transform
        </p>
      </div>
    </section>
  );
}

export default UploadSection;
