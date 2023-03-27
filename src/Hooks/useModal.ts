import { useState } from 'react';

const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openConfirmationModal = () => {
    setModalIsOpen(true);
  };

  const closeConfirmationModal = () => {
    setModalIsOpen(false);
  };

  return {
    modalIsOpen,
    openConfirmationModal,
    closeConfirmationModal,
  };
};

export default { useModal };
