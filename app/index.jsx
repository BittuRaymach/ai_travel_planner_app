import { Text, View } from "react-native";
import Login from "../components/Auth/Login";
import { auth } from "../config/FirebaseConfig";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {user ? <Redirect href={"/myTrip"} /> : <Login />}
    </View>
  );
}
