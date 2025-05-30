"use client"

import { MdClose } from "react-icons/md";


const Modal = () => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bgColor bg-opacity-50 z-50">
      <div className="bg-blue rounded-lg p-5 shadow-lg w-80 md:w-96 relative">
        <button
          className="absolute top-3 right-3 text-ascent-1 hover:text-ascent-2"
        >
          <MdClose size={22} />
        </button>
        {ModalContent && <ModalContent {...modalProps} />}
      </div>
    </div>
  );
};

export default Modal;
