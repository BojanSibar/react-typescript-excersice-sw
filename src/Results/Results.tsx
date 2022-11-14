import React from "react";
import Label from "../components/Label";
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import { SearchStatus } from "../hooks/useNearbySearch";
import language from "../language/language";
import ResultLayout from "../layouts/ResultLayout";

type Props = {
  keyword: string;
  results: google.maps.places.PlaceResult[];
  status: SearchStatus;
};

const Results = ({ keyword, results, status }: Props): JSX.Element => {
  const isLoading = status === "fetching";
  const isSearched = status !== "init";
  const searchKeyword = keyword ? keyword : "";
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Label title={language.resultsLabel} />
          {isSearched && (
            <div>
              {results.length === 0 ? (
                <Label title={`${language.noResults} for "${searchKeyword}"`} />
              ) : (
                <Label
                  title={`${language.resultsLabel} for "${searchKeyword}"`}
                />
              )}
            </div>
          )}
          {results.map((result) => {
            return (
              <ResultLayout
                key={result.place_id}
                titleNode={<Label title={result.name || ""} />}
                addressNode={<Label title={result.vicinity || ""} />}
                ratingNode={<Rating rating={result.rating || 0} />}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default Results;
