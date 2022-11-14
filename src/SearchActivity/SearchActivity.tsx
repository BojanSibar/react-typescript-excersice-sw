import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Label from "../components/Label";
import language from "../language/language";
import SearchActivityLayout from "../layouts/SearchActivityLayout";

type Props = {
  keyword: string;
  passedValidation: boolean;
  setKeyword: (value: string) => void;
  onSearchHit: () => void;
};

const SearchActivity = ({
  keyword,
  passedValidation,
  setKeyword,
  onSearchHit,
}: Props): JSX.Element => {
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };
  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchHit();
    }
  };
  return (
    <SearchActivityLayout
      labelNode={
        <Label htmlFor="inputActivitySearch" title={language.searchLabel} />
      }
      inputNode={
        <input
          id="inputActivitySearch"
          value={keyword}
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
        />
      }
      buttonNode={
        <Button
          disabled={!passedValidation}
          onClick={onSearchHit}
          title={language.searchLabel}
        />
      }
    />
  );
};

export default SearchActivity;
