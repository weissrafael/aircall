import React, { ReactNode } from 'react';

import { Variant } from 'Models/UserInterfaceResources';

import { StyledButton } from './styles';

interface Props {
  onClick: () => void;
  children: ReactNode;
  variant?: Variant;
}

export default function RoundButton({
  onClick,
  children,
  variant = 'primary',
}: Props) {
  return (
    <StyledButton variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
