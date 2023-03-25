import Modal from '@mui/material/Modal';
import React from 'react';

import RoundButton from 'Components/RoundButton/RoundButton';
import { VariantEnum } from 'Models/UserInterfaceResources';

import {
  ActionsContainer,
  ContentBox,
  ModalContainer,
  ModalHeader,
  WarningInfo,
} from './styles';

interface Props {
  onClick?: () => void;
  closeModal: () => void;
  isOpen: boolean;
  message: string;
}

export default function ConfirmModal({
  onClick,
  isOpen,
  closeModal,
  message,
}: Props) {
  return (
    <Modal open={isOpen}>
      <ModalContainer onClick={onClick}>
        <ContentBox>
          <ModalHeader>
            <WarningInfo>{message}</WarningInfo>
          </ModalHeader>
          <ActionsContainer>
            <RoundButton variant={VariantEnum.secondary} onClick={closeModal}>
              Cancel
            </RoundButton>
            <RoundButton onClick={closeModal}>Confirm</RoundButton>
          </ActionsContainer>
        </ContentBox>
      </ModalContainer>
    </Modal>
  );
}
