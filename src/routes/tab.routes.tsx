import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { Octicons, Feather } from "@expo/vector-icons";
import { scale } from "react-native-size-matters";

import { useTheme } from "styled-components";

import { Home } from "@src/screens/home";
import Search from "@src/screens/Search";
import Favorites from "@src/screens/Favorites";

const Tab = createBottomTabNavigator();

export function TabRoutes() {
  const theme = useTheme();
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
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Octicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="setting"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ size, color }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
