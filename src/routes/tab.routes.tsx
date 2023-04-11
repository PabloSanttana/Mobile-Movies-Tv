import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Octicons, Feather } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

import { useTheme } from "styled-components/native";

import { Home } from "@src/screens/home";
import Search from "@src/screens/Search";
import Favorites from "@src/screens/Favorites";
import Setting from "@src/screens/Setting";
import { useSettings } from "@src/hooks/settings";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  const theme = useTheme();
  const { deviceType } = useSettings();
  const isTablet = deviceType === "tablet";
  const isAndroid = Platform.OS === "android";
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarInactiveTintColor: theme.colors.routerIcon,
        tabBarActiveTintColor: theme.colors.routerIconActive,
        tabBarStyle: {
          paddingVertical: isAndroid ? 10 : 10,
          height: isAndroid ? 40 : 70,
          backgroundColor: theme.colors.backgroundSecondary,
          borderColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons
              name="home"
              size={isTablet ? scale(16) : size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons
              name="search"
              size={isTablet ? scale(16) : size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons
              name="bookmark"
              size={isTablet ? scale(16) : size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="setting"
        component={Setting}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Feather
              name="settings"
              size={isTablet ? scale(16) : size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
