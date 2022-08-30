import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "./navbar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import {
  bestInStock,
  yourTopPurChase,
  customerLikeYou,
  preNegotiatedItems,
  userInfo,
  addItem,
} from "../redux/features/productApi";

export default function Home() {
  const dispatch = useDispatch();

  const {
    products,
    topPurchaseProducts,
    customerLikeYouProducts,
    preNegotiatedItemsProducts,
    userInfoData,
    cartInfoData,
  } = useSelector((state) => ({
    ...state.products,
  }));
  useEffect(() => {
    dispatch(bestInStock());
    dispatch(userInfo());
    dispatch(yourTopPurChase());
    dispatch(customerLikeYou());
    dispatch(preNegotiatedItems());
  }, [dispatch]);
  const cartData = cartInfoData[0];
  const userData = userInfoData[0];
  const accountId = userData?.selectedAccount?.id;

  async function addItemIntoCart(skuId) {
    console.log("adding item", skuId);
    try {
      dispatch(addItem({ accountId, skuId }));
    } catch (error) {
      Alert.alert("Could not Update Product!!");
    }
  }

  const navigation = useNavigation();

  const backInStockData = products;
  const topPurchse = topPurchaseProducts[0];
  const customerLike = customerLikeYouProducts[0];
  const negotiated = preNegotiatedItemsProducts[0];

  // const addItem = async (skuId) => {
  //   const id = skuId.toString;
  //   Alert.alert(token?.validations[0]?.message);
  // };
  const inventoryOpen = async () => {
    navigation.navigate("Invantory");
  };
  const BackInStockSeeMore = async () => {
    navigation.navigate("BackInStockSeeMore");
  };
  const customerSeeMore = async () => {
    navigation.navigate("customerDataSeeMore");
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navbar />

      {backInStockData ? (
        <ScrollView>
          <View>
            <View style={styles.backSlab}>
              <Text style={styles.backText}>Back in Stocks!</Text>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                onPress={() => {
                  BackInStockSeeMore();
                }}
              >
                <Text style={styles.SeeText}>See More</Text>
              </Pressable>
            </View>

            {backInStockData?.data?.map((item) => {
              return (
                <View style={styles.products} key={item.id}>
                  <View style={styles.imageContainer}>
                    {item?.product?.mediaMap?.primary?.url ? (
                      <Image
                        source={{
                          uri: `https://staging.andanet.com/${item?.product?.mediaMap?.primary?.url}`,
                        }}
                        style={{
                          width: 120,
                          height: 120,
                          marginHorizontal: 10,
                          alignSelf: "center",
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      <Image
                        source={require("../assets/camera.png")}
                        style={{
                          width: 120,
                          height: 120,
                          marginHorizontal: 10,
                          alignSelf: "center",
                          borderRadius: 6,
                        }}
                      />
                    )}
                  </View>
                  <View style={styles.productDetails}>
                    <Text style={styles.medicine}>{item.name}</Text>
                    <Text>ITEM:{item.id}</Text>
                    <Text>NDC:{item.nationalDrugCode}</Text>
                    <Text>PRICE:{item.retailPrice.amount}</Text>
                  </View>
                  <Pressable
                    android_ripple={{ color: "#ccc" }}
                    style={styles.addButton}
                    onPress={() => addItemIntoCart(item?.id)}
                  >
                    <Text style={styles.addText}>ADD</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
          <View>
            <View style={styles.backSlab}>
              <Text style={styles.backText}>Your Top Purchase</Text>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                onPress={() => {
                  inventoryOpen();
                }}
              >
                <Text style={styles.SeeText}>See More</Text>
              </Pressable>
            </View>

            {topPurchse?.products?.map((item) => {
              return (
                <View style={styles.products} key={item.defaultSku.id}>
                  <View style={styles.imageContainer}>
                    {item?.mediaMap?.primary?.url ? (
                      <Image
                        source={{
                          uri: `https://staging.andanet.com/${item?.mediaMap?.primary?.url}`,
                        }}
                        style={{
                          width: 120,
                          height: 120,
                          marginHorizontal: 10,
                          alignSelf: "center",
                          borderRadius: 6,
                        }}
                      />
                    ) : (
                      <Image
                        source={require("../assets/camera.png")}
                        style={{
                          width: 120,
                          height: 120,
                          marginHorizontal: 10,
                          alignSelf: "center",
                          borderRadius: 6,
                        }}
                      />
                    )}
                  </View>
                  <View style={styles.productDetails}>
                    <Text style={styles.medicine}>{item.defaultSku.name}</Text>
                    <Text>ITEM:{item.defaultSku.id}</Text>
                    <Text>PRICE:{item.defaultSku.retailPrice.amount}</Text>
                    <Text>NDC:{item.defaultSku.nationalDrugCode}</Text>
                  </View>
                  <Pressable
                    android_ripple={{ color: "#ccc" }}
                    style={styles.addButton}
                    onPress={() => addItemIntoCart(item?.defaultSku?.id)}
                  >
                    <Text style={styles.addText}>ADD</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
          <View>
            <View style={styles.backSlab}>
              <Text style={styles.likeYouText}>
                PurChased By Customer Like You
              </Text>
              <Pressable
                android_ripple={{ color: "#ccc" }}
                onPress={() => {
                  customerSeeMore();
                }}
              >
                <Text style={styles.SeeText}>See More</Text>
              </Pressable>
            </View>
            <View style={{ marginTop: 20 }}>
              {customerLike?.products?.map((item) => {
                return (
                  <View style={styles.products} key={item.defaultSku.id}>
                    <View style={styles.productDetails}>
                      <View style={styles.imageContainer}>
                        {item?.mediaMap?.primary?.url ? (
                          <Image
                            source={{
                              uri: `https://staging.andanet.com/${item?.mediaMap?.primary?.url}`,
                            }}
                            style={{
                              width: 120,
                              height: 120,
                              marginHorizontal: 10,
                              alignSelf: "center",
                              borderRadius: 6,
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../assets/camera.png")}
                            style={{
                              width: 120,
                              height: 120,
                              marginHorizontal: 10,
                              alignSelf: "center",
                              borderRadius: 6,
                            }}
                          />
                        )}
                      </View>
                      <Text style={styles.medicine}>
                        {item.defaultSku.name}
                      </Text>
                      <Text>ITEM:{item.defaultSku.id}</Text>
                      <Text>PRICE:{item.defaultSku.retailPrice.amount}</Text>
                      <Text>NDC:{item.defaultSku.nationalDrugCode}</Text>
                    </View>
                    <Pressable
                      android_ripple={{ color: "#ccc" }}
                      style={styles.addButton}
                      onPress={() => addItemIntoCart(item?.defaultSku?.id)}
                    >
                      <Text style={styles.addText}>ADD</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.negProducts}>
            <View style={styles.backSlab}>
              <Text style={styles.backText}>Pre-Negotiated Items</Text>
              <Text style={styles.SeeText}>See More</Text>
            </View>

            {negotiated?.products?.map((item) => {
              return (
                <View style={styles.products} key={item.defaultSku.id}>
                  <View style={styles.productDetails}>
                    <View style={styles.imageContainer}>
                      {item?.mediaMap?.primary?.url ? (
                        <Image
                          source={{
                            uri: `https://staging.andanet.com/${item?.mediaMap?.primary?.url}`,
                          }}
                          style={{
                            width: 120,
                            height: 120,
                            marginHorizontal: 10,
                            alignSelf: "center",
                            borderRadius: 6,
                          }}
                        />
                      ) : (
                        <Image
                          source={require("../assets/camera.png")}
                          style={{
                            width: 120,
                            height: 120,
                            marginHorizontal: 10,
                            alignSelf: "center",
                            borderRadius: 6,
                          }}
                        />
                      )}
                    </View>
                    <Text>NAME:{item.defaultSku.name}</Text>
                    <Text>ITEM:{item.defaultSku.id}</Text>

                    <Text>PRICE:{item.defaultSku.retailPrice.amount}</Text>
                    <Text>NDC:{item.defaultSku.nationalDrugCode}</Text>
                  </View>
                  <Pressable
                    android_ripple={{ color: "#ccc" }}
                    style={styles.addButton}
                    onPress={() => addItem(item.defaultSku.id)}
                  >
                    <Text style={styles.addText}>ADD</Text>
                  </Pressable>
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View>
          <AppLoading />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 120,
    width: 300,
    alignSelf: "center",
    marginVertical: 20,
  },
  image: { height: 110, width: 250 },
  input: {
    color: "#494c4c",
    width: 340,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.15)",
    fontSize: 15,
    paddingLeft: 15,
  },
  productDetails: {
    textAlign: "center",
    alignItems: "center",
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
  products: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#9b9b9b",
  },
  negProducts: {
    marginHorizontal: 10,
    marginVertical: 20,
    marginBottom: 200,
  },
  backText: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
  },
  likeYouText: {
    paddingLeft: 10,
    fontWeight: "bold",

    fontSize: 20,
    height: 100,
    width: 300,
  },
  medicine: {
    color: "#006ba6",
  },
  addButton: {
    backgroundColor: "#c77500",
    width: 80,
    height: 20,
    marginLeft: 140,
    marginBottom: 20,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  SeeText: {
    textAlign: "right",
    marginTop: -20,
    paddingRight: 10,
    color: "#006ba6",
  },
  SeeTextLikeYou: {
    textAlign: "right",
    marginTop: -95,
    paddingRight: 10,
    color: "#006ba6",
  },
});
