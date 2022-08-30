import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { logout } from "../redux/features/authUser";
import { Provider, useDispatch } from "react-redux";

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.dashbordContainer}>
          <Text style={styles.dashbordText}>Dashboard</Text>
        </View>
        <View style={styles.logoutContainer}>
          <View style={styles.accountContainer}>
            <Text style={styles.accountText}>Account</Text>
          </View>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={styles.logoutBox}
            onPress={() => dispatch(logout())}
          >
            <Text style={styles.logoutText}>LOGOUT</Text>
          </Pressable>
        </View>
        <View style={styles.prductList}>
          <Text style={styles.productText}>Product Lists</Text>
        </View>
        <View style={styles.list}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  prductList: {
    backgroundColor: "#006ba6",
    height: 30,
  },
  productText: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 5,
    fontWeight: "800",
  },
  dashbordContainer: {
    marginTop: -30,
    borderBottomWidth: 1,
    marginHorizontal: 10,
  },
  dashbordText: {
    fontWeight: "400",
    fontSize: 25,
    alignItems: "center",
    textAlign: "center",
    color: "#494c4c",
  },
  logoutContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  logoutBox: {
    alignSelf: "flex-end",
    backgroundColor: "#ed8b00",
    width: 70,
    height: 25,
    borderRadius: 3,
    marginTop: -25,
  },
  logoutText: {
    color: "#fff",
    alignItems: "center",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "800",
    paddingTop: 6,
  },
  accountText: {
    fontSize: 15,
    fontWeight: "800",
  },
  list: { marginHorizontal: 20 },
});
