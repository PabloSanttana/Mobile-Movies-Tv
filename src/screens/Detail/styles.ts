import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { convertScale, sizeDeviceTypeScale } from "@src/utils/utils";
import { DeviceTypeProps } from "@src/interfaces";
import { WebView } from "react-native-webview";

type DeviceType = {
  deviceType: DeviceTypeProps;
};

const { width, height } = Dimensions.get("screen");

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.backgroundPrimary};
`;

type BackgroundContainerProps = {
  orientation: number;
  deviceType: DeviceTypeProps;
};

export const BackgroundContainer = styled.View<BackgroundContainerProps>`
  flex: 1;
  height: ${(props) =>
    sizeDeviceTypeScale(
      props.deviceType,
      props.orientation === 1 ? height * 0.3 : width * 0.4,
      props.orientation === 1 ? height * 0.59 : width * 0.7
    )};
`;

export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  width: 100%;
  height: 100%;
`;
export const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding: 0px 20px;
`;
export const ButtonTrailer = styled.TouchableOpacity`
  transform: translateY(${convertScale(-50)});
  width: ${convertScale(60)};
  height: ${convertScale(60)};
  margin: 0px auto;
  align-items: center;
`;
export const ButtonTrailerText = styled.Text<DeviceType>`
  color: white;
  padding: 3px 5px;
  transform: translateY(-10px);
  border-radius: 10px;
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 12, 17)};
`;

export const PostImage = styled.Image`
  width: ${width * 0.3 + "px"};
  height: ${width * 0.4 + "px"};
`;

export const Title = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 18, 23)};
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
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 12, 15)};
  color: ${(props) => props.theme.colors.textPrimary};
  line-height: ${(props) => sizeDeviceTypeScale(props.deviceType, 17, 22)};
`;
export const Tagline = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 12, 14)};
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: ${(props) => sizeDeviceTypeScale(props.deviceType, 17, 22)};
  margin: 10px 0px;
`;

export const SubTitle = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 13, 16)};
  color: ${(props) => props.theme.colors.textSession};
  line-height: ${(props) => sizeDeviceTypeScale(props.deviceType, 17, 22)};
  margin: 10px 0px;
`;
export const TitleH6 = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 11, 14)};
  color: ${(props) => props.theme.colors.textPrimary};
  line-height: ${(props) => sizeDeviceTypeScale(props.deviceType, 17, 22)};
`;
export const TextSmall = styled.Text<DeviceType>`
  font-family: ${(props) => props.theme.fonts.text};
  font-size: ${(props) => sizeDeviceTypeScale(props.deviceType, 9, 13)};
  color: ${(props) => props.theme.colors.textPrimary};
  line-height: ${convertScale(20)};
`;

export const Content = styled.View`
  padding: 0px 20px;
`;

export const WebViewContainer = styled(WebView)`
  width: 100%;
  height: ${convertScale(200)};
`;
