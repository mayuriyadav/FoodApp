import { StyleSheet, Text, View ,TouchableOpacity, ScrollView,FlatList} from 'react-native'
import React ,{ useEffect, useState }  from 'react'

import { AntDesign } from "@expo/vector-icons";
import { btn1, colors, hr80, navbtn, navbtnin } from "../../globals/style";
import { firebase } from "../../../FireBase/firebaseConfig";


const PlaceOrderComponent = ({navigation,route}) => {
  const { cartdata } = route.params;

  const [orderdata, setOrderdata] = useState([]);
  const [totalCost, setTotalCost] = useState("0");

  useEffect(() => {
    setOrderdata(JSON.parse(cartdata));
   
  }, [cartdata]);
// console.log(typeof (orderdata));

useEffect(() => {
  if (cartdata != null) {
    try {
      const parsedCartData = JSON.parse(cartdata);

      if (
        parsedCartData &&
        parsedCartData.cart &&
        Array.isArray(parsedCartData.cart)
      ) {
        let totalfoodprice = 0;

        parsedCartData.cart.forEach((item) => {
          const foodPrice = parseInt(item?.data?.foodPrice) || 0;
          const addonPrice = parseInt(item?.data?.foodAddonPrice) || 0;
          const foodQuantity = parseInt(item?.Foodquantity) || 0;
          const addonQuantity = parseInt(item?.addonquantity) || 0;

          if (
            !isNaN(foodPrice) &&
            !isNaN(addonPrice) &&
            !isNaN(foodQuantity) &&
            !isNaN(addonQuantity)
          ) {
            const foodSubtotal = foodPrice * foodQuantity;

            const addonSubtotal = addonPrice * addonQuantity;

            totalfoodprice += foodSubtotal + addonSubtotal;
          }
        });

        setTotalCost(totalfoodprice.toString());
      }
    } catch (error) {
      console.error("Error parsing cart data:", error);
    }
  }
}, [cartdata]);

  // console.log(cartdata);

  // user data -------------------

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
  // console.log(",,,,,,,,,",userdata)
  // console.log(",,,,,,,,,", userloggeduid);


  const placenow = () => {
    const docRef = firebase.firestore().collection("UserOrders").doc();

    const orderId = docRef.id || "defaultOrderId";

    docRef
      .set({
        orderid: docRef.id, // Use docRef.id instead of docRef.uid
        orderdata: orderdata.cart,
        orderstatus: "pending",
        ordercost: totalCost,
        orderdate: firebase.firestore.FieldValue.serverTimestamp(),
        orderaddress: userdata.address,
        orderphone: userdata.phone,
        ordername: userdata.name,
        orderuseruid: userloggeduid, // Assuming this is a plain JavaScript object
        orderpayment: "online",
        paymenttotal: totalCost,
      })
      .then(() => {
        alert("Order Placed Successfully");
        // Uncomment and adjust navigation as needed
        // navigation.navigate('home');
        // navigation.navigate('trackorders');
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        // Handle the error, show an alert, or perform other actions
      });
  };



  return (
    <ScrollView style={styles.containerout}>
      <TouchableOpacity onPress={() => navigation.navigate("home")}>
        <View style={navbtn}>
          <AntDesign name="back" size={24} color="black" style={navbtnin} />
        </View>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.head1}>Your Order Summary</Text>
        <FlatList
          style={styles.c1}
          data={orderdata.cart}
          renderItem={({ item }) => {
            // Check if item and item.data are defined
            if (!item || !item.data) {
              return null; // or some fallback UI
            }
            const addonQuantity = item.addonquantity || 0;
            // console.log(addonQuantity);
            return (
              <View style={styles.rowout}>
                <View style={styles.row}>
                  <View style={styles.left}>
                    <Text style={styles.qty}>{item.Foodquantity}</Text>

                    {/* Check if foodName is defined before accessing it */}
                    {item.data.foodName && (
                      <Text style={styles.title}>{item.data.foodName}</Text>
                    )}

                    {/* Check if foodPrice is defined before accessing it */}
                    {item.data.foodPrice && (
                      <Text style={styles.price1}>₹{item.data.foodPrice}</Text>
                    )}
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.totalprice}>
                      ₹
                      {parseInt(item.Foodquantity) *
                        parseInt(item.data.foodPrice)}
                    </Text>
                  </View>
                </View>
                {addonQuantity > 0 && (
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.qty}>{addonQuantity}</Text>

                      <Text style={styles.title}>{item.data.foodAddon}</Text>
                      <Text style={styles.price1}>
                        ₹{item.data.foodAddonPrice}
                      </Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.totalprice}>
                        ₹
                        {parseInt(item.addonquantity) *
                          parseInt(item.data.foodAddonPrice)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
        <View style={hr80}></View>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.title}>Order Total :</Text>
          </View>
          <View style={styles.left}>
            <Text style={styles.totalprice}>₹{totalCost}</Text>
          </View>
        </View>
        <View style={hr80}></View>

        <View style={styles.userdataout}>
          <Text style={styles.head1}>Your Details</Text>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Name :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Email :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.email}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Phone :</Text>
            </View>

            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.phone}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.left}>
              <Text style={styles.title}>Address :</Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.title}>{userdata?.address}</Text>
            </View>
          </View>
        </View>

        <View style={hr80}></View>
        <View>
          <TouchableOpacity style={btn1}>
            <Text style={styles.btntext} onPress={() => placenow()}>
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default PlaceOrderComponent

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  containerout: {
    flex: 1,
    backgroundColor: colors.col1,
    // alignItems: 'center',
    width: "100%",
    // height: '100%',
  },
  
    head1: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.text1,
        margin: 10,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    rowout: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
    },

    qty: {
        width: 40,
        height: 30,
        backgroundColor: colors.text1,
        borderRadius: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 10,
        color: colors.col1,
        fontSize: 17,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
    },
    price1: {
        fontSize: 17,
        fontWeight: 'bold',
        marginRight: 10,
        color: colors.text1,
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        flexDirection: 'row',
    },
    totalprice: {
        fontSize: 17,
        fontWeight: 'bold',
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    btntext: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.col1,
        margin: 10,
    }
});