import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HeaderTitleComponent = () =>{

    return(

 



<View style={styles.header}>
<TouchableOpacity onPress={() => router.back()}>
  <Text>
    <LinearGradient
      colors={['#FFFFFF','#00ADEF']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.gradientButton}
    >
      <Ionicons style={styles.backButtonIcon} name="arrow-back" size={35} />
    </LinearGradient>
  </Text>
</TouchableOpacity>
<View style={styles.headerTitleContainer}>
  <Text style={styles.headerTitle}>Notícias</Text>
</View>
</View>
)}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      gradientButton: {
        flex:1,
        width: 43,
        height: 43,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backButtonIcon: {
        color: '#fff',
        fontSize:  24,
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
      },
      headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
      },
})

export default HeaderTitleComponent;