import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ButtonProps {
  handleClick: () => void;
}

interface ModalProps {
  title?: string;
  isOpen?: boolean;
  closeButton?: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

function CloseButton({ handleClick }: ButtonProps) {
  return (
    <button
      className='p-2 bg-gray-200/50 hover:bg-gray-300 text-xl rounded-lg text-gray-700 transition-colors duration-200'
      onClick={handleClick}
      aria-label="Close modal"
    >
      <AiOutlineClose />
    </button>
  );
}

const Modal = ({
  title,
  isOpen = false,
  handleClose,
  closeButton = true,
  children,
}: ModalProps) => {
  if (!isOpen) return;

  return (
    <div
      className={`h-screen w-screen flex items-center justify-center fixed top-0 left-0 bg-black/40 p-4 modal-overlay z-50 duration-300 backdrop-blur-md`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className='p-6 md:p-8 w-full max-w-2xl bg-gradient-to-br from-white via-blue-50/50 to-white rounded-3xl duration-300 max-h-[85vh] overflow-y-auto shadow-2xl border border-white/20 backdrop-blur-md'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200/60'>
          <p className='text-gray-900 font-bold text-lg md:text-xl capitalize'>
            {title ?? ''}
          </p>
          {closeButton && <CloseButton handleClick={handleClose} />}
        </div>

        <div className='text-gray-800'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
