import { DeviceTypeProps } from "@src/interfaces";
import { convertScale } from "@src/utils/utils";
import styled from "styled-components/native";
import { Pressable } from "react-native";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Container = styled.View`
  margin: 0px 20px;
  margin-top: 20px;
  flex-direction: row;
  border-radius: ${convertScale(5)};
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
`;

export const Button = styled.TouchableOpacity``;
export const Image = styled.Image<DeviceType>`
  width: ${(props) =>
    props.deviceType === "tablet" ? convertScale(100) : convertScale(100)};
  height: ${(props) =>
    props.deviceType === "tablet" ? convertScale(150) : convertScale(140)};
  border-top-left-radius: ${convertScale(5)};
  border-bottom-left-radius: ${convertScale(5)};
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
    props.deviceType === "tablet"
      ? convertScale(11)
      : convertScale(props.theme.size.average)};
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
    props.deviceType === "tablet"
      ? convertScale(11)
      : convertScale(props.theme.size.small)};
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const Text = styled.Text`
  color: ${(props) => props.theme.colors.textSession};
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) => convertScale(props.theme.size.small)};
`;

export const Span = styled.Text`
  color: ${(props) => props.theme.colors.textSecondary};
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) => convertScale(props.theme.size.small)};
  position: absolute;
  bottom: 10px;
  left: 20px;
`;

export const ContentLabel = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-top-left-radius: ${convertScale(5)};
  border-bottom-right-radius: ${convertScale(5)};
  padding: 4px 10px;
  background-color: ${(props) => props.theme.colors.backgroundCategory};
`;

export const Label = styled.Text`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => convertScale(props.theme.size.small)};
  color: ${(props) => props.theme.colors.textCategory};
`;
