import React from "react";

import { CrewProps, DeviceTypeProps } from "@src/interfaces";
import { Container, Title, Image, Text } from "./styles";
import { imagePathIsValid } from "@src/utils/utils";

type CardCastProps = {
  data: CrewProps;
  deviceType: DeviceTypeProps;
  onPress: (id: number) => void;
};
function CardCast({ data, deviceType, onPress }: CardCastProps) {
  const postImage = imagePathIsValid(
    process.env.BASE_IMAGE_URL + "w300" + data.profile_path
  );

  return (
    <Container
      activeOpacity={0.7}
      deviceType={deviceType}
      onPress={() => onPress(data.id)}
    >
      <Image deviceType={deviceType} source={postImage} resizeMode="cover" />
      <Title deviceType={deviceType}>{data.name}</Title>
      <Text deviceType={deviceType}>
        {data.job ? data.job : data.character}
      </Text>
    </Container>
  );
}

function arePropsEqual(prevProps: CardCastProps, nextProps: CardCastProps) {
  return prevProps.data === nextProps.data;
}

export default React.memo(CardCast, arePropsEqual);
