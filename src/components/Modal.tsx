import React, { useId } from 'react'

function Modal({ children, ref }: { children: React.ReactNode, ref: React.RefObject<HTMLDialogElement> }) {
    const formId = useId()
    return (
        <dialog id={`form-${formId}`} className='modal' ref={ref}>
            <div className="modal-box">
                <button type='button' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => ref.current?.close()}>✕</button>
                {children}
            </div>
        </dialog>
    )
}

export default Modal