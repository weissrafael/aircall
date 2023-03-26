import Modal from '@mui/material/Modal';
import React from 'react';

import RoundButton from 'Components/RoundButton/RoundButton';
import { VariantEnum } from 'Models/UserInterfaceResources';
import { StyledCircularProgressModal } from 'Styles/common.styles';

import {
  ActionsContainer,
  ContentBox,
  ModalContainer,
  ModalHeader,
  WarningInfo,
} from './styles';

interface Props {
  onClick: () => void;
  closeModal: () => void;
  isOpen: boolean;
  message: string;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

export default function ConfirmModal({
  onClick,
  isOpen,
  closeModal,
  message,
  isLoading,
  isError,
  isSuccess,
}: Props) {
  return (
    <Modal open={isOpen}>
      <ModalContainer>
        <ContentBox>
          <ModalHeader>
            {isLoading && <StyledCircularProgressModal />}
            {isError && !isLoading && (
              <WarningInfo>Oops! Something went wrong</WarningInfo>
            )}
            {isSuccess && !isLoading && <WarningInfo>All done!</WarningInfo>}
            {!isLoading && !isError && !isSuccess && (
              <WarningInfo>{message}</WarningInfo>
            )}
          </ModalHeader>
          <ActionsContainer>
            <RoundButton variant={VariantEnum.secondary} onClick={closeModal}>
              Cancel
            </RoundButton>
            <RoundButton onClick={onClick}>Confirm</RoundButton>
          </ActionsContainer>
        </ContentBox>
      </ModalContainer>
    </Modal>
  );
}
