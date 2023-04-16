import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";

import NotFound from "../index";

describe("NotFound", () => {
  it("renders correctly", () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={dark}>
        <NotFound />
      </ThemeProvider>
    );

    expect(getByTestId("container").children.length).toEqual(1);
    expect(getByText("Nenhum item foi encontrado!")).toBeTruthy();
  });
});
