import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { dark } from "../../../theme/dark";
import { ThemeProvider } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Header, { arePropsEqualHeader, HeaderProps } from "../index";
import { View } from "react-native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => {
  const { View } = require("react-native");
  return {
    AntDesign: View,
  };
});

jest.mock("react-native-iphone-x-helper", () => ({
  getStatusBarHeight: jest.fn(),
}));

describe("Header", () => {
  const mockProps: HeaderProps = {
    title: "Header Title",
    iconRight: () => <></>,
    onPressRight: jest.fn(),
    deviceType: "mobile",
  };

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with required props", () => {
    const { getByText } = render(
      <ThemeProvider theme={dark}>
        <Header {...mockProps} />
      </ThemeProvider>
    );
    expect(getByText(mockProps.title)).toBeTruthy();
  });

  it("right icon button is correct", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <Header {...mockProps} />
      </ThemeProvider>
    );
    expect(getByTestId("goBack")).toBeTruthy();
  });
  it("calls onPressGoBack function when goBack icon button is pressed", () => {
    const navigation = useNavigation();
    const spyFn = jest.spyOn(navigation, "goBack");
    const mockPropsRemovedIconRight = {
      ...mockProps,
    };
    delete mockPropsRemovedIconRight.iconRight;
    const { getByTestId, debug } = render(
      <ThemeProvider theme={dark}>
        <Header {...mockPropsRemovedIconRight} />
      </ThemeProvider>
    );
    debug();
    fireEvent.press(getByTestId("goBack"));
    expect(spyFn).toBeCalledTimes(1);
  });
  it("calls onPressRight function when right icon button is pressed", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <Header {...mockProps} />
      </ThemeProvider>
    );

    fireEvent.press(getByTestId("RightTouchableOpacity"));
    expect(mockProps.onPressRight).toBeCalledTimes(1);
  });
  it("Show is correct Button right", () => {
    const mockShowButtonRightProps = {
      ...mockProps,
      iconRight: () => <View testID="Buttonright"></View>,
    };
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <Header {...mockShowButtonRightProps} />
      </ThemeProvider>
    );

    expect(getByTestId(/Buttonright/i)).toBeTruthy();
  });
  it("props removedBackground is true", () => {
    const mockShowButtonRightProps = {
      ...mockProps,
      removedBackground: true,
      deviceType: "tablet",
    };
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <Header {...mockShowButtonRightProps} />
      </ThemeProvider>
    );

    expect(
      getByTestId("HeaderContainerID").props.style[1].backgroundColor
    ).toEqual("transparent");
  });

  describe("arePropsEqualHeader function is correct", () => {
    it("returns true if previous and next props have the same title", () => {
      const prevProps = { title: "Header Title", deviceType: "phone" };
      const nextProps = { title: "Header Title", deviceType: "phone" };
      expect(arePropsEqualHeader(prevProps, nextProps)).toBe(true);
    });

    it("returns false if previous and next props have different titles", () => {
      const prevProps = { title: "Header Title", deviceType: "phone" };
      const nextProps = { title: "New Header Title", deviceType: "phone" };
      expect(arePropsEqualHeader(prevProps, nextProps)).toBe(false);
    });
  });
});
