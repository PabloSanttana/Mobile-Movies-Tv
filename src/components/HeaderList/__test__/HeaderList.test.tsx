import React from "react";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";
import { render, fireEvent } from "@testing-library/react-native";
import HeaderList, { HeaderListProps, arePropsEqualHeaderList } from "../index";

describe("HeaderList", () => {
  describe("Compontes renders", () => {
    const defaultProps: HeaderListProps = {
      title: "Test Header",
      onPress: jest.fn(),
      deviceType: "mobile",
      isMore: true,
    };
    it("should render with title", () => {
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <HeaderList {...defaultProps} />
        </ThemeProvider>
      );
      expect(getByText("Test Header")).toBeDefined();
    });
    it("should render with title is not isMore", () => {
      const data = {
        title: "Test Header",
        onPress: jest.fn(),
        deviceType: "tablet",
      };
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <HeaderList {...data} />
        </ThemeProvider>
      );
      expect(getByText("Test Header")).toBeDefined();
    });
    it('should call onPress when "Ver mais" button is pressed', () => {
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <HeaderList {...defaultProps} />
        </ThemeProvider>
      );
      fireEvent.press(getByText("Ver mais"));
      expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
    });
    it('should not render "Ver mais" button when isMore prop is false', () => {
      const { queryByText } = render(
        <ThemeProvider theme={dark}>
          <HeaderList {...defaultProps} isMore={false} />
        </ThemeProvider>
      );
      expect(queryByText("Ver mais")).toBeNull();
    });

    it("should pass correct props to Container and Title components", () => {
      const { getByTestId } = render(
        <ThemeProvider theme={dark}>
          <HeaderList {...defaultProps} />
        </ThemeProvider>
      );
      const title = getByTestId("title");

      expect(title.props.children).toBe("Test Header");
      expect(title.props.style[0].fontSize).toEqual(expect.any(Number));
    });
    it("should render memoized component", () => {
      const { rerender } = render(
        <ThemeProvider theme={dark}>
          <HeaderList {...defaultProps} />
        </ThemeProvider>
      );
      const memoizedComponent = rerender(
        <ThemeProvider theme={dark}>
          <HeaderList {...defaultProps} />
        </ThemeProvider>
      );
      expect(memoizedComponent).toMatchSnapshot();
    });
  });

  describe("arePropsEqualHeaderList function is correct", () => {
    it("returns true if previous and next props have the same title", () => {
      const prevProps = {
        title: "Header Title",
        deviceType: "phone",
        onPress: jest.fn(),
      };
      const nextProps = {
        title: "Header Title",
        deviceType: "phone",
        onPress: jest.fn(),
      };
      expect(arePropsEqualHeaderList(prevProps, nextProps)).toBe(true);
    });

    it("returns false if previous and next props have different titles", () => {
      const prevProps = {
        title: "Header Title",
        deviceType: "phone",
        onPress: jest.fn(),
      };
      const nextProps = {
        title: "New Header Title",
        deviceType: "phone",
        onPress: jest.fn(),
      };
      expect(arePropsEqualHeaderList(prevProps, nextProps)).toBe(false);
    });
  });
});
