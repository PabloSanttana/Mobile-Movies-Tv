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
} from "./styles";
import { ObjectGenresProps } from "@src/screens/SeeMore";
import Logo from "@src/assets/logo.png";

type CardGenericProps = TouchableOpacityProps & {
  data: CardProps;
  deviceType: DeviceTypeProps;
  dictionary: ObjectGenresProps;
};

function CardGeneric({
  data,
  deviceType,
  dictionary,
  ...rest
}: CardGenericProps) {
  var genre = data.genre_ids.map(
    (id, index) => (index == 0 ? "" : ", ") + dictionary[id]
  );

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

        <StarRating value={data.vote_average} />
        <SubTitle deviceType={deviceType}>Gênero</SubTitle>
        <ContainerGenre>
          <Text numberOfLines={2}>{genre}</Text>
        </ContainerGenre>
        <Span>{data.release_date}</Span>
        <ContentLabel>
          <Label>{data.media_type}</Label>
        </ContentLabel>
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
