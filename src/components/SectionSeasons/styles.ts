import styled from "styled-components/native";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";
import { Dimensions } from "react-native";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

const { width } = Dimensions.get("screen");

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ContainerCard = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: ${convertScale(5)};
  flex-direction: row;
  width: 100%;
  min-height: ${convertScale(170)};
  margin-bottom: ${convertScale(15)};
`;

export const ImageCard = styled.Image`
  width: ${convertScale(120)};
  border-top-left-radius: ${convertScale(5)};
  border-bottom-left-radius: ${convertScale(5)};
`;

export const ContentCard = styled.View`
  padding: 20px;
  flex: 1;
  border-radius: ${convertScale(5)};
`;

export const CardTitle = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 12, 14)};
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const CardSpan = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.text};
  color: ${(props) => props.theme.colors.textPrimary};
  margin-top: ${convertScale(2)};
  margin-bottom: ${convertScale(4)};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 10, 13)};
`;

export const CardOverview = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 10, 12)};
  text-align: justify;
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  padding: ${convertScale(7)} ${convertScale(15)};
  border-radius: ${convertScale(5)};
  margin: 0 auto;
`;
export const ButtonText = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 10, 12)};
  color: ${(props) => props.theme.colors.textPrimary};
  text-align: center;
`;
