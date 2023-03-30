import { TouchableOpacityProps } from "react-native";
import React from "react";

import {
  Container,
  Image,
  ContainerVote,
  Text,
  Title,
  ContainerImage,
  ContainerButton,
  ContainerVoteAverage,
} from "./styles";
import { CardProps, DeviceTypeProps } from "@src/interfaces";

import VoteAverage from "@src/components/VoteAverage";
import { progressColor } from "@src/utils/utils";
import Logo from "@src/assets/logo.png";

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

  return (
    <Container deviceType={deviceType} doubleSize={doubleSize}>
      <ContainerImage>
        <ContainerButton activeOpacity={0.7} {...rest}>
          <Image
            defaultSource={Logo}
            accessibilityLabel={data.title}
            deviceType={deviceType}
            source={{
              uri: doubleSize ? data.backdrop_path : data.poster_path,
              cache: "force-cache",
            }}
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
