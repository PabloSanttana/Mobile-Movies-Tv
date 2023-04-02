import { DeviceTypeProps } from "@src/interfaces";
import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";
import { Dimensions } from "react-native";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

const { width, height } = Dimensions.get("screen");

export const Container = styled.ImageBackground`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  //padding-top: ${height * 0.2 + "px"};
`;
export const Content = styled.View`
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.85);
  padding: ${convertScale(25)};
  border-radius: ${convertScale(5)};
  margin: 0px ${convertScale(20)};
`;

export const Title = styled.Text<DeviceType>`
  margin-bottom: 15px;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(20) : convertScale(25)};
  color: white;
  text-align: center;
  line-height: ${convertScale(35)};
`;

export const Text = styled.Text<DeviceType>`
  margin-bottom: 15px;
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(12) : convertScale(15)};
  color: white;
  text-align: justify;
  line-height: ${convertScale(20)};
`;

export const InputText = styled.TextInput<DeviceType>`
  background-color: white;
  width: ${convertScale(210)};
  height: ${convertScale(35)};
  padding-left: 10px;
  margin-bottom: 20px;
  border-radius: ${convertScale(5)};
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(12) : convertScale(15)};
`;

export const ButtonAccess = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.backgroundCategory};
  border-radius: ${convertScale(5)};
  padding: ${convertScale(10)} ${convertScale(10)};
  width: ${convertScale(210)};
`;

export const ButtonTitle = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(11) : convertScale(15)};
  color: ${(props) => props.theme.colors.textCategory};
  text-align: center;
`;
