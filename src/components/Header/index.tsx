import React from "react";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

import { Container, Button, Title, Icon } from "./styled";
import { DeviceTypeProps } from "@src/interfaces";

type HeaderProps = {
  title: string;
  iconRight?: () => JSX.Element;
  onPressRight?: () => void;
  removedBackground?: boolean;
  deviceType: DeviceTypeProps;
};

function Header({
  title,
  iconRight,
  onPressRight,
  deviceType,
  removedBackground = false,
}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <Container
      deviceType={deviceType}
      style={[removedBackground && { backgroundColor: "transparent" }]}
    >
      <Button onPress={() => navigation.goBack()} activeOpacity={0.7}>
        <Icon
          name="arrowleft"
          size={deviceType === "tablet" ? scale(16) : scale(24)}
        />
      </Button>
      <Title deviceType={deviceType}>{title}</Title>
      <Button activeOpacity={0.7} onPress={onPressRight}>
        {iconRight ? (
          iconRight()
        ) : (
          <Icon
            name="arrowleft"
            size={deviceType === "tablet" ? scale(16) : scale(24)}
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
