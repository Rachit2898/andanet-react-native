import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "./navbar";
import { useDispatch, useSelector } from "react-redux";
import { cartCheckOut } from "../redux/features/productApi";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

const SubmitCart = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { cartLength, cartValidateInfo } = useSelector((state) => ({
    ...state.products,
  }));
  const checkOutHandler = async (orderId) => {
    try {
      dispatch(cartCheckOut(orderId));
      navigation.navigate("CheckOut");
    } catch (error) {
      Alert.alert("Could Not Delte Product!!");
    }
  };
  const editOrderNavigation = () => {
    navigation.navigate("Cart");
  };
  const cartCount = cartValidateInfo?.order?.itemCount;
  return (
    <SafeAreaView>
      <Navbar />
      {cartCount && (
        <View>
          <View style={styles.summaryContainer}>
            <View>
              <Text style={styles.orderText}>Order Summary</Text>
            </View>
            <Pressable
              onPress={() => {
                editOrderNavigation();
              }}
              style={styles.editComponent}
            >
              <Text style={styles.editOrderText}>EDIT ORDER</Text>
            </Pressable>
          </View>
          <View style={styles.itemQuantityContainer}>
            <View style={styles.itemResponseContainer}>
              <Text style={styles.itemText}>Items:</Text>
              <View style={styles.itemResponseTextContainer}>
                <Text style={styles.itemResponseText}>{cartLength}</Text>
              </View>
            </View>
            <View style={styles.itemResponseContainer}>
              <Text style={styles.itemText}>Item Quantities:</Text>
              <View style={styles.itemResponseTextContainer}>
                <Text style={styles.itemResponseText}>
                  {cartValidateInfo?.order?.itemCount}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.itemQuantityContainer}>
            <View style={styles.itemResponseContainer}>
              <Text style={styles.itemSubTotal}>Items Subtotal:</Text>
              <View style={styles.itemResponseTextContainer}>
                <Text style={styles.itemSubTotal}>
                  ${cartValidateInfo?.order?.subTotal?.amount}
                </Text>
              </View>
            </View>
            <View style={styles.itemResponseContainer}>
              <Text style={styles.itemSubTotal}>Shipping Fee:</Text>
              <View style={styles.itemResponseTextContainer}>
                <Text style={styles.itemSubTotalResponseText}>Waived</Text>
              </View>
            </View>
          </View>
          <View style={styles.itemQuantityContainer}>
            <View style={styles.itemResponseContainer}>
              <Text style={styles.itemEstimated}>Estimated Tax:</Text>
              <View style={styles.itemResponseTextContainer}>
                <Text style={styles.itemSubTax}>
                  {" "}
                  ${cartValidateInfo?.order?.totalTax?.amount}
                </Text>
              </View>
            </View>
            <View style={styles.itemResponseContainer}>
              <Text style={styles.itemTotal}>Order Total:</Text>
              <View style={styles.itemResponseTotalCostContainer}>
                <Text style={styles.itemTotalResponseText}>
                  ${cartValidateInfo?.order?.total?.amount}
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            android_ripple={{ color: "#ccc" }}
            style={styles.proceedButtonContainer}
            onPress={() => checkOutHandler(cartValidateInfo?.order?.id)}
          >
            <Text style={styles.proceedButton}>PROCEED TO CHECKOUT</Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SubmitCart;

const styles = StyleSheet.create({
  editComponent: {
    alignItems: "flex-end",
    marginTop: -18,
  },
  itemTotal: {
    fontSize: 20,
    fontWeight: "800",
  },
  itemResponseTotalCostContainer: {
    alignItems: "flex-end",
    marginTop: -6,
  },
  itemEstimated: {
    fontWeight: "800",
  },
  itemTotalResponseText: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: -25,
  },
  itemSubTax: {},
  itemSubTotalResponseText: {
    color: "#409b4b",
    fontWeight: "800",
  },
  proceedButtonContainer: {
    height: 50,
    width: 300,
    backgroundColor: "#ed8b00",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ed8b00",
    marginHorizontal: 15,
    marginTop: 20,
  },
  proceedButton: {
    paddingVertical: 15,
    fontWeight: "700",
    color: "white",
  },
  itemText: {
    color: "#9b9b9b",
    fontSize: 15,
    fontWeight: "800",
  },
  itemResponseContainer: {
    marginVertical: 5,
  },
  itemSubTotal: {
    fontWeight: "500",
  },
  itemResponseTextContainer: {
    alignItems: "flex-end",
    marginTop: -18,
  },
  itemQuantityContainer: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
    marginHorizontal: 10,
  },
  itemResponseText: {
    color: "#9b9b9b",
    fontSize: 15,
    fontWeight: "800",
  },
  orderText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#494c4c",
  },
  editOrderText: {
    color: "#006ba6",
    fontSize: 12,
    fontWeight: "800",
  },
  summaryContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#9b9b9b",
  },
});
