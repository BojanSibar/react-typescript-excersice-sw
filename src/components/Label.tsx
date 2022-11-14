import React from "react";
import styled from "styled-components";

type Props = {
  title: string;
  htmlFor?: string;
};

const Label = ({ title, htmlFor }: Props) => {
  return <StLabel htmlFor={htmlFor}>{title}</StLabel>;
};

const StLabel = styled.label`
  display: inline-block;
`;

export default Label;
