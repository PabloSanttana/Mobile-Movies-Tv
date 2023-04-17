import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";

import SectionSeasons, {
  arePropsEqualSectionSeasons,
  SectionSeasonsProps,
} from "../index";

describe("<SectionSeasons />", () => {
  describe("Component", () => {
    const mockProps: SectionSeasonsProps = {
      data: {
        id: 1,
        air_date: "2022",
        episode_count: 12,
        name: "Apocalipse",
        overview: "overview",
        season_number: 1,
      },
      deviceType: "phone",
      onPress: jest.fn(),
    };

    it("renders section seasons component with valid props", () => {
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <SectionSeasons {...mockProps} />
        </ThemeProvider>
      );
      expect(getByText(/Apocalipse/i)).toBeTruthy();
      expect(getByText(/2022/i)).toBeTruthy();
      expect(getByText(mockProps.data.overview)).toBeTruthy();
      expect(getByText("1º Temporada")).toBeTruthy();
    });
    it("calls onPress function when button is pressed", () => {
      const { getByTestId } = render(
        <ThemeProvider theme={dark}>
          <SectionSeasons {...mockProps} deviceType="tablet" />
        </ThemeProvider>
      );
      fireEvent.press(getByTestId("button-seasons"));
      expect(mockProps.onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe("Function Are Props Equal React.mome", () => {
    it("returns True if previous and next props have equal props", () => {
      const prevProps: SectionSeasonsProps = {
        data: {
          id: 1,
          air_date: "2022",
          episode_count: 12,
          name: "Apocalipse",
          overview: "overview",
          season_number: 1,
        },
        deviceType: "phone",
        onPress: jest.fn(),
      };
      const nextProps: SectionSeasonsProps = {
        ...prevProps,
      };

      expect(arePropsEqualSectionSeasons(prevProps, nextProps)).toBe(true);
    });
    it("returns false if previous and next props have different Props", () => {
      const prevProps: SectionSeasonsProps = {
        data: {
          id: 1,
          air_date: "2022",
          episode_count: 12,
          name: "Apocalipse",
          overview: "overview",
          season_number: 1,
        },
        deviceType: "phone",
        onPress: jest.fn(),
      };
      const nextProps: SectionSeasonsProps = {
        ...prevProps,
        data: {
          id: 128,
          air_date: "2023",
          episode_count: 13,
          name: "Apocalipse 2",
          overview: "overview 2",
          season_number: 1,
        },
      };

      expect(arePropsEqualSectionSeasons(prevProps, nextProps)).toBe(false);
    });
  });
});
