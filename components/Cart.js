import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
import Navbar from "./navbar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import {
  cartInfo,
  deleteItem,
  emptyCartItems,
  cartValidating,
} from "../redux/features/productApi";

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { cartInfoData, visibleData, cartLength, cartValidateInfo } =
    useSelector((state) => ({
      ...state.products,
    }));
  useEffect(() => {
    dispatch(cartInfo());
  }, [dispatch]);

  const cartData = cartInfoData[0];
  const orderItems = cartData?.orderItems;
  const [visible, setVisible] = useState(false);
  const [updateValue, setUpdateValue] = useState();

  const updateItem = (item) => {
    if (item) {
      setUpdateValue(item);
      setVisible(true);
    }
  };

  async function deleteItemFromCart(Id) {
    try {
      dispatch(deleteItem({ Id }));
    } catch (error) {
      Alert.alert("Could Not Delte Product!!");
    }
  }
  async function emptyCart(id) {
    try {
      dispatch(emptyCartItems(id));
    } catch (error) {
      Alert.alert("Could Not Empty Cart!!");
    }
  }
  async function SubmitCart() {
    try {
      dispatch(cartValidating());
      navigation.navigate("SubmitCart");
    } catch (error) {
      Alert.alert("Could Not Empty Cart!!");
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Navbar />
      {cartLength ? (
        <View>
          <View style={styles.cartAndTotalDetailsContainer}>
            <View style={styles.cartItemsCountContainer}>
              <Text style={styles.cartText}>
                Your Cart ({cartLength} item
                {emptyCartItems !== 1 ? "s" : ""})
              </Text>
            </View>
            <View style={styles.totalCostContainer}>
              <Text style={styles.totalCostText}>
                {" "}
                Sub Total: ${cartData?.total?.amount}
              </Text>
            </View>
            <Pressable
              android_ripple={{ color: "#ccc" }}
              style={styles.proceedButtonContainer}
              onPress={() => SubmitCart()}
            >
              <Text style={styles.proceedButton}>PROCEED TO CHECKOUT</Text>
            </Pressable>
          </View>

          <ScrollView style={{ marginBottom: 300 }}>
            <View style={styles.emptyButtonContainer}>
              <View style={styles.textInputContainer}>
                <TextInput style={styles.textInput}></TextInput>
              </View>
              <Pressable
                style={styles.emptyContainer}
                android_ripple={{ color: "#ccc" }}
                onPress={() => emptyCart(cartData?.id)}
              >
                <View>
                  <Text style={styles.emptyText}>EMPTY CART</Text>
                </View>
              </Pressable>
            </View>
            {visibleData &&
              orderItems?.map((item) => {
                return (
                  <View>
                    <View style={styles.Card}>
                      <View style={styles.imageCard}>
                        {item?.primaryMedia?.url ? (
                          <>
                            <Image
                              source={{
                                uri: `https://staging.andanet.com/${item?.primaryMedia?.url}`,
                              }}
                              style={{
                                width: 120,
                                height: 200,
                                marginHorizontal: 10,
                                marginVertical: 60,
                                borderRadius: 6,
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <Image
                              source={require("../assets/camera.png")}
                              style={{
                                width: 120,
                                height: 200,
                                marginHorizontal: 10,
                                marginVertical: 60,
                                borderRadius: 6,
                              }}
                            />
                          </>
                        )}
                      </View>
                      <View style={styles.insideCard}>
                        <View style={styles.productTextComponent}>
                          <Text style={styles.productText}>
                            {item?.sku?.name}
                          </Text>
                        </View>

                        <View>
                          <View style={styles.productDetailComponent}>
                            <View style={styles.productDetailComponentFirst}>
                              <View style={styles.textComponent}>
                                <Text style={styles.textName}>Item:</Text>
                                <Text>{item?.sku?.externalId}</Text>
                              </View>
                              <View style={styles.textComponent}>
                                <Text style={styles.textName}>SIZE:</Text>
                                <Text>{item?.sku?.packSizeDisplay}</Text>
                              </View>
                              <View style={styles.textComponent}>
                                <Text style={styles.textName}>NDC:</Text>
                                <Text>{item?.sku?.nationalDrugCode}</Text>
                              </View>
                              <View style={styles.textComponent}>
                                <Text style={styles.textName}>MFR:</Text>
                                <Text>{item?.sku?.manufacturer}</Text>
                              </View>
                              <View style={styles.textComponent}>
                                <Text style={styles.priceText}>
                                  ${item?.salePrice.amount}
                                </Text>
                              </View>
                            </View>
                            <View style={styles.productDetailComponentSecond}>
                              <View style={styles.itemFormText}>
                                <Text>{item?.sku?.itemForm}</Text>
                              </View>
                            </View>
                          </View>
                          <View>
                            <View style={styles.addButtonContainer}>
                              <TextInput
                                style={styles.textInputDelete}
                                keyboardType="number-pad"
                                defaultValue={`${item?.quantity}`}
                                onChangeText={(value) => updateItem(value)}
                              />
                              <View style={styles.updateButtonContainer}>
                                {visible && (
                                  <Pressable
                                    style={styles.updateButton}
                                    android_ripple={{ color: "#ccc" }}
                                  >
                                    <Text style={styles.updateText}>
                                      UPDATE
                                    </Text>
                                  </Pressable>
                                )}
                              </View>
                              <Pressable
                                android_ripple={{ color: "#ccc" }}
                                style={styles.addButton}
                                key={item?.quantity}
                                onPress={() => deleteItemFromCart(item?.id)}
                              >
                                <Image
                                  source={require("../assets/delete.png")}
                                  style={{
                                    width: 12,
                                    height: 15,
                                    marginTop: 8,
                                  }}
                                />
                              </Pressable>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  cartAndTotalDetailsContainer: {
    marginVertical: 10,
  },
  safeAreaContainer: {
    flex: 1,
  },
  cartItemsCountContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  emptyCart: {
    textAlign: "center",
    alignItems: "center",
    marginVertical: 60,
  },
  emptyCartText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  updateButtonContainer: {
    width: 70,
    height: 35,
    borderRadius: 3,
    marginHorizontal: 8,
  },

  updateButton: {
    backgroundColor: "#c77500",
  },
  updateText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 8,
  },
  totalCostContainer: {
    alignItems: "flex-end",
    marginTop: -22,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  dailyOrderContainer: {
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: "#006ba6",
    width: 70,
    height: 35,
    borderRadius: 3,

    alignItems: "center",
  },
  textInputDelete: {
    width: 70,
    height: 35,
    borderWidth: 1,
    borderColor: "#209bd6",
    textAlign: "center",
  },
  priceText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  productText: {
    color: "#006ba6",
    fontWeight: "bold",
    fontSize: 15,
  },
  productDetailComponent: {
    flexDirection: "row",
  },
  productDetailComponentFirst: {
    flexDirection: "column",
    width: 120,
  },
  emptyButtonContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  insideCard: {
    width: 230,
    marginVertical: 10,
  },
  Card: {
    marginHorizontal: 5,
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#9b9b9b",
    flexDirection: "row",
  },
  imageCard: {
    width: 150,
  },
  addButtonContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  cartText: {
    color: "#494c4c",
    fontWeight: "500",
  },
  totalCostText: {
    color: "#494c4c",
    fontWeight: "500",
  },
  textInputContainer: {
    marginHorizontal: 10,
  },
  textName: {
    fontWeight: "bold",
    marginRight: 4,
  },
  textInput: {
    height: 30,
    width: 200,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.15)",
  },
  emptyText: {
    color: "#006ba6",
    fontSize: 10,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 6,
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
  },
  proceedButton: {
    paddingVertical: 15,
    fontWeight: "700",
    color: "white",
  },
  emptyContainer: {
    borderColor: "#006ba6",
    borderWidth: 1,
    width: 100,
    height: 30,
    marginLeft: 60,
    borderRadius: 4,
  },
  textComponent: {
    flexDirection: "row",
    marginBottom: 3,
    flex: 1,
    flexWrap: "wrap",
    paddingHorizontal: 4,
  },
  productDetailComponentSecond: {
    width: 100,
    marginHorizontal: 8,
  },
});
