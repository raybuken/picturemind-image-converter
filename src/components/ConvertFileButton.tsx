import React from 'react'

interface ConvertFileButtonProps {
  text?: string
}

function ConvertFileButton({ text = 'Convert' }: ConvertFileButtonProps) {
  return (
    <button type='submit' className="btn bg-primary border-transparent hover:bg-purple-400 w-40 ml-auto">{text}</button>
  )
}

export default ConvertFileButton