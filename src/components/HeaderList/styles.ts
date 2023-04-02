import styled from "styled-components/native";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0px ${(props) => props.theme.space.marginHorizontal + "px"};
  margin-top: ${convertScale(25)};
  margin-bottom: ${convertScale(15)};
`;

export const Title = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 14, props.theme.size.big)};
  color: ${(props) => props.theme.colors.textSession};
`;

export const Button = styled.TouchableOpacity`
  border: ${convertScale(1)} solid
    ${(props) => props.theme.colors.textSecondary};
  padding: ${convertScale(2)} ${convertScale(10)};
  border-radius: ${convertScale(10)};
`;

export const ButtonText = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 8, props.theme.size.small)};
  color: ${(props) => props.theme.colors.textSecondary};
`;
