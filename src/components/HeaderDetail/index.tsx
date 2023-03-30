import React from "react";

import { scale } from "react-native-size-matters";
import { Container, ButtonIcon, ArrowLeft, HomeIcon } from "./styles";

type HeaderDetailProps = {
  onPressLeft: () => void;
  onPressRight: () => void;
};

function HeaderDetail({ onPressLeft, onPressRight }: HeaderDetailProps) {
  return (
    <Container>
      <ButtonIcon onPress={onPressLeft}>
        <ArrowLeft name="arrowleft" size={scale(20)} />
      </ButtonIcon>
      <ButtonIcon onPress={onPressRight}>
        <HomeIcon name="home" size={scale(20)} />
      </ButtonIcon>
    </Container>
  );
}

export default React.memo(HeaderDetail);
