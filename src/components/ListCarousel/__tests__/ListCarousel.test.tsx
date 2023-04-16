import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";
import moviesMocks from "../../ListCardHorizontal/__tests__/mocks";

import ListCarousel, {
  arePropsEqualListCarousel,
  ListCarouselProps,
} from "../index";

describe("ListCarousel", () => {
  describe("Component", () => {
    const mockProps: ListCarouselProps = {
      data: moviesMocks,
      deviceType: "phone",
    };
    it("renders correctly with required props", () => {
      const { getByTestId, getByText } = render(
        <ThemeProvider theme={dark}>
          <ListCarousel {...mockProps} />
        </ThemeProvider>
      );

      const carousel = getByTestId("containerCarousel").children[1];
      expect(getByText(/nos cinemas/i));
      //@ts-ignore
      expect(carousel.props.data.length).toEqual(5);
    });
    it("onPress card Item", async () => {
      const mockProps2 = {
        ...mockProps,
        onPress: jest.fn(),
      };
      const { getAllByText } = await waitFor(() => {
        return render(
          <ThemeProvider theme={dark}>
            <ListCarousel {...mockProps2} />
          </ThemeProvider>
        );
      });
      const title = getAllByText(moviesMocks[0].title);
      fireEvent.press(title[title.length - 1]);

      expect(mockProps2.onPress).toBeCalledWith(
        moviesMocks[0].id,
        moviesMocks[0].media_type
      );
    });
  });

  describe("Function Are Props Equal React.mome", () => {
    it("returns false if previous and next props have different Props", () => {
      const prevProps: ListCarouselProps = {
        data: moviesMocks,
        deviceType: "phone",
      };
      const nextProps: ListCarouselProps = {
        ...prevProps,
      };

      expect(arePropsEqualListCarousel(prevProps, nextProps)).toBe(true);
    });
    it("returns false if previous and next props have different Props", () => {
      const prevProps: ListCarouselProps = {
        data: moviesMocks,
        deviceType: "phone",
      };
      const nextProps: ListCarouselProps = {
        data: moviesMocks.slice(0, 2),
        deviceType: "phone",
      };

      expect(arePropsEqualListCarousel(prevProps, nextProps)).toBe(false);
    });
  });
});
