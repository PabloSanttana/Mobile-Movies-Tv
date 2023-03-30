import React from "react";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import { Container, Button, Title, Icon } from "./styled";

type HeaderProps = {
  title: string;
  iconRight?: () => JSX.Element;
  onPressRight?: () => void;
  removedBackground?: boolean;
};

function Header({
  title,
  iconRight,
  onPressRight,
  removedBackground = false,
}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <Container
      style={[removedBackground && { backgroundColor: "transparent" }]}
    >
      <Button onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Icon name="arrowleft" size={scale(24)} />
      </Button>
      <Title>{title}</Title>
      <Button activeOpacity={0.7} onPress={onPressRight}>
        {iconRight ? (
          iconRight()
        ) : (
          <Icon
            name="arrowleft"
            size={scale(24)}
            style={{ color: "transparent" }}
          />
        )}
      </Button>
    </Container>
  );
}

function arePropsEqual(prevProps: HeaderProps, NextProps: HeaderProps) {
  if (prevProps.title === NextProps.title) {
    return true;
  } else {
    return false;
  }
}

export default React.memo(Header, arePropsEqual);
