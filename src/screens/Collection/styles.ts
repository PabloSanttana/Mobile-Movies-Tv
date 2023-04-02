import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

const { width, height } = Dimensions.get("screen");

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
`;

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: ${width + "px"};
  height: ${width * 1.3 + "px"};
`;
export const Gradient = styled(LinearGradient)`
  width: ${width + "px"};
  height: ${width * 1.3 + "px"};
  justify-content: flex-end;
  padding: 0px 20px;
`;
export const ButtonTrailer = styled.TouchableOpacity`
  transform: translateY(-100px);
  width: ${convertScale(60)};
  height: ${convertScale(60)};
  opacity: 1;
  margin: 0px auto;
  align-items: center;
`;
export const ButtonTrailerText = styled.Text`
  color: white;
  padding: 3px 5px;
  transform: translateY(-10px);
  border-radius: 10px;
  font-size: ${(props) => convertScale(17)};
`;

export const PostImage = styled.Image`
  width: ${width * 0.3 + "px"};
  height: ${width * 0.4 + "px"};
`;

export const Title = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(9) : convertScale(23)};
  color: ${(props) => props.theme.colors.textPrimary};
  margin-bottom: 10px;
`;
export const DivRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Text = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(9) : convertScale(15)};
  color: ${(props) => props.theme.colors.textPrimary};
  line-height: 22px;
`;
export const Tagline = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(9) : convertScale(15)};
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 22px;
  margin: 10px 0px;
`;

export const SubTitle = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(9) : convertScale(16)};
  color: ${(props) => props.theme.colors.textSession};
  line-height: 22px;
  margin: 10px 0px;
`;
export const TitleH6 = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(9) : convertScale(14)};
  color: ${(props) => props.theme.colors.textPrimary};
  line-height: 22px;
`;
export const TextSmall = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) =>
    props.deviceType === "tablet" ? convertScale(9) : convertScale(13)};
  color: ${(props) => props.theme.colors.textPrimary};
  line-height: 22px;
`;

export const Content = styled.View`
  padding: 0px 20px;
`;
