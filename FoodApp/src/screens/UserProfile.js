import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../FireBase/firebaseConfig";
import { AntDesign } from "@expo/vector-icons";
import { navbtn, navbtnin, navbtnout,colors } from "../globals/style";


const UserProfile = () => {
  const [userloggeduid, setUserloggeduid] = useState(null);
  const [userdata, setUserdata] = useState(null);
  useEffect(() => {
    const checklogin = () => {
      firebase.auth().onAuthStateChanged((user) => {
        // console.log(user);
        if (user) {
          // navigation.navigate('home');

          setUserloggeduid(user);
        } else {
          // No user is signed in.
          setUserloggeduid(null);
        }
      });
    };
    checklogin();
  }, []);
  useEffect(() => {
    const getuserdata = async () => {
      const docRef = firebase
        .firestore()
        .collection("UserData")
        .where("uid", "==", userloggeduid?.uid);

      const doc = await docRef.get();
      if (!doc.empty) {
        doc.forEach((doc) => {
          setUserdata(doc.data());
        });
      } else {
        // navigation.navigate('login');
        console.log("No such document");
      }
    };
    getuserdata();
  }, [userloggeduid]);
  // console.log(userlogged);
  console.log(userdata);
  return (
    <View style={styles.containerout}>
      <TouchableOpacity
        onPress={() => navigation.navigate("home")}
        style={navbtnout}
      >
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="white" styles={navbtnin} />
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.head1}>Your Profile</Text>
        <View style={styles.containerin}>
          <Text style={styles.head2}>
            Name:{" "}
            {userdata ? (
              <Text style={styles.head2in}>{userdata.name}</Text>
            ) : (
              "loading"
            )}
          </Text>

          <Text style={styles.head2}>
            Email:{" "}
            {userdata ? (
              <Text style={styles.head2in}>{userdata.email}</Text>
            ) : (
              "loading"
            )}
          </Text>

          <Text style={styles.head2}>
            Phone:{" "}
            {userdata ? (
              <Text style={styles.head2in}>{userdata.phone}</Text>
            ) : (
              "loading"
            )}
          </Text>

          <Text style={styles.head2}>
            Address:{" "}
            {userdata ? (
              <Text style={styles.head2in}>{userdata.address}</Text>
            ) : (
              "loading"
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  containerout: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "efff",
    alignItems: "center",
    width: "100%",
  },
  head1: {
    fontSize: 20,
    fontWeight: "250",
    marginVertical: 20,
    color: colors.text1,
  },
  containerin: {
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.text1,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  head2: {
    fontSize: 20,
    fontWeight: "200",
    marginTop: 20,
  },
  head2in: {
    fontSize: 20,
    fontWeight: "300",
  },
});
