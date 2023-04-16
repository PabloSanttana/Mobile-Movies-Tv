import React, { useCallback } from "react";
import CardCarousel from "@src/components/CardCarousel";
//@ts-ignore
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { CardProps, DeviceTypeProps } from "@src/interfaces";
import { Title, Container } from "./styled";
import { TypeDetailProps } from "@src/services/services";

export type ListCarouselProps = {
  data: CardProps[];
  onPress?: (id: number, type: TypeDetailProps) => void;
  deviceType: DeviceTypeProps;
};

function ListCarousel({
  data,
  onPress = () => {},
  deviceType,
}: ListCarouselProps) {
  const renderItem = useCallback(
    (item: CardProps) => (
      <CardCarousel
        deviceType={deviceType}
        key={item.id}
        movie={item}
        onPress={() => onPress(item.id, item.media_type)}
        activeOpacity={0.7}
      />
    ),
    [deviceType]
  );

  return (
    <Container testID="containerCarousel">
      <Title>Nos cinemas</Title>
      <Carousel
        pagination={PaginationLight}
        renderItem={(data: CardProps) => renderItem(data)}
        data={data}
        loop
        autoplay
        autoplayInterval={3000}
      />
    </Container>
  );
}

export function arePropsEqualListCarousel(
  prevProps: ListCarouselProps,
  nextProps: ListCarouselProps
) {
  if (prevProps.data === nextProps.data) {
    return true;
  }
  return false;
}

export default React.memo(ListCarousel, arePropsEqualListCarousel);
