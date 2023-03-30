import styled from "styled-components/native";
import { convertScale } from "@src/utils/utils";
//Category

type selected = {
  active?: boolean;
};

export const CategoryButton = styled.TouchableOpacity<selected>`
  border: ${convertScale(1)} solid;
  border-color: ${(props) =>
    props.active
      ? props.theme.colors.textCategory
      : props.theme.colors.textSecondary};
  padding: ${convertScale(4)} ${convertScale(12)};
  border-radius: ${convertScale(5)};
  margin-right: 10px;
  background-color: ${(props) =>
    props.active ? props.theme.colors.backgroundCategory : "transparent"};
  text-align: center;
  justify-content: center;
`;
export const CategoryTitle = styled.Text<selected>`
  text-align: center;
  font-family: ${(props) => props.theme.fonts.subtitle};
  font-size: ${(props) => convertScale(props.theme.size.average)};
  color: ${(props) =>
    props.active
      ? props.theme.colors.textCategory
      : props.theme.colors.textSecondary};
`;
