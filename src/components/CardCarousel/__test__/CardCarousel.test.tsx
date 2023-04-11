import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";

import CardCarousel, {
  CardCarouselProps,
  arePropsEqualCardCarousel,
} from "../index";
import { dark } from "../../../theme/dark";
import { CardProps } from "../../../interfaces";

describe("CardCarousel", () => {
  const testImageMock =
    "https://callstack.github.io/react-native-testing-library/img/owl.png";

  const cardPropsMock: CardProps = {
    adult: false,
    backdrop_path: testImageMock,
    genre_ids: [28, 35, 14],
    id: 594767,
    original_language: "en",
    original_title: 'Shazam! Fury of the Gods"',
    overview:
      "Continua a história do adolescente Billy Batson que, ao recitar a palavra mágica “SHAZAM!”, é transformado em seu alto ego adulto de super-herói, Shazam.",
    popularity: 2973.159,
    poster_path: testImageMock,
    release_date: "2023-03-15",
    title: "Shazam! Fúria dos Deuses",
    video: false,
    vote_average: 6.954,
    vote_count: 636,
    media_type: "movie",
    origin_country: [""],
    backdrop_path_small: testImageMock,
    poster_path_small: testImageMock,
  };
  const defaultPropsMock: CardCarouselProps = {
    movie: cardPropsMock,
    deviceType: "phone",
  };
  it("should render correctly", () => {
    const { getByTestId, getByText, debug } = render(
      <ThemeProvider theme={dark}>
        <CardCarousel {...defaultPropsMock} />
      </ThemeProvider>
    );
    expect(getByTestId("post")).toBeTruthy();
    expect(getByText(cardPropsMock.title)).toBeTruthy();
  });

  it("should call onPress function when button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <CardCarousel {...defaultPropsMock} onPress={onPressMock} />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId("ContainerPost"));
    expect(onPressMock).toBeCalledTimes(1);
  });

  it("arePropsEqual returns true for identical props and false for non-identical props", () => {
    const props1: CardCarouselProps = {
      ...defaultPropsMock,
    };
    const props2: CardCarouselProps = {
      ...defaultPropsMock,
    };
    const props3: CardCarouselProps = {
      deviceType: "phone",
      movie: {
        ...cardPropsMock,
        id: 1243,
      },
    };
    expect(arePropsEqualCardCarousel(props1, props2)).toBe(true);
    expect(arePropsEqualCardCarousel(props1, props3)).toBe(false);
  });
});
