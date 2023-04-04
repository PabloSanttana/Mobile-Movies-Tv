import React from "react";

import { CrewProps, DeviceTypeProps } from "@src/interfaces";
import { Container, Title, Image, Text } from "./styles";
import { imagePathIsValid } from "@src/utils/utils";

type CardCastProps = {
  data: CrewProps;
  deviceType: DeviceTypeProps;
};
function CardCast({ data, deviceType }: CardCastProps) {
  const postImage = imagePathIsValid(
    process.env.BASE_IMAGE_URL + "w300" + data.profile_path
  );

  return (
    <Container deviceType={deviceType}>
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
