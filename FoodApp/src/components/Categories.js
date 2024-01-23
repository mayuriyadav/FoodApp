import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'
import { colors } from '../globals/style'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Categories = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.box}> 
        <FontAwesome5 name="hamburger" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Starters</Text>
        </View>

        <View style={styles.box}> 
        <MaterialCommunityIcons name="pasta" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>BreakFast</Text>
        </View>

        <View style={styles.box}> 
        <MaterialCommunityIcons name="noodles" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Dinner</Text>
        </View>

        <View style={styles.box}> 
        <MaterialCommunityIcons name="food" size={24} color="black" style={styles.icon}  />
        <Text style={styles.text}>Launch</Text>
        </View>

        <View style={styles.box}> 
        <MaterialCommunityIcons name="food-turkey" size={24} color="black" style={styles.icon} />
        <Text style={styles.text}>Turkey</Text>
        </View>

        <View style={styles.box}> 
        <MaterialCommunityIcons name="food-hot-dog" size={24} color="black"  style={styles.icon} />
        <Text style={styles.text}>Hot-Dog</Text>
        </View>

      </ScrollView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
container:{
  backgroundColor:colors.col1,
  width:'100%',
  elevation:10,
  borderRadius:10,
},
head:{
  color:colors.text1,
  fontSize:25,
  fontWeight:'300',
  margin:10,
  alignSelf:'center',
  paddingBottom:5,
  borderBottomColor:colors.text1,
  borderBottomWidth:1,
},
box:{
  backgroundColor:colors.col1,
  elevation:20,
  margin:10,
  padding:10,
  borderRadius:10,
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'row',
},
icon:{
  marginRight:10,
  color:colors.text3,
},
mytext:{
  
  color:colors.text3,
  }

})