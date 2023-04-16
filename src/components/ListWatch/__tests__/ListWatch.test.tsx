import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";

import ListWatch, { ListWatchProps, arePropsEqualListWatch } from "../index";
import dataMock from "./dataMocks";

describe("ListCategory", () => {
  describe("Component", () => {
    const mockProps: ListWatchProps = {
      data: dataMock,
      title: "Produção",
      deviceType: "phone",
    };
    it("renders correctly with required props", () => {
      const { getByText } = render(
        <ThemeProvider theme={dark}>
          <ListWatch {...mockProps} />
        </ThemeProvider>
      );
      expect(getByText(/Produção/i)).toBeTruthy();
    });
  });

  describe("Function Are Props Equal React.mome", () => {
    it("returns True if previous and next props have equal props", () => {
      const prevProps: ListWatchProps = {
        data: dataMock,
        title: "Produção",
        deviceType: "phone",
      };
      const nextProps: ListWatchProps = {
        data: dataMock,
        title: "Produção",
        deviceType: "phone",
      };

      expect(arePropsEqualListWatch(prevProps, nextProps)).toBe(true);
    });
    it("returns false if previous and next props have different Props", () => {
      const prevProps: ListWatchProps = {
        data: dataMock,
        title: "Produção",
        deviceType: "phone",
      };
      const nextProps: ListWatchProps = {
        ...prevProps,
        data: dataMock.slice(0, 2),
      };

      expect(arePropsEqualListWatch(prevProps, nextProps)).toBe(false);
    });
  });
});
