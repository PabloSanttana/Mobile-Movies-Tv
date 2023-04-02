import { DeviceTypeProps } from "@src/interfaces";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import styled from "styled-components/native";

type ContentProps = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View`
  padding-bottom: ${convertScale(10)};
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  width: 100%;
`;

export const Title = styled.Text<ContentProps>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    sizeDeviceTypeScale(props.deviceType, 13, props.theme.size.big)};
  color: ${(props) => props.theme.colors.textSession};
  margin: 0px 0px 20px 20px;
`;
