import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSettings } from "@src/hooks/settings";

const Detail = React.lazy(() => import("@src/screens/Detail"));
const DetailSeason = React.lazy(() => import("@src/screens/DetailSeason"));
const Initial = React.lazy(() => import("@src/screens/Initial"));
const Collection = React.lazy(() => import("@src/screens/Collection"));
const TabRoutes = React.lazy(() => import("./tab.routes"));
const SeeMore = React.lazy(() => import("@src/screens/SeeMore"));

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { user } = useSettings();

  return (
    <Stack.Navigator
      initialRouteName="Initial"
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user.firstName && <Stack.Screen name="Initial" component={Initial} />}
      <Stack.Screen name="HomePage" component={TabRoutes} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="SeeMore" component={SeeMore} />
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen name="DetailSeason" component={DetailSeason} />
    </Stack.Navigator>
  );
}
