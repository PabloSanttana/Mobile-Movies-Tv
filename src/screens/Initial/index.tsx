import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export function Initial() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Initial</Text>
      <Button title="Home" onPress={() => navigation.navigate("HomePage")} />
    </View>
  );
}
