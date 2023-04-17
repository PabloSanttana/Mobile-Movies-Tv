import React from "react";

import { DeviceTypeProps, SeasonsProps } from "@src/interfaces";
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
  Container,
} from "./styles";
import { imagePathIsValid } from "@src/utils/utils";

export type SectionSeasonsProps = {
  data: SeasonsProps;
  onPress: () => void;
  deviceType: DeviceTypeProps;
};

function SectionSeasons({ data, onPress, deviceType }: SectionSeasonsProps) {
  const image = imagePathIsValid(
    process.env.BASE_IMAGE_URL + "w300" + data.poster_path
  );
  return (
    <>
      <HeaderList
        deviceType={deviceType}
        title="1º Temporada"
        isMore={false}
        onPress={() => {}}
      />
      <Container>
        <ContainerCard>
          <ImageCard source={image} resizeMode="contain" />
          <ContentCard>
            <CardTitle deviceType={deviceType}>
              {data.name} {data.air_date}
            </CardTitle>
            <CardSpan deviceType={deviceType}>
              {data.episode_count} episódios
            </CardSpan>
            <CardOverview deviceType={deviceType}>{data.overview}</CardOverview>
          </ContentCard>
        </ContainerCard>
        <Button
          testID="button-seasons"
          activeOpacity={0.7}
          onPress={() => onPress()}
        >
          <ButtonText deviceType={deviceType}>
            Mostrar todas as temporadas
          </ButtonText>
        </Button>
      </Container>
    </>
  );
}

export function arePropsEqualSectionSeasons(
  prevProps: SectionSeasonsProps,
  nextProps: SectionSeasonsProps
) {
  return prevProps.data === nextProps.data;
}

export default React.memo(SectionSeasons, arePropsEqualSectionSeasons);
