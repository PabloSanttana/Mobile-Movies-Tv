import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";
import movies from "./mocks";

import ListCardHorizontal, {
  arePropsEqualListCardHorizontal,
  ListCardTvProps,
} from "../index";

describe("ListCardHorizontal", () => {
  describe("Component", () => {
    const mockProps: ListCardTvProps = {
      movies: movies,
      title: "Movies Title",
      deviceType: "phone",
      marginHorizontal: 20,
      onPressSeeMore: jest.fn(),
      onPressDetail: jest.fn(),
      doubleSize: false,
    };
    it("renders correctly with required props", () => {
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <ListCardHorizontal {...mockProps} />
        </ThemeProvider>
      );
      expect(getByText(/Movies Title/i)).toBeTruthy();
    });
    it("render item FlatList doubleSize is true is correct", () => {
      const mockPropsDoubleSize = {
        ...mockProps,
        deviceType: "tablet",
        doubleSize: true,
      };
      const { getByTestId } = render(
        <ThemeProvider theme={dark}>
          <ListCardHorizontal {...mockPropsDoubleSize} />
        </ThemeProvider>
      );

      expect(getByTestId("flatList").props.data.length).toEqual(5);
    });
    it("Item flatList onPress Detail", () => {
      const mockPropsDoubleSize = {
        ...mockProps,
        deviceType: "tablet",
        doubleSize: true,
      };
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <ListCardHorizontal {...mockPropsDoubleSize} />
        </ThemeProvider>
      );
      const button = getByText(movies[0].title);
      fireEvent.press(button);
      mockProps.onPressDetail;
      expect(mockProps.onPressDetail).toBeCalledTimes(1);
      expect(mockProps.onPressDetail).toBeCalledWith(
        movies[0].id,
        movies[0].media_type
      );
    });
  });

  describe("Function Are Props Equal React.mome", () => {
    it("returns true if previous and next props have the same title", () => {
      const prevProps: ListCardTvProps = {
        movies: movies,
        title: "Movies Title",
        deviceType: "phone",
        marginHorizontal: 20,
        onPressSeeMore: jest.fn(),
        onPressDetail: jest.fn(),
        doubleSize: false,
      };
      const nextProps: ListCardTvProps = {
        ...prevProps,
      };

      expect(arePropsEqualListCardHorizontal(prevProps, nextProps)).toBe(true);
    });
    it("returns false if previous and next props have different Props", () => {
      const prevProps: ListCardTvProps = {
        movies: movies,
        title: "Movies Title",
        deviceType: "phone",
        marginHorizontal: 20,
        onPressSeeMore: jest.fn(),
        onPressDetail: jest.fn(),
        doubleSize: false,
      };
      const nextProps: ListCardTvProps = {
        ...prevProps,
        movies: movies.slice(0, 2),
        deviceType: "tablet",
        doubleSize: true,
      };

      expect(arePropsEqualListCardHorizontal(prevProps, nextProps)).toBe(false);
    });
  });
});
