import React from "react";
import { TouchableOpacityProps } from "react-native";
import StarRating from "@src/components/StarRating";
import { CardProps, DeviceTypeProps } from "@src/interfaces";

import {
  Container,
  Content,
  Button,
  Image,
  Title,
  Text,
  ContainerGenre,
  SubTitle,
  Span,
  ContentLabel,
  Label,
  Overview,
} from "./styles";
import { ObjectGenresProps } from "@src/screens/SeeMore";
import Logo from "@src/assets/logo.png";

type CardGenericProps = TouchableOpacityProps & {
  data: CardProps;
  deviceType: DeviceTypeProps;
  dictionary?: ObjectGenresProps;
  isOverview?: boolean;
  sizeStar?: number;
  sizeText?: number;
};

function CardGeneric({
  data,
  deviceType,
  dictionary,
  isOverview = false,
  sizeStar = 15,
  sizeText = 15,
  ...rest
}: CardGenericProps) {
  var genre: string[] = [];
  if (dictionary && !isOverview) {
    genre = data.genre_ids.map((id) => dictionary[id]);
  }

  return (
    <Container deviceType={deviceType}>
      <Button activeOpacity={0.7} {...rest}>
        <Image
          defaultSource={Logo}
          deviceType={deviceType}
          resizeMode="cover"
          source={{ uri: data.poster_path }}
        />
      </Button>
      <Content>
        <Button activeOpacity={0.7} {...rest}>
          <Title numberOfLines={2} deviceType={deviceType}>
            {data.title}
          </Title>
        </Button>
        {isOverview ? (
          <>
            <SubTitle
              style={{ marginTop: -5, marginBottom: 5 }}
              deviceType={deviceType}
            >
              {data.release_date}
            </SubTitle>
            <Text deviceType={deviceType} numberOfLines={1}>
              Resumo:
            </Text>
            <Overview deviceType={deviceType} numberOfLines={4}>
              {data.overview}
            </Overview>
          </>
        ) : (
          <>
            <StarRating
              sizeStar={sizeStar}
              sizeText={sizeText}
              value={data.vote_average}
            />
            <SubTitle deviceType={deviceType}>Gênero:</SubTitle>
            <ContainerGenre>
              <Text deviceType={deviceType} numberOfLines={2}>
                {genre.join(", ")}
              </Text>
            </ContainerGenre>
            <Span deviceType={deviceType}>{data.release_date}</Span>
            <ContentLabel deviceType={deviceType}>
              <Label deviceType={deviceType}>{data.media_type}</Label>
            </ContentLabel>
          </>
        )}
      </Content>
    </Container>
  );
}

function arePropsEqual(
  prevProps: CardGenericProps,
  nextProps: CardGenericProps
) {
  if (
    prevProps.data.id === nextProps.data.id &&
    nextProps.dictionary === prevProps.dictionary &&
    nextProps.deviceType === prevProps.deviceType
  ) {
    return true;
  }
  return false;
}

export default React.memo(CardGeneric, arePropsEqual);
