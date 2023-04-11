import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CardPrimaryMovie, { arePropsEqualCardPrimaryMovie } from "../index";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";
import { CardProps } from "../../../interfaces";

describe("CardPrimaryMovie", () => {
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

  it("renders correctly with the given props", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={dark}>
        <CardPrimaryMovie data={cardPropsMock} deviceType="phone" />
      </ThemeProvider>
    );

    expect(getByText(/Shazam! Fúria dos Deuses/i)).toBeTruthy();
    expect(getByText(cardPropsMock.release_date)).toBeTruthy();
    expect(getByTestId("post")).toBeTruthy();
  });

  it("renders correctly with the given props is tablet", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={dark}>
        <CardPrimaryMovie data={cardPropsMock} deviceType="tablet" doubleSize />
      </ThemeProvider>
    );
    expect(getByText(/Shazam! Fúria dos Deuses/i)).toBeTruthy();
    expect(getByText(cardPropsMock.release_date)).toBeTruthy();
    expect(getByTestId("post")).toBeTruthy();
  });

  it("should call onPress function when button is pressed", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <CardPrimaryMovie
          data={cardPropsMock}
          deviceType="tablet"
          doubleSize
          onPress={onPressMock}
        />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId("titleTouchableOpacity"));
    fireEvent.press(getByTestId("postTouchableOpacity"));
    expect(onPressMock).toBeCalledTimes(2);
  });

  it("arePropsEqual returns true for identical props and false for non-identical props", () => {
    const props1 = {
      data: cardPropsMock,
      deviceType: "phone",
      doubleSize: false,
    };
    const props2 = {
      data: cardPropsMock,
      deviceType: "phone",
      doubleSize: false,
    };
    const props3 = {
      data: { ...cardPropsMock, id: 23 },
      deviceType: "phone",
      doubleSize: true,
    };
    expect(arePropsEqualCardPrimaryMovie(props1, props2)).toBe(true);
    expect(arePropsEqualCardPrimaryMovie(props1, props3)).toBe(false);
  });
});
