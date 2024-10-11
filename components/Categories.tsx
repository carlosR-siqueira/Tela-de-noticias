import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";

const Categories = ()  => {
    const categories: string[] = ['Esporte', 'Arte', 'Ciência', 'Tecnologia'];
    const [activeCategory, setActiveCategory] = useState<string>('Esporte'); // Estado para a categoria ativa


    return (

<View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity key={category} onPress={() => setActiveCategory(category)}>
            {activeCategory === category ? (
              <LinearGradient
                colors={['#F8F8FF', '#00ADEF']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.activeCategoryButton}
              >
                <Text style={styles.activeCategoryText}>{category}</Text>
              </LinearGradient>
            ) : (
              <View>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

)}

const styles  = StyleSheet.create({
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        
      },
      categoryText: {
        backgroundColor: '#fff',
        width: 75,
        borderRadius: 50,
        lineHeight: 45,
        textAlign: 'center',
        fontSize: 16,
        color: '#b7c3cc',
        borderWidth:  1,
        borderColor:  '#b7c3cc',
      },
      activeCategoryButton: {
        width: 75,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      },
      activeCategoryText: {
        color: '#fff', // Cor do texto quando ativo
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },

})

export default Categories