import React from "react";

import { Container, IconFontAwesome, Text } from "./styles";

import { scale } from "react-native-size-matters";

type StarNameProps = "star-o" | "star" | "star-half-o";

type StarRatingProps = {
  value: number;
  sizeStar?: number;
  sizeText?: number;
};
type ListProps = {
  id: number;
  name: StarNameProps;
};

function StarRating({ value, sizeText = 15, sizeStar = 15 }: StarRatingProps) {
  const list: ListProps[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: i < Math.floor(Math.round(value) / 2) ? "star" : "star-o",
  }));

  if (Math.round(value) % 2 !== 0 && Math.floor(Math.round(value) / 2) < 5) {
    list[Math.floor(Math.round(value) / 2)].name = "star-half-o";
  }

  return (
    <Container>
      {list.map((item) => (
        <IconFontAwesome
          key={item.id}
          name={item.name}
          size={scale(sizeStar)}
        />
      ))}
      <Text size={sizeText}>{value.toFixed(1)}</Text>
    </Container>
  );
}

function arePropsEqual(prevProps: StarRatingProps, nextProps: StarRatingProps) {
  if (prevProps.value === nextProps.value) {
    return true;
  }
  return false;
}

export default React.memo(StarRating, arePropsEqual);
