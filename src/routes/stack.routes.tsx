import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Detail } from "@src/screens/Detail";
import { DetailSeason } from "@src/screens/DetailSeason";
import { Initial } from "@src/screens/Initial";
import { Collection } from "@src/screens/Collection";

import { TabRoutes } from "./tab.routes";
import SeeMore from "@src/screens/SeeMore";
import { useSettings } from "@src/hooks/settings";

const Stack = createNativeStackNavigator();

export function StackRoutes() {
  const { user } = useSettings();
  console.log("useSettings", user);
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
