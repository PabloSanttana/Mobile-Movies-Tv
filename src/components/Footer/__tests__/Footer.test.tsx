import React from "react";
import { Linking } from "react-native";
import { fireEvent, render } from "@testing-library/react-native";
import { dark } from "../../../theme/dark";

import Footer, { FooterProps } from "../index";
import { ThemeProvider } from "styled-components/native";

const mockProps: FooterProps = {
  deviceType: "phone",
};

jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: jest.fn().mockResolvedValue(null),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

describe("Footer Component", () => {
  it("should render the component", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <Footer {...mockProps} />
      </ThemeProvider>
    );
    expect(getByTestId("footer-container")).toBeTruthy();
  });
  it("should open the correct URL when clicking the API Logo", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <Footer {...mockProps} />
      </ThemeProvider>
    );
    const apiLogoButton = getByTestId("api-logo-button");

    fireEvent.press(apiLogoButton);

    expect(Linking.openURL).toHaveBeenCalledWith("https://www.themoviedb.org/");
  });
  it('should open the correct URL when clicking "Sobre o TMDB"', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <Footer {...mockProps} />
      </ThemeProvider>
    );
    const aboutTmdbButton = getByTestId("Sobre-o-TMDB");

    fireEvent.press(aboutTmdbButton);

    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://developer.themoviedb.org/docs"
    );
  });
});
