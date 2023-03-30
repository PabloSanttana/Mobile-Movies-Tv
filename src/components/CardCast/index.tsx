import React from "react";

import { crewProps } from "@src/interfaces";
import { Container, Title, Image, Text } from "./styles";
import Logo from "@src/assets/logo.png";

type CardCastProps = {
  data: crewProps;
};
function CardCast({ data }: CardCastProps) {
  const image = data.profile_path
    ? { uri: process.env.BASE_IMAGE_URL + "w300" + data.profile_path }
    : Logo;
  return (
    <Container>
      <Image source={image} resizeMode="cover" />
      <Title deviceType="phone">{data.name}</Title>
      <Text deviceType="phone">{data.job ? data.job : data.character}</Text>
    </Container>
  );
}

function arePropsEqual(prevProps: CardCastProps, nextProps: CardCastProps) {
  return prevProps.data === nextProps.data;
}

export default React.memo(CardCast, arePropsEqual);
