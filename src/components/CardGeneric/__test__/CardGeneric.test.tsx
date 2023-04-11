import React from "react";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";
import CardGeneric, { arePropsEqualCardGeneric } from "../index";
import { CardProps } from "../../../interfaces";

describe("CardGeneric", () => {
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
  const dictionaryMock = {
    "28": "Ação",
    "35": "Comédia",
    "14": "Fantasia",
  };

  const dataPropsMock = {
    data: cardPropsMock,
    deviceType: "mobile",
    dictionary: dictionaryMock,
    isOverview: false,
  };

  it("renders correctly with the given props", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={dark}>
        <CardGeneric
          data={dataPropsMock.data}
          deviceType={dataPropsMock.deviceType}
          dictionary={dataPropsMock.dictionary}
        />
      </ThemeProvider>
    );
    expect(getByTestId("poster")).toBeTruthy();
    expect(getByText(cardPropsMock.title)).toBeTruthy();
    expect(getByText("Gênero:")).toBeTruthy();
    expect(getByText("Ação, Comédia, Fantasia")).toBeTruthy();
    expect(getByText(cardPropsMock.release_date)).toBeTruthy();
    expect(getByText(cardPropsMock.media_type)).toBeTruthy();
  });

  it("renders correctly when isOverview is true", () => {
    const { getByText, getByTestId, queryByText } = render(
      <ThemeProvider theme={dark}>
        <CardGeneric
          data={dataPropsMock.data}
          deviceType={dataPropsMock.deviceType}
          isOverview={true}
          dictionary={dataPropsMock.dictionary}
        />
      </ThemeProvider>
    );
    expect(getByTestId("poster")).toBeTruthy();
    expect(getByText(cardPropsMock.title)).toBeTruthy();
    expect(getByText(cardPropsMock.release_date)).toBeTruthy();
    expect(getByText(cardPropsMock.overview)).toBeTruthy();
    expect(getByText("Resumo:")).toBeTruthy();
    expect(queryByText(cardPropsMock.media_type)).toBeNull();
    expect(queryByText("Ação, Comédia, Fantasia")).toBeNull();
    expect(queryByText("Gênero:")).toBeNull();
  });

  it("arePropsEqual returns true for identical props and false for non-identical props", () => {
    const props1 = {
      data: dataPropsMock.data,
      deviceType: dataPropsMock.deviceType,
      dictionary: dataPropsMock.dictionary,
    };
    const props2 = {
      data: dataPropsMock.data,
      deviceType: dataPropsMock.deviceType,
      dictionary: dataPropsMock.dictionary,
    };
    const props3 = {
      data: dataPropsMock.data,
      deviceType: "tablet",
      dictionary: dataPropsMock.dictionary,
    };
    expect(arePropsEqualCardGeneric(props1, props2)).toBe(true);
    expect(arePropsEqualCardGeneric(props1, props3)).toBe(false);
  });
});
