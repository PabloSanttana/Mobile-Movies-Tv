import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";
import ListCardCastHorizontal, {
  ListCardCastHorizontalProps,
  arePropsEqualListCardCastHorizontal,
} from "../index";
import dataMocks from "./mocks";

describe("ListCardCastHorizontal", () => {
  const mockProps: ListCardCastHorizontalProps = {
    data: dataMocks,
    onPress: jest.fn(),
    title: "Cast",
    deviceType: "phone",
  };
  it("renders correctly with required props", () => {
    const { getByText } = render(
      <ThemeProvider theme={dark}>
        <ListCardCastHorizontal {...mockProps} />
      </ThemeProvider>
    );
    expect(getByText("Cast")).toBeTruthy();
  });
  it("renders correctly with required props is data undefined", () => {
    const mockPropsDataEmpty: ListCardCastHorizontalProps = {
      data: [],
      onPress: jest.fn(),
      title: "Cast",
      deviceType: "tablet",
    };
    const { toJSON } = render(
      <ThemeProvider theme={dark}>
        <ListCardCastHorizontal {...mockPropsDataEmpty} />
      </ThemeProvider>
    );

    expect(toJSON()).toEqual(null);
  });

  describe("FlatList", () => {
    it("renders correctly with required data", () => {
      const { getByTestId } = render(
        <ThemeProvider theme={dark}>
          <ListCardCastHorizontal {...mockProps} deviceType="tablet" />
        </ThemeProvider>
      );
      expect(getByTestId("flatList")).toBeTruthy();
    });
    it("renders default 5 item", () => {
      const { getAllByText } = render(
        <ThemeProvider theme={dark}>
          <ListCardCastHorizontal {...mockProps} />
        </ThemeProvider>
      );
      expect(getAllByText(/name/i).length).toBe(5);
    });
  });
  describe("arePropsEqualListCardCastHorizontal function is correct", () => {
    it("returns true if previous and next props have the same title", () => {
      const prevProps: ListCardCastHorizontalProps = {
        data: dataMocks,
        onPress: jest.fn(),
        title: "Cast",
        deviceType: "phone",
      };
      const nextProps: ListCardCastHorizontalProps = {
        data: dataMocks,
        onPress: jest.fn(),
        title: "Cast",
        deviceType: "phone",
      };

      expect(arePropsEqualListCardCastHorizontal(prevProps, nextProps)).toBe(
        true
      );
    });

    it("returns false if previous and next props have different titles", () => {
      const prevProps: ListCardCastHorizontalProps = {
        data: dataMocks,
        onPress: jest.fn(),
        title: "Cast",
        deviceType: "phone",
      };
      const nextProps: ListCardCastHorizontalProps = {
        data: [],
        onPress: jest.fn(),
        title: "Cast",
        deviceType: "phone",
      };

      expect(arePropsEqualListCardCastHorizontal(prevProps, nextProps)).toBe(
        false
      );
    });
  });
});
