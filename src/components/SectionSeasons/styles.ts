import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";
import { Dimensions } from "react-native";

type DeviceType = {
  deviceType?: DeviceTypeProps;
};

const { width } = Dimensions.get("screen");

export const ContainerCard = styled.View`
  flex: 1;
  background-color: red;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  margin: 20px;
  border-radius: ${convertScale(5)};
  flex-direction: row;
  width: ${width - 40 + "px"};
  min-height: ${convertScale(170)};
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
  font-size: ${(props) =>
    props.deviceType === "tablet"
      ? convertScale(11)
      : convertScale(props.theme.size.average)};
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const CardSpan = styled.Text`
  font-family: ${(props) => props.theme.fonts.text};
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 10px;
`;

export const CardOverview = styled.Text`
  font-family: ${(props) => props.theme.fonts.subtitle};
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: ${convertScale(12)};
`;

export const Button = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  padding: 10px 20px;
  width: ${convertScale(250)};
  border-radius: ${convertScale(5)};
  margin: 0 auto;
`;
export const ButtonText = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    props.deviceType === "tablet"
      ? convertScale(11)
      : convertScale(props.theme.size.average)};
  color: ${(props) => props.theme.colors.textPrimary};
  text-align: center;
`;
