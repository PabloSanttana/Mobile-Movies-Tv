import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { scale } from "react-native-size-matters";
import { AntDesign, Octicons } from "@expo/vector-icons";

import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View`
  z-index: 1;
  position: absolute;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  top: ${(getStatusBarHeight() || scale(20)) + scale(15) + "px"};
  padding: 0px 20px;
`;

export const ButtonIcon = styled.TouchableOpacity<DeviceType>`
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  width: ${(props) => sizeDeviceTypeScale(props.deviceType, 30, 30)};
  height: ${(props) => sizeDeviceTypeScale(props.deviceType, 30, 30)};
  border-radius: ${convertScale(20)};
  align-items: center;
  justify-content: center;
  opacity: 0.8;
`;

export const ArrowLeft = styled(AntDesign)`
  color: ${(props) => props.theme.colors.textSession};
`;
export const HomeIcon = styled(Octicons)`
  color: ${(props) => props.theme.colors.textSession};
`;
