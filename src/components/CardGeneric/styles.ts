import { DeviceTypeProps } from "@src/interfaces";
import { sizeDeviceTypeScale } from "@src/utils/utils";
import { Platform } from "react-native";
import { scale } from "react-native-size-matters";
import styled from "styled-components/native";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View<DeviceType>`
  margin: 0px 10px;

  margin-top: 20px;
  flex-direction: row;
  border-radius: ${(props) => sizeDeviceTypeScale(props.deviceType, 3, 5)};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  flex: ${(props) => (props.deviceType === "tablet" ? 1 : 0)};
`;

export const Button = styled.TouchableOpacity``;

export const Image = styled.Image<DeviceType>`
  width: ${(props) => sizeDeviceTypeScale(props.deviceType, 60, 100)};
  height: ${(props) => sizeDeviceTypeScale(props.deviceType, 90, 140)};
  border-top-left-radius: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 3, 5)};
  border-bottom-left-radius: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 3, 5)};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${scale(8) + "px"};
  padding-top: ${scale(2) + "px"};
  padding-bottom: 0px;
  position: relative;
`;

export const Title = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 9, props.theme.size.average)};
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 5px;
`;

export const ContainerGenre = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const SubTitle = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 9, props.theme.size.small)};
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const Text = styled.Text<DeviceType>`
  color: ${(props) => props.theme.colors.textSession};
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 9, props.theme.size.small)};
`;

export const Overview = styled.Text<DeviceType>`
  color: ${(props) => props.theme.colors.textPrimary};
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 9, props.theme.size.small)};
`;

export const Span = styled.Text<DeviceType>`
  color: ${(props) => props.theme.colors.textSecondary};
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 7, props.theme.size.small)};
  position: absolute;
  bottom: 5px;
  left: ${scale(8) + "px"};
`;

export const ContentLabel = styled.View<DeviceType>`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-top-left-radius: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 3, 5)};
  border-bottom-right-radius: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 3, 5)};
  padding: ${scale(2) + "px"} ${scale(5) + "px"};
  background-color: ${(props) => props.theme.colors.backgroundCategory};
`;

export const Label = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 7, props.theme.size.small)};
  color: ${(props) => props.theme.colors.textCategory};
`;
