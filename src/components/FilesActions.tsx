import { IMAGE_FORMATS } from '@/constants/constants'
import { upload } from '@/services/uploadService'
import { FileOptions } from '@/types'
import React from 'react'
import DownloadButton from './DownloadButton'
import ConvertFileButton from './ConvertFileButton'

interface FilesActionsProps {
    files: Array<File>
}

function FilesActions({ files }: FilesActionsProps) {
    const [downloadData, setDownloadData] = React.useState({
        url: '',
        enable: false
    })
    const [filesOptions, setFileOptions] = React.useState<FileOptions>({
        format: '',
        transformations: null
    })

    const [loading, setLoading] = React.useState(false)

    const filteredFiles = files.filter(file => IMAGE_FORMATS.some(format => format.value === file.type))
    const fileCounts = filteredFiles.length
    
    const onChangeFileFormat = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFileOptions(prevOptions => {
            return {
                ...prevOptions,
                format: e.target.value
            }
        })
    }

    const convertFiles = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData()

        filteredFiles.forEach(file => {
            formData.append('images', file)
        })
        formData.append('format', filesOptions.format)

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

    return (
        <form className={`grid grid-cols-${downloadData.enable ? 2 : 3} items-center rounded gap-3 bg-gray-600 py-4 mt-20 px-5`} onSubmit={convertFiles}>
            <span>Convert {fileCounts} files</span>
            {!downloadData.enable &&
                <label className='form-control' >
                        <select className='select select-primary' defaultValue='' required onChange={onChangeFileFormat}>
                            <option disabled value=''>Select a format</option>
                            {IMAGE_FORMATS.map(format =>
                                <option key={format.name} value={format.name.toLowerCase()}>{format.name}</option>
                            )}
                        </select>
                </label>
            }
            {downloadData.enable ?
                <DownloadButton url={downloadData.url} text='Download all' loading={loading}/> :
                <ConvertFileButton text={`Convert ${fileCounts} files`}/>
            }
        </form>
    )
}

export default FilesActions