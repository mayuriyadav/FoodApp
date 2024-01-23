import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { EvilIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'; 
import style, { colors } from '../globals/style';

const HomeHeadNav = ({navigation}) => {
  return (
      <View style={styles.container}>
      <EvilIcons name="navicon" size={24} color="black" style={styles.myicon} />
      <View style={styles.containerin}>
      <Text style={styles.mytext}>Foodie</Text>
      <MaterialCommunityIcons name='food-outline' size={26} color="red" style={styles.myicon}/>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('userprofile')}>
      <FontAwesome5 name="user-circle" size={26} color="black" style={styles.myicon}/>
      </TouchableOpacity>
      </View>
  )
}

export default HomeHeadNav

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        padding:10,
        alignItems:'center',
        backgroundColor:colors.col1,
        elevation:20,
        borderBottomLeftRadius:20,
        borderBottomLeftRadius:20,
    },
    containerin:{
flexDirection:'row',
alignItems:'center',
    },
    myicon:{
        color:colors.text1,
        fontSize:24,
    },
    mytext:{
      color:colors.text1
    }
})