import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View``;
export const Title = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(9) : convertScale(16)};
  color: ${(props) => props.theme.colors.textSession};
  line-height: 22px;
  margin: 10px 20px;
`;
