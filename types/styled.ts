import "styled-components";

import { light } from "../src/theme/light";

declare module "styled-components" {
  type themeType = typeof light;

  export interface DefaultTheme extends themeType {}
}
