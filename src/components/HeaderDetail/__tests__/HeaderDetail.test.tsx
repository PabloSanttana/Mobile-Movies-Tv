import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { dark } from "../../../theme/dark";

import HeaderDetail, { HeaderDetailProps } from "../index";
import { ThemeProvider } from "styled-components/native";
import { scale } from "react-native-size-matters";

jest.mock("react-native-iphone-x-helper", () => ({
  getStatusBarHeight: jest.fn(),
}));
jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    AntDesign: View,
    Octicons: View,
  };
});

describe("HeaderDetail", () => {
  const mockProps: HeaderDetailProps = {
    onPressLeft: jest.fn(),
    onPressRight: jest.fn(),
    deviceType: "phone",
  };

  it("renders correctly with required props", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <HeaderDetail {...mockProps} />
      </ThemeProvider>
    );
    expect(getByTestId("arrowleft")).toBeTruthy();
    expect(getByTestId("home")).toBeTruthy();
  });
  it("renders is component for phone", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <HeaderDetail {...mockProps} />
      </ThemeProvider>
    );
    const size = getByTestId("arrowleft").props.children[0].props.size;
    expect(size).toEqual(scale(20));
  });
  it("renders is component for tablet", () => {
    const mockPropsTablet = {
      ...mockProps,
      deviceType: "tablet",
    };
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <HeaderDetail {...mockPropsTablet} />
      </ThemeProvider>
    );

    const size = getByTestId("arrowleft").props.children[0].props.size;
    expect(size).toEqual(scale(14));
  });

  it("calls onPressRight function when right icon button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <HeaderDetail {...mockProps} />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId("home"));
    expect(mockProps.onPressRight).toBeCalledTimes(1);
  });
  it("calls onPressLeft function when Left icon button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <HeaderDetail {...mockProps} />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId("arrowleft"));
    expect(mockProps.onPressLeft).toBeCalledTimes(1);
  });
});
