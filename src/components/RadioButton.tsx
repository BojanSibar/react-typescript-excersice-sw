import React from "react";
import styled from "styled-components";

type Props = {
  name: string;
  value: string;
  id: string;
  checked: boolean;
  label: string;
  onClick: () => void;
};

const RadioButton = ({
  name,
  value,
  id,
  checked,
  label,
  onClick,
}: Props): JSX.Element => {
  return (
    <Wrapper>
      <Radio
        name={name}
        value={value}
        id={id}
        checked={checked}
        onChange={onClick}
        type="radio"
      />
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Radio = styled.input`
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  margin-bottom: 0px;
  display: inline-flex;
  gap: 10px;
  cursor: pointer;
`;

export default RadioButton;
