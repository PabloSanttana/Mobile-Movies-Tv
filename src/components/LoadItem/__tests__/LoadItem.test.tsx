import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";

import LoadItem from "../index";

describe("LoadItem", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <LoadItem />
      </ThemeProvider>
    );

    expect(getByTestId("container").children.length).toEqual(5);
  });
});
