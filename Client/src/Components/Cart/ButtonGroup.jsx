// GroupedButton.jsx
import React from 'react';
import { ButtonGroup, Button, styled } from '@mui/material';

const Component = styled(ButtonGroup)`
  margin-top: 30px;
`;

const StyleButton = styled(Button)`
  border-radius: 50%;
`;

export default function GroupedButton({ item, increaseItemQuantity, decreaseItemQuantity }) {
  return (
    <Component>
      <StyleButton onClick={decreaseItemQuantity}>-</StyleButton>
      <Button disabled>{item.quantity}</Button>
      <StyleButton onClick={increaseItemQuantity}>+</StyleButton>
    </Component>
  );
}
