import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import CustomDrawer from "./drawyer";
import Home from "./Home";
import BackInStockSeeMore from "./backInStockSeeMore";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Badge, withBadge } from "react-native-elements";
import { userInfo, cartInfo, searchItems } from "../redux/features/productApi";
import Inventory from "./Inventary";

export default function Navbar() {
  const dispatch = useDispatch();
  const { userInfoData, cartInfoData, cartLength, searchItem } = useSelector(
    (state) => ({
      ...state.products,
    })
  );
  useEffect(() => {
    dispatch(userInfo());
    dispatch(cartInfo());
  }, [dispatch]);

  const navigation = useNavigation();
  const userData = userInfoData[0];
  const cartData = cartInfoData[0];
  const orderItems = cartData?.orderItems;
  const value = cartLength;
  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.navigate("Drawer");
  };
  const cartOpen = () => {
    navigation.navigate("Cart");
  };
  const searchItemHandler = (item) => {
    console.log({ item });

    dispatch(searchItems(item));
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={require("../assets/Hamburger.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo.jpeg")}
            style={{ width: 120, height: 30, marginLeft: 35, marginTop: 10 }}
          />
        </View>
        <View style={styles.logoContainer}>
          <Pressable
            onPress={() => {
              cartOpen();
            }}
            style={styles.button}
          >
            <Badge
              style={styles.badge}
              value={value}
              containerStyle={{ top: 10, right: -25 }}
            />
            <Image
              source={require("../assets/cart.png")}
              style={{
                width: 40,
                height: 40,
                marginLeft: 10,
                marginTop: 5,
                borderRadius: 50,
              }}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search by number, name or keyword"
          onChangeText={(value) => searchItemHandler(value)}
          onClear={(value) => searchItemHandler("")}
        />

        <View style={styles.searchIcon}>
          <Image
            style={styles.image}
            source={require("../assets/search.png")}
          />
        </View>
      </View>
      {searchItem.length > 0 && (
        <View style={{ marginTop: 10 }}>
          {searchItem?.map((item) => {
            console.log("len", item.length);
            return (
              <>
                <View style={styles.searchItemList}>
                  <Text style={styles.search}>{item}</Text>
                </View>
              </>
            );
          })}
        </View>
      )}
      <View style={styles.slab}>
        <Text style={styles.text}>
          {userData?.selectedAccount?.id} | {userData?.selectedAccount?.name}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    color: "#9b9b9b",
    fontWeight: "800",
    paddingLeft: 10,
  },
  searchItemList: {
    width: 350,
    height: 25,
    borderColor: "#9b9b9b",
    borderWidth: 0.5,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  container: {
    backgroundColor: "#063e63",
    flexDirection: "row",
  },
  slab: {
    backgroundColor: "#006ba6",
    marginTop: 20,
    textAlign: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  text: {
    color: "#fff",
  },

  backSlab: {
    marginTop: 10,
  },
  viewContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
  },
  logoContainer: {
    marginLeft: 50,
  },
  searchBox: {
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  image: {
    marginTop: 5,
    width: 20,
    height: 20,
  },
  searchIcon: {
    width: 30,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    borderColor: "#9b9b9b",
    borderWidth: 1,
  },
  input: {
    color: "#494c4c",
    width: 340,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.15)",
    fontSize: 15,
    paddingLeft: 15,
  },
});
