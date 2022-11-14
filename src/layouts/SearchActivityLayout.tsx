import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  labelNode: ReactNode;
  inputNode: ReactNode;
  buttonNode: ReactNode;
};

const SearchActivityLayout = ({
  labelNode,
  inputNode,
  buttonNode,
}: Props): JSX.Element => {
  return (
    <Wrapper>
      <div> {labelNode}</div>
      <div> {inputNode} </div>
      <div> {buttonNode}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default SearchActivityLayout;
