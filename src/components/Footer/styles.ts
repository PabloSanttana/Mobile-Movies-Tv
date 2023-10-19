import styled from "styled-components/native";
import { sizeDeviceTypeScale } from "@src/utils/utils";

import { scale } from "react-native-size-matters";
import { DeviceTypeProps } from "@src/interfaces";

type ContainerProps = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View<ContainerProps>`
  background-color: #032541;
  height: ${(props) => sizeDeviceTypeScale(props.deviceType, 100, 120)};
  margin-top: ${scale(50) + "px"};
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Button = styled.TouchableOpacity``;

export const Text = styled.Text`
  color: #fff;
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${scale(14) + "px"};
`;

export const Image = styled.Image`
  width: ${scale(200) + "px"};
  height: ${scale(80) + "px"};
`;
