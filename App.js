import React from "react";
import { StyleSheet } from "react-native";
import Providers from "./navigation";
//import AuthStack from "./navigation/AuthStack"
export default function App() {
  return <Providers/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
