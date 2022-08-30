import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Navbar from "./navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { useDispatch, useSelector } from "react-redux";
import {
  backInStockSeeMore,
  userInfo,
  addItem,
  updateValues,
} from "../redux/features/productApi";

export default function Inventory() {
  const dispatch = useDispatch();
  const { backInStockSeeMoreData, userInfoData, cartInfoData } = useSelector(
    (state) => ({
      ...state.products,
    })
  );
  useEffect(() => {
    dispatch(backInStockSeeMore());
    dispatch(userInfo());
  }, [dispatch]);

  const inventoryWatchListData = backInStockSeeMoreData;
  const cartData = cartInfoData[0];
  const orderItems = cartData?.orderItems;
  const data = backInStockSeeMoreData?.products;
  const userData = userInfoData[0];
  const [visible, setVisible] = useState(false);
  const [updateValue, setUpdateValue] = useState();

  async function addItemIntoCart(skuId) {
    const accountId = userData?.selectedAccount?.id;

    try {
      if (updateValue) {
        dispatch(updateValues({ accountId, skuId, updateValue }));
      } else {
        dispatch(addItem({ accountId, skuId }));
      }
    } catch (error) {
      Alert.alert("Could not Update Product!!");
    }
  }

  const updateItem = (item) => {
    if (item) {
      setUpdateValue(item);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Navbar />
      <View style={styles.heading}>
        <Text style={styles.headingText}>Inventory Watch List</Text>
      </View>
      {inventoryWatchListData ? (
        <ScrollView>
          <Text style={styles.pageText}>
            Showing 1 - 25 of {inventoryWatchListData.totalResults} results
          </Text>
          <View style={styles.filterContainer}>
            <Image
              source={require("../assets/filter.png")}
              style={{ width: 30, height: 30, marginTop: 10, marginLeft: 10 }}
            />
          </View>
          <View style={{ flex: 1 }}>
            {data?.map((item) => {
              const values =
                item?.defaultSku?.availabilityDetail?.quantityAvailable;

              return (
                <View style={styles.Card}>
                  <View style={styles.imageCard}>
                    {item?.mediaMap?.primary?.url ? (
                      <>
                        <Image
                          source={{
                            uri: `https://staging.andanet.com/${item?.mediaMap?.primary?.url}`,
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
                    <View>
                      {item?.defaultSku?.bestPrice && (
                        <View style={styles.bestPriceComponent}>
                          <Text style={styles.bestPriceText}>BEST PRICE</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.productTextComponent}>
                      <Text style={styles.productText}>
                        {item?.defaultSku?.name}
                      </Text>
                    </View>
                    <View>
                      <View style={styles.productDetailComponent}>
                        <View style={styles.productDetailComponentFirst}>
                          <View style={styles.textComponent}>
                            <Text style={styles.textName}>Item:</Text>
                            <Text>{item?.defaultSku?.externalId}</Text>
                          </View>
                          <View style={styles.textComponent}>
                            <Text style={styles.textName}>SIZE:</Text>
                            <Text>{item?.defaultSku?.packSizeDisplay}</Text>
                          </View>

                          <View style={styles.textComponent}>
                            <Text style={styles.textName}>NDC:</Text>
                            <Text>{item?.defaultSku?.nationalDrugCode}</Text>
                          </View>
                          <View style={styles.textComponent}>
                            <Text style={styles.textName}>MFR:</Text>
                            <Text>{item?.defaultSku?.manufacturer}</Text>
                          </View>
                          <View style={styles.textComponent}>
                            <Text style={styles.priceText}>
                              ${item?.defaultSku?.salePrice.amount}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.productDetailComponentSecond}>
                          <View style={styles.itemFormText}>
                            <Text>{item?.defaultSku?.itemForm}</Text>
                          </View>
                        </View>
                      </View>
                      {values !== 0 ? (
                        <View>
                          <View style={styles.addButtonContainer}>
                            <TextInput
                              style={styles.textInput}
                              keyboardType="number-pad"
                              defaultValue="1"
                              onChangeText={(value) => updateItem(value)}
                            />
                            <Pressable
                              android_ripple={{ color: "#ccc" }}
                              style={styles.addButton}
                              onPress={() =>
                                addItemIntoCart(item?.defaultSku?.id)
                              }
                            >
                              <Text style={styles.addText}>ADD</Text>
                            </Pressable>
                          </View>

                          <View style={styles.dailyOrderContainer}>
                            {item?.defaultSku?.dailyOrderLimit && (
                              <Text style={styles.orderLimitText}>
                                Daily Order Limit:{" "}
                                {item?.defaultSku?.dailyOrderLimit}
                              </Text>
                            )}
                          </View>
                        </View>
                      ) : (
                        <>
                          <Text style={styles.notifyText}>
                            We will notify you when this item is in stock
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
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
  safeAreaContainer: {
    flex: 1,
  },
  notifyText: {
    color: "#494c4c",
    fontWeight: "bold",
    paddingVertical: 20,
    textAlign: "center",
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
  filterContainer: {
    borderWidth: 2,
    width: 80,
    height: 55,
    borderRadius: 3,
    marginLeft: 20,
    borderColor: "#ed8b00",
  },
  pageText: {
    color: "#494c4c",
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  textInput: {
    width: 70,
    height: 35,
    borderWidth: 1,
    borderColor: "#209bd6",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#c77500",
    width: 70,
    height: 35,
    borderRadius: 3,
    marginHorizontal: 8,
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 8,
  },
  textComponent: {
    flexDirection: "row",
    marginBottom: 3,
    flex: 1,
    flexWrap: "wrap",
    paddingHorizontal: 4,
  },
  productDetailComponent: {
    flexDirection: "row",
  },
  productDetailComponentFirst: {
    flexDirection: "column",

    width: 120,
  },
  productDetailComponentSecond: {
    width: 100,
    marginHorizontal: 8,
  },
  itemFormText: {
    alignItems: "flex-end",
    marginHorizontal: 8,
  },
  priceText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  productTextComponent: {
    marginVertical: 5,
  },
  textName: {
    fontWeight: "bold",
    marginRight: 4,
  },
  productText: {
    color: "#006ba6",
    fontWeight: "bold",
    fontSize: 15,
  },
  orderLimitText: {
    color: "#cd2237",
    fontWeight: "bold",
    fontSize: 18,
  },
  heading: {
    alignItems: "center",
    textAlign: "center",
  },
  headingText: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#494c4c",
  },
  bestPriceComponent: {
    backgroundColor: "#c77500",
    width: 80,
    borderRadius: 3,
  },
  bestPriceText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  insideCard: {
    width: 230,
    marginVertical: 10,
  },
  dailyOrderContainer: {
    marginBottom: 10,
  },
});
