import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";

import ListCategory, {
  ListCategoryProps,
  arePropsEqualListCategory,
} from "../index";

describe("ListCategory", () => {
  describe("Component", () => {
    const mockProps: ListCategoryProps = {
      data: {
        "1": "category 1",
        "2": "category 2",
        "3": "category 3",
      },
      genreSelected: "0",
      selectGenre: jest.fn(),
      deviceType: "phone",
    };
    it("renders correctly with required props", () => {
      const { getAllByText } = render(
        <ThemeProvider theme={dark}>
          <ListCategory {...mockProps} />
        </ThemeProvider>
      );
      expect(getAllByText(/category/i).length).toEqual(3);
    });

    it("Select one category", () => {
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <ListCategory {...mockProps} />
        </ThemeProvider>
      );
      fireEvent.press(getByText(/category 2/i));
      expect(mockProps.selectGenre).toBeCalledWith("2");
    });

    it("Category selected styles modified", () => {
      const mockPropsCategorySelected: ListCategoryProps = {
        ...mockProps,
        genreSelected: "1",
      };
      const { getByText, debug } = render(
        <ThemeProvider theme={dark}>
          <ListCategory {...mockPropsCategorySelected} />
        </ThemeProvider>
      );
      debug();
      expect(getByText(/category 1/i).props.style[0].color).toEqual("#000");
      expect(getByText(/category 2/i).props.style[0].color).not.toEqual("#000");
    });
  });

  describe("Function Are Props Equal React.mome", () => {
    it("returns false if previous and next props have different Props", () => {
      const prevProps: ListCategoryProps = {
        data: {
          "1": "category 1",
          "2": "category 2",
          "3": "category 3",
        },
        genreSelected: "0",
        selectGenre: jest.fn(),
        deviceType: "phone",
      };
      const nextProps: ListCategoryProps = {
        ...prevProps,
      };

      expect(arePropsEqualListCategory(prevProps, nextProps)).toBe(true);
    });
    it("returns false if previous and next props have different Props", () => {
      const prevProps: ListCategoryProps = {
        data: {
          "1": "category 1",
          "2": "category 2",
          "3": "category 3",
        },
        genreSelected: "0",
        selectGenre: jest.fn(),
        deviceType: "phone",
      };
      const nextProps: ListCategoryProps = {
        ...prevProps,
        genreSelected: "1",
      };

      expect(arePropsEqualListCategory(prevProps, nextProps)).toBe(false);
    });
  });
});
