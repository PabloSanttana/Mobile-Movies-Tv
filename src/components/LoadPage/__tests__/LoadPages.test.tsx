import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";

import LoadPage from "../index";

describe("LoadPage", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <LoadPage />
      </ThemeProvider>
    );

    expect(getByTestId("container").children.length).toEqual(1);
  });
});
