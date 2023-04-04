import { TouchableOpacityProps } from "react-native";
import React from "react";

import {
  Container,
  Image,
  Text,
  Title,
  ContainerImage,
  ContainerButton,
  ContainerVoteAverage,
} from "./styles";
import { CardProps, DeviceTypeProps } from "@src/interfaces";

import VoteAverage from "@src/components/VoteAverage";
import { imagePathIsValid, progressColor } from "@src/utils/utils";

export type CardPrimaryMovieProps = TouchableOpacityProps & {
  data: CardProps;
  deviceType: DeviceTypeProps;
  doubleSize?: boolean;
};

function CardPrimaryMovie({
  data,
  deviceType,
  doubleSize = false,
  ...rest
}: CardPrimaryMovieProps) {
  // const cores =
  //   "#" +
  //   Math.floor(Math.random() * 0x1000000)
  //     .toString(16)
  //     .padStart(6, "0");

  const postImage = doubleSize
    ? imagePathIsValid(data.backdrop_path)
    : imagePathIsValid(data.poster_path);

  return (
    <Container deviceType={deviceType} doubleSize={doubleSize}>
      <ContainerImage>
        <ContainerButton activeOpacity={0.7} {...rest}>
          <Image
            accessibilityLabel={data.title}
            deviceType={deviceType}
            source={postImage}
            resizeMode="cover"
            //onLoad={() => console.log(data.title)}
            alt={data.title}
            doubleSize={doubleSize}
          />
        </ContainerButton>
        <ContainerVoteAverage deviceType={deviceType} doubleSize={doubleSize}>
          <VoteAverage
            backgroundColor={"#081c22"}
            progressValue={data.vote_average}
            titleColor="white"
            progressValueColor={progressColor(data.vote_average)}
          />
        </ContainerVoteAverage>
      </ContainerImage>
      <ContainerButton activeOpacity={0.7} {...rest}>
        <Title deviceType={deviceType} doubleSize={doubleSize}>
          {data.title}
        </Title>
      </ContainerButton>

      <Text deviceType={deviceType} doubleSize={doubleSize}>
        {data.release_date}
      </Text>
    </Container>
  );
}

function arePropsEqual(
  prevProps: CardPrimaryMovieProps,
  nextProps: CardPrimaryMovieProps
) {
  if (prevProps.data.id === nextProps.data.id) {
    return true;
  }
  return false;
}

export default React.memo(CardPrimaryMovie, arePropsEqual);
