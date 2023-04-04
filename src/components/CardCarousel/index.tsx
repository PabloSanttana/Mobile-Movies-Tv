import React from "react";
import { TouchableOpacityProps } from "react-native";
import { CardProps, DeviceTypeProps } from "@src/interfaces";
import { Container, Card, CardWrapper, ContentLabel, Label } from "./styles";

import { imagePathIsValid } from "@src/utils/utils";

type CardCarouselProps = TouchableOpacityProps & {
  movie: CardProps;
  deviceType: DeviceTypeProps;
};

function CardCarousel({ movie, deviceType, ...rest }: CardCarouselProps) {
  const IMAGE_PATH_OR_DEFAULT = imagePathIsValid(movie.backdrop_path);

  return (
    <Container key={movie.id}>
      <CardWrapper {...rest}>
        <Card source={IMAGE_PATH_OR_DEFAULT} resizeMode="cover" />
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
