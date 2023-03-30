import React from "react";

import { SeasonsProps } from "@src/interfaces";
import HeaderList from "@src/components/HeaderList";

import {
  CardOverview,
  CardSpan,
  CardTitle,
  ContainerCard,
  ContentCard,
  ImageCard,
  Button,
  ButtonText,
} from "./styles";

type SectionSeasonsProps = {
  data: SeasonsProps;
};

function SectionSeasons({ data }: SectionSeasonsProps) {
  return (
    <>
      <HeaderList title="Temporada atual" isMore={false} onPress={() => {}} />
      <ContainerCard>
        <ImageCard
          source={{
            uri: process.env.BASE_IMAGE_URL + "w300" + data.poster_path,
          }}
        />
        <ContentCard>
          <CardTitle>
            {data.name} ({data.air_date})
          </CardTitle>
          <CardSpan>{data.episode_count} episódios</CardSpan>
          <CardOverview>{data.overview}</CardOverview>
        </ContentCard>
      </ContainerCard>
      <Button activeOpacity={0.7}>
        <ButtonText>Mostrar todas as temporadas</ButtonText>
      </Button>
    </>
  );
}

function arePropsEqual(
  prevProps: SectionSeasonsProps,
  nextProps: SectionSeasonsProps
) {
  return prevProps.data === nextProps.data;
}

export default React.memo(SectionSeasons, arePropsEqual);
