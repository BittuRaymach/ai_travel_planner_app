import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/FirebaseConfig";

const SignIn = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      ToastAndroid.showWithGravity(
        "Please enter both email and password",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);

      ToastAndroid.showWithGravity(
        "Sign in successful!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );

      router.replace("/myTrip");

      // Clear form fields
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        ToastAndroid.showWithGravity(
          "User not found. Please register first.",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else if (errorCode === "auth/wrong-password") {
        ToastAndroid.showWithGravity(
          "Wrong password. Please try again.",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else {
        ToastAndroid.showWithGravity(
          error.message,
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.White,
        height: "100%",
        padding: 25,
        paddingTop: 60,
      }}
    >
      <Text
        style={{
          fontFamily: "Outfit-Bold",
          fontSize: 30,
        }}
      >
        Let's Sign you in.
      </Text>
      <Text
        style={{
          fontFamily: "Outfit",
          fontSize: 30,
          color: Colors.Gray,
          marginTop: 20,
        }}
      >
        Welcome back
      </Text>
      <Text
        style={{
          fontFamily: "Outfit",
          fontSize: 30,
          color: Colors.Gray,
          marginTop: 20,
        }}
      >
        You've been missed!
      </Text>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text style={styles.labelText}>Email</Text>
        <TextInput
          name="email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          textContentType="text"
          placeholder="Enter your email"
          style={styles.inputText}
        />
        <Text style={styles.labelText}>Password</Text>
        <TextInput
          name="password"
          value={password}
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
          placeholder="Enter your password"
          style={styles.inputText}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCreate}>
          <Ionicons
            name="logo-google"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.googleButton}> Sign In with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/auth/SignUp/")}>
          <Text style={styles.buttonCreate}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontFamily: "Outfit-Bold",
    fontSize: 20,
  },
  inputText: {
    borderWidth: 2,
    borderColor: Colors.Gray,
    padding: 15,
    borderRadius: 15,
    fontSize: 18,
    marginBottom: 25,
  },
  button: {
    backgroundColor: Colors.Primary,
    color: Colors.White,
    padding: 15,
    borderRadius: 15,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 35,
  },
  buttonCreate: {
    backgroundColor: Colors.White,
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 25,
    borderColor: Colors.Gray,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    textAlign: "center",
    alignItems: "center",
    fontSize: 18,
  },
});
export default SignIn;
