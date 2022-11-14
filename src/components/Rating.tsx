import React from "react";
import styled from "styled-components";
import Label from "./Label";

type Props = {
  rating: number;
  maxRating?: number;
};

const Rating = ({ rating, maxRating = 5 }: Props) => {
  const percentage = Math.fround((rating / maxRating) * 100);
  return (
    <ProgressBar>
      <div style={{ width: `${percentage}%` }} />
      <Label title={`${rating} out of ${maxRating}`} />
    </ProgressBar>
  );
};

const ProgressBar = styled.div<{ outsideWidth?: number }>`
  height: 5px;
  background-color: grey;
  width: ${({ outsideWidth }) => (outsideWidth ? outsideWidth : 200)}px;
  div {
    height: 100%;
    background-color: blue;
  }
`;
export default Rating;
