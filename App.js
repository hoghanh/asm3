import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NativeBaseProvider } from "native-base";

import Home from "./components/Home";
import Favorites from "./components/Favorites";
import Detail from "./components/Detail";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Drawer.Navigator
            useLegacyImplementation
            screenOptions={{
              headerTintColor: "#155e75",
              drawerActiveBackgroundColor: "#a5f3fc",
              drawerActiveTintColor: "#155e75",
            }}
          >
            <Drawer.Screen name="Trang chủ" component={Home} />
            <Drawer.Screen name="Danh sách yêu thích" component={Favorites} />
            <Drawer.Screen
              name="Chi tiết"
              component={Detail}
              options={{
                drawerLabel: () => null,
                title: null,
                drawerIcon: () => null,
                drawerActiveBackgroundColor: null,
                drawerActiveTintColor: null,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}
