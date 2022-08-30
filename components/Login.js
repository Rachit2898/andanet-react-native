import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { login } from "../utils";
import LoadingOverlay from "./LoadingOverlay";
import { Provider, useDispatch } from "react-redux";
import { signin } from "../redux/features/authUser";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  async function submitHandler() {
    setIsAuthenticating(true);
    try {
      const emailIsValid = email.includes("@");
      const passwordIsValid = password.length > 6;
      if (!emailIsValid || !passwordIsValid) {
        Alert.alert("Invalid input", "Please check your entered credentials.");
        return;
      }
      dispatch(signin({ email, password }));
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      {!isAuthenticating ? (
        <View style={styles.container}>
          <Image style={styles.image} source={require("../assets/logo.jpeg")} />
          <StatusBar style="auto" />
          <Text style={styles.labelContainer}>USERNAME*</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email."
              placeholderTextColor="#003f5c"
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <Text style={styles.labelContainer}>PASSWORD*</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password."
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity style={styles.loginBtn}>
            <Text onPress={submitHandler} style={styles.loginText}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <LoadingOverlay message="Logging you in..." />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingLeft: 30,
  },

  image: {
    marginBottom: 40,
    marginHorizontal: 20,
    width: 200,
    height: 50,
  },

  inputView: {
    backgroundColor: "#f2f2f2",
    borderWidth: 2,
    borderColor: "#209bd6",
    width: "70%",
    height: 45,
    marginBottom: 20,
  },

  TextInput: {
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 5,
    color: "#494c4c",
    backgroundColor: "#f2f2f2",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    backgroundColor: "#c77500",
    width: 80,
    height: 40,
    marginBottom: 20,
  },
  labelContainer: {
    color: "#494c4c",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    alignItems: "center",
  },
});
