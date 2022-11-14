import React, { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  labelNode: ReactNode;
  children: ReactNode;
};

const LocationPickerLayout = ({ children, labelNode }: Props): JSX.Element => {
  return (
    <Wrapper>
      {labelNode}
      <TwoColumn>{children}</TwoColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  & > * {
    min-height: 1px;
  }
`;

const TwoColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  & > * {
    flex: 80px 80px 80px;
  }
`;

export default LocationPickerLayout;
