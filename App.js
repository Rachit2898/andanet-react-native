import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Cart from "./components/Cart";
import AppLoading from "expo-app-loading";
import LoginScreen from "./components/Login";
import Home from "./components/Home";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./IconButton";
import CustomDrawer from "./components/drawyer";
import Inventory from "./components/Inventary";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { getToken } from "./utils";
import SubmitCart from "./components/submitCart";
import { logout, authenticate } from "./redux/features/authUser";
import CheckOut from "./components/checkOut";
import BackInStockSeeMore from "./components/backInStockSeeMore";
import Navbar from "./components/navbar";
import customerSeeMore from "./components/customerLikeYouSeeMore";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// const [isAuthenticated, setIsAuthenticated] = useState(null); customerSeeMore

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Back To Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Inventory Watch List"
        component={BackInStockSeeMore}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Your Top Purchases"
        component={Inventory}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Customers Like You"
        component={customerSeeMore}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Home"
        component={AuthenticatedStack}
        options={{
          title: "",
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Log" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Invantory"
          component={Inventory}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SubmitCart"
          component={SubmitCart}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="CheckOut"
          component={CheckOut}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BackInStockSeeMore"
          component={BackInStockSeeMore}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="customerDataSeeMore"
          component={customerSeeMore}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Drawer"
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </>
  );
}

function Navigation() {
  const { isAuthenticated } = useSelector((state) => ({
    ...state.auth,
  }));

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <DrawerNavigator />}
    </NavigationContainer>
  );
}
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getToken();

      if (storedToken) {
        dispatch(authenticate(storedToken));
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);
  if (isTryingLogin) {
    return <AppLoading />;
  }
  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}
