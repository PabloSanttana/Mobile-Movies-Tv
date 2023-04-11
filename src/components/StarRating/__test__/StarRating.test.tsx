import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";
import StarRating, { arePropsEquaStarRating } from "../index";

describe("StarRating", () => {
  describe("rating was passed", () => {
    it("show the average is correct", () => {
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <StarRating value={7} />
        </ThemeProvider>
      );
      expect(getByText("7.0")).toBeTruthy();
    });
    it("renders all stars in the list is correct", () => {
      const list = [
        { name: "star-0" },
        { name: "star-1" },
        { name: "star-2" },
        { name: "star-half-o-3" },
        { name: "star-o-4" },
      ];
      const { getByTestId, queryByTestId } = render(
        <ThemeProvider theme={dark}>
          <StarRating value={7.0} />
        </ThemeProvider>
      );
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const testId = `${item.name}`;
        const element = getByTestId(testId);
        expect(element).toBeTruthy();
      }
      expect(queryByTestId("star4-3")).toBeFalsy();
    });
  });

  describe("arePropsEqual", () => {
    test("returns true if prevProps.value equals nextProps.value", () => {
      // Create sample props with the same value
      const prevProps = { value: 3 };
      const nextProps = { value: 3 };

      // Call the function and assert that it returns true
      expect(arePropsEquaStarRating(prevProps, nextProps)).toBe(true);
    });

    test("returns false if prevProps.value does not equal nextProps.value", () => {
      // Create sample props with different values
      const prevProps = { value: 2 };
      const nextProps = { value: 4 };

      // Call the function and assert that it returns false
      expect(arePropsEquaStarRating(prevProps, nextProps)).toBe(false);
    });
  });
});
