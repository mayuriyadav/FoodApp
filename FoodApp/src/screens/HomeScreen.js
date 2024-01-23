import { StyleSheet, Text, View , StatusBar,TextInput, ScrollView,FlatList, Image} from 'react-native'
import React, { useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../globals/style'
import { firebase } from '../../FireBase/firebaseConfig'
import { useEffect } from 'react'
import Cardslider from '../components/Cardslider'
import ButtomNav from '../components/ButtomNav'

const HomeSreen = ({navigation}) => {
 
  const [foodData, setFoodData]= useState([]);
  const [VegData,setVegData] = useState([]);
  const [NonVegData,setNonVegData]=useState([]);

  const foodRef = firebase.firestore().collection('FoodData');
   
  useEffect(() => {

    foodRef.onSnapshot(snapshot =>{
      setFoodData(snapshot.docs.map(doc => doc.data()))
    })
  },[])
 
  useEffect(()=>{

    setVegData(foodData.filter(item=>item.foodType=='veg'))
    setNonVegData(foodData.filter(item=>item.foodType=='non-veg'))
  },[foodData])
   
      // console.log(VegData)
      // console.log(NonVegData)
     //console.log(foodData); 
    const [search,setSearch]= useState('')
    console.log(search)
  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation} />
      <View style={styles.bottomnav}>
        <ButtomNav navigation={navigation} />
      </View>

      <ScrollView>
        <View style={styles.searchbox}>
          <AntDesign
            name="search1"
            size={24}
            color="red"
            style={styles.searchicon}
          />

          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={(text) => {
              setSearch(text);
            }}
          />
        </View>

        {search != "" && (
          <View style={styles.seacrhresultsouter}>
            <FlatList
              style={styles.searchresultsinner}
              data={foodData}
              renderItem={({ item }) => {
                if (
                  item.foodName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return (
                    <View style={styles.searchresult}>
                      <AntDesign name="arrowright" size={24} color="black" />
                      <Text style={styles.searchresulttext}>
                        {item.foodName}
                      </Text>
                    </View>
                  );
                }
              }}
            />
          </View>
        )}

        <Categories />
        <OfferSlider />
        <Cardslider
          title={"Today's Special"}
          data={foodData}
          navigation={navigation}
        />
        <Cardslider
          title={"NonVeg Love"}
          data={NonVegData}
          navigation={navigation}
        />
        <Cardslider
          title={"Veg Hunger"}
          data={VegData}
          navigation={navigation}
        />
        {/* <Text>HomeSreen</Text> */}
      </ScrollView>
    </View>
  );
}

export default HomeSreen





const styles = StyleSheet.create({
container:{
  flex:1,
  backgroundColor:colors.col1,
 // alignItems:'center',
  width:'100%',
},
searchbox:{
  flexDirection:'row',
  width:'90%',
  backgroundColor:colors.col1,
  padding:10,
  margin:20,
  elevation:10,
  borderRadius:30
},
input:{
  marginLeft:10,
  width:'90%',
  fontSize:18,
  color:colors.text1,
},
searchicon:{
 
 color:colors.text1

},

    seacrhresultsouter: {
        width: '100%',
        marginHorizontal: 30,
        height: '100%',
        backgroundColor: colors.col1,
    },
    searchresultsinner: {
        width: '100%',
    },
    searchresult: {
        width: '100%',
        flexDirection: 'row',
        // alignItems: 'center',
        padding: 5,
    },
    searchresulttext: {
        marginLeft: 10,
        fontSize: 18,
        color: colors.text1,
    }
    ,
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    }

})