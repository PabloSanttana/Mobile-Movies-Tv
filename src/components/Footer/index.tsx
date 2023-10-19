import React from "react";
import { Linking } from "react-native";

import ApiLogo from "@src/assets/logo.png";
import { DeviceTypeProps } from "@src/interfaces";

import { Container, Image, Text, Button, Content } from "./styles";

export type FooterProps = {
  deviceType: DeviceTypeProps;
};

function Footer({ deviceType }: FooterProps) {
  return (
    <Container testID="footer-container" deviceType={deviceType}>
      <Content>
        <Button
          testID="api-logo-button"
          onPress={() => {
            Linking.openURL("https://www.themoviedb.org/");
          }}
        >
          <Image source={ApiLogo} resizeMode="cover" />
        </Button>
        <Button
          testID="Sobre-o-TMDB"
          onPress={() => {
            Linking.openURL("https://developer.themoviedb.org/docs");
          }}
        >
          <Text>Sobre o TMDB</Text>
        </Button>
      </Content>
    </Container>
  );
}

export default React.memo(Footer);
