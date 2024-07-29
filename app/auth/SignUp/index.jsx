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
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../../../config/FirebaseConfig";

const SignUp = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if name is provided
    if (!name) {
      ToastAndroid.showWithGravity(
        "Please enter your full name",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      ToastAndroid.showWithGravity(
        "Please enter a valid email address",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return;
    }
    // Check if password is provided
    if (!password) {
      ToastAndroid.showWithGravity(
        "Please enter your password",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
      return;
    }

    try {
      // Check if the email is already registered
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        ToastAndroid.showWithGravity(
          "This email is already registered",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user);

      // Show success message
      ToastAndroid.showWithGravity(
        "Account created successfully",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );

      // Clear form fields
      setEmail("");
      setPassword("");
      setName("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        ToastAndroid.showWithGravity(
          "This email is already in use",
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
      } else {
        console.error("Error creating user:", error);
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
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="black"
          style={{
            marginTop: 11,
            marginBottom: 33,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Outfit-Bold",
          fontSize: 30,
        }}
      >
        Create New Account
      </Text>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          name="name"
          value={name}
          onChangeText={(value) => setName(value)}
          textContentType="text"
          placeholder="Enter your full name"
          style={styles.inputText}
        />
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
          <Text style={styles.button}>Create account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/SignIn/")}>
          <Text style={styles.buttonCreate}>Sign In</Text>
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
export default SignUp;
