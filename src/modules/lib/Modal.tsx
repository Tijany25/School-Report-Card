import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto flex items-center justify-center ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute bg-gray-900 bg-opacity-50 inset-0" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg shadow-md p-4 max-w-lg">
        <div className="flex justify-between items-center mb-4 text-black">
          <h2>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            Close
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
