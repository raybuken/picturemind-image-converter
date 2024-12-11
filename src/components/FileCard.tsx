import React, { useRef, useState } from 'react'
import {filesize} from "filesize";
import { IMAGE_FORMATS } from '@/constants/constants';
import CloseIcon from './Icon/CloseIcon';
import { useFilesContext } from '@/context/FilesContext';
import { upload } from '@/services/uploadService';
import { FileOptions, TransformationOptions } from '@/types';
import DownloadButton from './DownloadButton';
import ConvertFileButton from './ConvertFileButton';
import Modal from './Modal';
import FileTransformationOptions from './FileTransformationOptions';
import IconSettings from './Icon/IconSettings';
import { createPortal } from 'react-dom';

interface FileCardProps {
    file: File,
    isValidFile: boolean,
    index: number
}

function FileCard({ file, isValidFile, index }: FileCardProps) {
    const modalRef = useRef<HTMLDialogElement>(null)
    const { setFiles } = useFilesContext()
    const [fileOptions, setFileOptions] = useState<FileOptions>({
        format: file.type,
        transformations: null
    })

    const [downloadData, setDownloadData] = useState({
        url: '',
        enable: false
    })

    const [loading, setLoading] = useState(false)

    const onChangeFileFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFileOptions(prevOptions => {
            return {
                ...prevOptions,
                format: e.target.value
            }
        })
    }
    
    const removeFile = (index: number) => {
        setFiles(prevFiles => {
            const newFiles = [...prevFiles.filter((file, i) => i !== index)]
            return newFiles
        })
    }

    const convertFile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('images', file)
        formData.append('format', fileOptions.format)
        if(fileOptions.transformations) {
            formData.append('transformations', JSON.stringify(fileOptions.transformations))
        }   

        setLoading(true)
        upload(formData).then(res => {
            if(res.success) {
                setDownloadData({
                    url: res.url as string,
                    enable: true
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }

   const updateFileTransformations = (newTransformationOptions: TransformationOptions) =>{
        setFileOptions(prevOptions => {
            return {
                ...prevOptions,
                transformations: newTransformationOptions
            }
        })
        modalRef.current?.close()
    }

    return (
        <>
            <form className='grid grid-cols-2 md:grid-cols-4 items-center justify-between w-full bg-gray-600 py-4 px-10 rounded relative gap-3' onSubmit={convertFile}>
                <span className='break-words font-bold'>{file.name}</span>
                {
                    isValidFile ?
                        <>
                            <label className='form-control flex-row gap-2'>
                                <select className='select select-primary w-[80%]' defaultValue='' required onChange={onChangeFileFormat} disabled={downloadData.enable}>
                                    <option disabled value=''>Select a format</option>
                                    {IMAGE_FORMATS.map(format => 
                                        <option key={format.name} value={format.name.toLowerCase()}>{format.name}</option>
                                    )}
                                </select>
                                <button type='button' disabled={downloadData.enable} onClick={() => modalRef.current?.showModal()}>
                                    <IconSettings disabled={downloadData.enable}/>
                                </button>
                            </label>
                            <span className='md:text-center'>{filesize(file.size, {standard: 'jedec'})}</span>
                            {downloadData.enable ? 
                                <DownloadButton url={downloadData.url} loading={loading}/> :
                                <ConvertFileButton/>
                            }
                        </>
                    : <span className='font-bold text-error md:col-span-3 md:ml-auto'>Invalid File format</span>
                }
                <button type='button' className='absolute right-0' onClick={() => removeFile(index)} aria-label='Remove file'>
                    <CloseIcon/>
                </button>
            </form>
            {
                createPortal(
                    <Modal ref={modalRef}>
                        <FileTransformationOptions fileOptions={fileOptions} updateFileTransformations={updateFileTransformations}/>
                    </Modal>,
                    document.body
                )
            }
        </>
    )
}

export default FileCard