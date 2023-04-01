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
};

function CardGeneric({
  data,
  deviceType,
  dictionary,
  isOverview = false,
  ...rest
}: CardGenericProps) {
  var genre: string[] = [];
  if (dictionary && !isOverview) {
    genre = data.genre_ids.map((id) => dictionary[id]);
  }

  return (
    <Container>
      <Button {...rest}>
        <Image
          defaultSource={Logo}
          deviceType={deviceType}
          resizeMode="cover"
          source={{ uri: data.poster_path }}
        />
      </Button>
      <Content>
        <Button {...rest}>
          <Title deviceType={deviceType}>{data.title}</Title>
        </Button>
        {isOverview ? (
          <>
            <SubTitle
              style={{ marginTop: -5, marginBottom: 5 }}
              deviceType={deviceType}
            >
              {data.release_date}
            </SubTitle>
            <Overview style={{}} numberOfLines={5}>
              {data.overview}
            </Overview>
          </>
        ) : (
          <>
            <StarRating value={data.vote_average} />

            <ContainerGenre>
              <Text numberOfLines={2}>{genre.join(", ")}</Text>
            </ContainerGenre>
            <Span>{data.release_date}</Span>
            <ContentLabel>
              <Label>{data.media_type}</Label>
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
    prevProps.data.id === nextProps.data.id ||
    nextProps.dictionary === prevProps.dictionary
  ) {
    return true;
  }
  return false;
}

export default React.memo(CardGeneric, arePropsEqual);
