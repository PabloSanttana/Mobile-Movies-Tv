import React from "react";
import { TouchableOpacityProps } from "react-native";
import { CardProps, DeviceTypeProps } from "@src/interfaces";
import { Container, Card, CardWrapper, ContentLabel, Label } from "./styles";
import { Logo } from "@src/assets/logo.png";

type CardCarouselProps = TouchableOpacityProps & {
  movie: CardProps;
  deviceType: DeviceTypeProps;
};

function CardCarousel({ movie, deviceType, ...rest }: CardCarouselProps) {
  return (
    <Container key={movie.id}>
      <CardWrapper {...rest}>
        <Card
          defaultSource={Logo}
          source={{
            uri: movie.backdrop_path,
          }}
          resizeMode="cover"
        />
        <ContentLabel>
          <Label numberOfLines={1} deviceType={deviceType}>
            {movie.title}
          </Label>
        </ContentLabel>
      </CardWrapper>
    </Container>
  );
}
function arePropsEqual(
  prevProps: CardCarouselProps,
  nextProps: CardCarouselProps
) {
  if (prevProps.movie.id === nextProps.movie.id) {
    return true;
  }
  return false;
}

export default React.memo(CardCarousel, arePropsEqual);
