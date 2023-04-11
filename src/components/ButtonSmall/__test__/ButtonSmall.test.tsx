import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import ButtonSmall, {
  arePropsEqualButtonSmall,
  ButtonSmallProps,
} from "../index";
import { dark } from "../../../theme/dark";

describe("ButtonSmall", () => {
  const defaultProps: ButtonSmallProps = {
    data: ["id", "Button Text"],
    deviceType: "phone",
  };
  it("should render correctly", () => {
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={dark}>
        <ButtonSmall {...defaultProps} />
      </ThemeProvider>
    );

    expect(getByTestId("button-small")).toBeTruthy();
    expect(getByText(/Button Text/i)).toBeTruthy();
  });

  it("should render active state correctly", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <ButtonSmall {...defaultProps} isActive={true} />
      </ThemeProvider>
    );

    expect(getByTestId("button-small").props.style.borderColor).toEqual(
      dark.colors.textCategory
    );

    expect(getByTestId("button-title").props.style[0].color).toEqual(
      dark.colors.textCategory
    );
  });

  it("should call onPress function when button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <ButtonSmall {...defaultProps} onPress={onPressMock} />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId("button-small"));
    expect(onPressMock).toBeCalledTimes(1);
  });

  it("arePropsEqual returns true for identical props and false for non-identical props", () => {
    const props1 = {
      ...defaultProps,
      isActive: false,
    };
    const props2 = {
      ...defaultProps,
      isActive: false,
    };
    const props3 = {
      ...defaultProps,
      isActive: true,
    };
    expect(arePropsEqualButtonSmall(props1, props2)).toBe(true);
    expect(arePropsEqualButtonSmall(props1, props3)).toBe(false);
  });
});
