import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";

import SectionCollection, {
  SectionCollectionProps,
  arePropsEqualSectionCollection,
} from "../index";

describe("<SectionCollection />", () => {
  describe("Component", () => {
    const mocksProps: SectionCollectionProps = {
      data: {
        id: 1,
        name: "collection",
        backdrop_path: "/backdrop/path",
        poster_path: "/poster/path",
      },
      deviceType: "phone",
      onPress: jest.fn(),
    };

    it("renders section collection component with valid props", () => {
      const { getByText, getByTestId } = render(
        <ThemeProvider theme={dark}>
          <SectionCollection {...mocksProps} />
        </ThemeProvider>
      );
      expect(getByText(mocksProps.data.name)).toBeTruthy();
      expect(getByTestId("background-image-collection")).toBeTruthy();
      expect(getByTestId("image")).toBeTruthy();
      expect(getByTestId("button-collection")).toBeTruthy();
    });

    it("does not render button collection when data is falsy", () => {
      const { queryByTestId } = render(
        <ThemeProvider theme={dark}>
          <SectionCollection
            data={null}
            deviceType="phone"
            onPress={() => {}}
          />
        </ThemeProvider>
      );
      expect(queryByTestId("button-collection")).toBeFalsy();
    });

    it("calls onPress function when button is pressed", () => {
      const { getByTestId } = render(
        <ThemeProvider theme={dark}>
          <SectionCollection {...mocksProps} />
        </ThemeProvider>
      );
      fireEvent.press(getByTestId("button-collection"));
      expect(mocksProps.onPress).toHaveBeenCalledWith(mocksProps.data.id);
    });
  });

  describe("Function Are Props Equal React.mome", () => {
    it("returns True if previous and next props have equal props", () => {
      const prevProps: SectionCollectionProps = {
        data: {
          id: 1,
          name: "collection",
          backdrop_path: "/backdrop/path",
          poster_path: "/poster/path",
        },
        deviceType: "phone",
        onPress: jest.fn(),
      };
      const nextProps: SectionCollectionProps = {
        ...prevProps,
      };

      expect(arePropsEqualSectionCollection(prevProps, nextProps)).toBe(true);
    });
    it("returns false if previous and next props have different Props", () => {
      const prevProps: SectionCollectionProps = {
        data: {
          id: 1,
          name: "collection",
          backdrop_path: "/backdrop/path",
          poster_path: "/poster/path",
        },
        deviceType: "phone",
        onPress: jest.fn(),
      };
      const nextProps: SectionCollectionProps = {
        ...prevProps,
        data: {
          id: 2,
          name: "collection 2",
          backdrop_path: "/backdrop2/path",
          poster_path: "/poster2/path",
        },
      };

      expect(arePropsEqualSectionCollection(prevProps, nextProps)).toBe(false);
    });
  });
});
