import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  titleNode: ReactNode;
  addressNode: ReactNode;
  ratingNode: ReactNode;
};

const ResultLayout = ({
  titleNode,
  addressNode,
  ratingNode,
}: Props): JSX.Element => {
  return (
    <Wrapper>
      <TwoColumns>
        <div>{titleNode}</div>
        <div>{addressNode}</div>
      </TwoColumns>
      <div>{ratingNode}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  border: 1px solid black;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
`;

const TwoColumns = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ResultLayout;
