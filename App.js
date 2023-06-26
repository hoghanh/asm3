import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NativeBaseProvider } from "native-base";

import Home from "./components/Home";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <Home />
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
