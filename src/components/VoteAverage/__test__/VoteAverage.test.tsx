import React from "react";
import { render } from "@testing-library/react-native";

import VoteAverage, { arePropsEqualVoteAverage } from "../index";

describe("VoteAverage", () => {
  it("renders correctly with default props", () => {
    const {} = render(
      <VoteAverage
        backgroundColor="white"
        progressValueColor="green"
        titleColor="black"
        progressValue={5}
      />
    );
  });
  it("arePropsEqual returns true for identical props and false for non-identical props", () => {
    const props1 = {
      progressValue: 7,
      titleColor: "red",
      progressValueColor: "red",
      backgroundColor: "red",
    };
    const props2 = {
      progressValue: 7,
      titleColor: "red",
      progressValueColor: "red",
      backgroundColor: "red",
    };
    const props3 = {
      progressValue: 6,
      titleColor: "red",
      progressValueColor: "red",
      backgroundColor: "green",
    };
    expect(arePropsEqualVoteAverage(props1, props2)).toBe(true);
    expect(arePropsEqualVoteAverage(props1, props3)).toBe(false);
  });
});
