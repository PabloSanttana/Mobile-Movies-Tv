import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { DeviceTypeProps } from "@src/interfaces";
import { convertScale } from "@src/utils/utils";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

export const Gradient = styled(LinearGradient)`
  padding: 0px 20px;
  align-items: center;
  flex-direction: row;
  flex: 1;
`;

export const BackgroundImageCollection = styled.ImageBackground<DeviceType>`
  flex: 1;
  height: 300px;
  height: ${(props) =>
    props.deviceType === "tablet" ? convertScale(150) : convertScale(260)};
`;

export const ButtonCollection = styled.TouchableOpacity`
  background-color: white;
  margin-left: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 0 auto;
`;
export const ButtonCollectionTitle = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  color: black;
`;
