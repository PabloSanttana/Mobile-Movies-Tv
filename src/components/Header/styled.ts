import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { sizeDeviceTypeScale } from "@src/utils/utils";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { scale } from "react-native-size-matters";
import { DeviceTypeProps } from "@src/interfaces";

type ContentProps = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View<ContentProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  padding-top: ${(getStatusBarHeight() || scale(20)) + scale(5) + "px"};
  height: ${(props) => sizeDeviceTypeScale(props.deviceType, 50, 80)};
  z-index: 1;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
`;

export const Button = styled.TouchableOpacity`
  width: ${scale(30) + "px"};
  height: ${scale(30) + "px"};
  justify-content: center;
`;

export const Title = styled.Text<ContentProps>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 13, props.theme.size.big)};
  color: ${(props) => props.theme.colors.textSession};
`;

export const Icon = styled(AntDesign)`
  color: ${(props) => props.theme.colors.textSession};
`;
