import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    FontAwesome: View,
  };
});

import SearchInput from "../index";
describe("SearchInput", () => {
  const onPress = jest.fn();
  const setValue = jest.fn();

  it("should render correctly", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <SearchInput
          value=""
          deviceType="phone"
          setValue={setValue}
          onPress={onPress}
        />
      </ThemeProvider>
    );
    expect(getByTestId("container")).toBeDefined();
    expect(getByTestId("search")).toBeDefined();
    expect(getByTestId("button-search")).toBeDefined();
    expect(getByTestId("icon-search")).toBeDefined();
  });

  it("should call setValue on onChangeText", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <SearchInput
          value=""
          deviceType="phone"
          setValue={setValue}
          onPress={onPress}
        />
      </ThemeProvider>
    );
    const searchInput = getByTestId("search");

    // simulate typing in the search input
    fireEvent.changeText(searchInput, "John Wick");

    // check if setValue was called with the correct value
    expect(setValue).toHaveBeenCalledWith("John Wick");
  });

  it("should call onPress when button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <SearchInput
          value=""
          deviceType="tablet"
          setValue={setValue}
          onPress={onPress}
        />
      </ThemeProvider>
    );
    const buttonSearch = getByTestId("button-search");

    // simulate a press on the search button
    fireEvent.press(buttonSearch);

    // check if onPress was called
    expect(onPress).toBeCalledTimes(1);
  });
});
