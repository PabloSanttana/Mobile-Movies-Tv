import { DeviceTypeProps } from "@src/interfaces";
import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";
import { Dimensions } from "react-native";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

const { width, height } = Dimensions.get("screen");

function hexToRgba(hex: string, alpha: number): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result === null) {
    return null;
  }
  const [_, r, g, b] = result;
  return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(
    b,
    16
  )}, ${alpha})`;
}

export const Container = styled.ImageBackground`
  flex: 1;
  width: ${width + "px"};
  align-items: center;
  padding-top: ${height * 0.3 + "px"};
`;
export const Content = styled.View`
  background-color: ${(props) =>
    hexToRgba(props.theme.colors.backgroundPrimary, 0.8)};
  padding: ${convertScale(25)};
  padding-top: ${convertScale(15)};
  border-top-left-radius: ${convertScale(40)};
  border-top-right-radius: ${convertScale(40)};
  width: ${width + 1 + "px"};
  flex: 1;
`;

export const Title = styled.Text<DeviceType>`
  margin-bottom: 15px;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(11) : convertScale(25)};
  color: ${(props) => props.theme.colors.textSession};
  text-align: center;
`;

export const Text = styled.Text<DeviceType>`
  margin-bottom: 5px;
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(11) : convertScale(15)};
  color: ${(props) => props.theme.colors.textPrimary};
  text-align: justify;
`;

export const InputText = styled.TextInput<DeviceType>`
  background-color: ${(props) => props.theme.colors.backgroundCategory};
  height: ${convertScale(35)};
  padding-left: 10px;
  border-radius: ${convertScale(5)};
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(11) : convertScale(15)};
`;

export const Div = styled.View`
  flex: 1;
  margin: 0px 10px;
`;

export const Group = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  border-radius: ${convertScale(5)};
  padding: 10px 0px;
  padding-bottom: 15px;
  margin-bottom: 20px;
`;

export const ButtonAccess = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.backgroundCategory};
  border-radius: ${convertScale(5)};
  padding: ${convertScale(10)} ${convertScale(10)};
  width: 100%;
  margin: 0 auto;
`;

export const ButtonTitle = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(11) : convertScale(15)};
  color: ${(props) => props.theme.colors.textCategory};
  text-align: center;
`;
