import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  locationsNode: ReactNode;
  keywordNode: ReactNode;
  resultsNode: ReactNode;
  children: ReactNode;
};

const MainAppLayout = ({
  locationsNode,
  keywordNode,
  resultsNode,
  children,
}: Props): JSX.Element => {
  return (
    <Wrapper>
      <LocationNode>{locationsNode}</LocationNode>
      <KeywordNode>{keywordNode}</KeywordNode>
      <ResultNode>{resultsNode}</ResultNode>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px auto;
  gap: 10px;
  grid-template-areas:
    "location keyword"
    "results results";
`;

const LocationNode = styled.div`
  grid-area: location;
`;

const KeywordNode = styled.div`
  grid-area: keyword;
`;

const ResultNode = styled.div`
  grid-area: results;
`;

export default MainAppLayout;
