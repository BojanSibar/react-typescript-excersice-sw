import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ title, onClick, disabled = false }: Props) => {
  return (
    <StButton disabled={disabled} onClick={onClick}>
      {title}
    </StButton>
  );
};

const StButton = styled.button<{ disabled: boolean }>`
  color: white;
  height: 30px;
  border-radius: 4px;
  background: ${({ disabled }) => (disabled ? "gray" : "blue")};
  &:hover {
    background: ${({ disabled }) => (disabled ? "gray" : "darkblue")};
  }
`;

export default Button;
