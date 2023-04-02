import styled from "styled-components/native";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View``;
export const Title = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 14, 16)};
  color: ${(props) => props.theme.colors.textSession};
  line-height: ${convertScale(22)};
  margin: ${convertScale(10)} 20px;
`;
