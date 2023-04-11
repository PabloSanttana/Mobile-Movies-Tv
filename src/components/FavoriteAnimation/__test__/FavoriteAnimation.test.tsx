import React from "react";
import { render } from "@testing-library/react-native";

import FavoriteAnimation from "../index";

describe("FavoriteAnimation", () => {
  it("renders the heart animation", () => {
    const { getByTestId } = render(<FavoriteAnimation />);

    expect(getByTestId("Heart")).toBeTruthy();
  });

  it("has the correct style properties", () => {
    const { getByTestId } = render(<FavoriteAnimation />);
    const heartContainer = getByTestId("Heart");
    const heartAnimation = getByTestId("Heart_Animation");

    expect(heartContainer.props.style).toEqual({
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    });
    expect(heartAnimation.props.style).toEqual({
      aspectRatio: 1.3333333333333333,
      height: expect.any(Number),
      borderRadius: 5,
      backgroundColor: "transparent",
      width: "100%",
    });
  });
});
