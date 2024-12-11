import { FileOptions, TransformationOptions } from '@/types'
import React, { useRef } from 'react'


interface FileTransformationOptionsProps {
  fileOptions: FileOptions,
  updateFileTransformations: (newTransformationOptions: TransformationOptions) => void
}

function FileTransformationOptions({ fileOptions, updateFileTransformations }: FileTransformationOptionsProps) {
  const widthInputRef = useRef<HTMLInputElement>(null)
  const heightInputRef = useRef<HTMLInputElement>(null) 

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const width = parseInt(widthInputRef.current?.value as string)
    const height = parseInt(heightInputRef.current?.value as string)
    
    if(width && height) {
      updateFileTransformations({
        width,
        height, 
        quality: fileOptions.transformations?.quality || 100
      })
    }
  }

  return (
    <form className='grid grid-cols-2 gap-2' onSubmit={onSubmit}>
      <label className='form-control'>
        <span className='label-text'>Width</span>
        <input type="number" name='width' className="input input-primary" placeholder="Width" step={1} min={0} ref={widthInputRef}/>
      </label>
      <label className='form-control'>
        <span className='label-text'>Height</span>
        <input type="number" name='height' className="input input-primary" placeholder="Height" step={1} min={0} ref={heightInputRef}/>
      </label>

      <button className='btn btn-primary' type="submit">Save</button>
    </form>
  )
}

export default FileTransformationOptions