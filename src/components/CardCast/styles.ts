import { DeviceTypeProps } from "@src/interfaces";
import { convertScale } from "@src/utils/utils";
import styled from "styled-components/native";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View`
  margin: 10px 0px;
  margin-right: 20px;
  width: 100px;
  align-items: center;
`;
export const Image = styled.Image`
  width: 100px;
  height: 130px;
  border-radius: 5px;
`;

export const Title = styled.Text<DeviceType>`
  margin: 3px 0px;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(11) : convertScale(13)};
  color: ${(props) => props.theme.colors.textPrimary};
  text-align: center;
`;
export const Text = styled.Text<DeviceType>`
  margin: 3px 0px;
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(11) : convertScale(13)};
  color: ${(props) => props.theme.colors.textSecondary};
  text-align: center;
`;
