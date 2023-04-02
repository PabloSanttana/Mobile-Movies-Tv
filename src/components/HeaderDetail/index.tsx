import { DeviceTypeProps } from "@src/interfaces";
import React from "react";

import { scale } from "react-native-size-matters";
import { Container, ButtonIcon, ArrowLeft, HomeIcon } from "./styles";

type HeaderDetailProps = {
  onPressLeft: () => void;
  onPressRight: () => void;
  deviceType: DeviceTypeProps;
};

function HeaderDetail({
  onPressLeft,
  onPressRight,
  deviceType,
}: HeaderDetailProps) {
  return (
    <Container>
      <ButtonIcon deviceType={deviceType} onPress={onPressLeft}>
        <ArrowLeft
          name="arrowleft"
          size={deviceType === "tablet" ? scale(14) : scale(20)}
        />
      </ButtonIcon>
      <ButtonIcon deviceType={deviceType} onPress={onPressRight}>
        <HomeIcon
          name="home"
          size={deviceType === "tablet" ? scale(14) : scale(20)}
        />
      </ButtonIcon>
    </Container>
  );
}

export default React.memo(HeaderDetail);
