import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { sizeDeviceTypeScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";

const { width } = Dimensions.get("window");

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
`;

export const CardWrapper = styled.TouchableOpacity`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  flex: 1;
`;
export const Card = styled.Image`
  width: ${width - 40 + "px"};
  height: ${width * 0.5 + "px"};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
`;

export const ContentLabel = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-top-left-radius: 8px;
  padding: 10px;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
`;

export const Label = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 9, 12)};
  color: ${(props) => props.theme.colors.textSession};
`;
