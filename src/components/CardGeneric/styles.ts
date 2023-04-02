import { DeviceTypeProps } from "@src/interfaces";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
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
  padding: 20px;
  padding-top: 5px;
  padding-bottom: 0px;
  position: relative;
`;

export const Title = styled.Text<DeviceType>`
  margin-bottom: 7px;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 9, props.theme.size.average)};
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const ContainerGenre = styled.View`
  flex-direction: row;
  margin-top: 5px;
  flex-wrap: wrap;
  width: 100%;
`;

export const SubTitle = styled.Text<DeviceType>`
  margin-top: 7px;
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
  bottom: 10px;
  left: 20px;
`;

export const ContentLabel = styled.View<DeviceType>`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-top-left-radius: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 3, 5)};
  border-bottom-right-radius: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 3, 5)};
  padding: 4px 10px;
  background-color: ${(props) => props.theme.colors.backgroundCategory};
`;

export const Label = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 8, props.theme.size.small)};
  color: ${(props) => props.theme.colors.textCategory};
`;
