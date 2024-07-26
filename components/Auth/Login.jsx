import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require("../../assets/images/login.jpg")}
        style={{
          width: "100%",
          height: 550,
        }}
      />
      <View
        style={{
          backgroundColor: "#fff",
          height: "100%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          marginTop: -20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Outfit-Bold",
            textAlign: "center",
            padding: 20,
          }}
        >
          AI Travel Planner
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "Outfit",
            textAlign: "center",
            padding: 10,
          }}
        >
          Effortlessly plan your trips with personalized recommendations, custom
          itineraries, easy bookings, and real-time updates. Start your journey
          today!
        </Text>
        <TouchableOpacity onPress={() => router.push("/auth/SignIn/")}>
          <Text
            style={{
              backgroundColor: "#000",
              padding: 10,
              color: "#fff",
              textAlign: "center",
              margin: 10,
              borderRadius: 20,
              fontFamily: "Outfit",
              fontSize: 18,
              marginTop: "10%",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
