import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header'; // Supondo que você já tenha o componente Header

export default function HomeLayout() {
  const userName = 'Pedro Souza'; // Nome do usuário (pode ser recuperado da autenticação)
  const userImage = 'https://img.freepik.com/fotos-gratis/jovem-barbudo-com-camisa-listrada_273609-5677.jpg?t=st=1727832462~exp=1727836062~hmac=718c38e34ee9e99729c10ebc608dc1526cc0d825c08ebfc33b3e8b958c786f14&w=740'; // URL da foto do usuário

  return (
    <View style={styles.container}>
      {/* Adicione o Header fixo no topo */}
      <Header userName={userName} userImage={userImage} />

      {/* Tabs de navegação */}
      <View style={styles.content}>
        <Tabs screenOptions={{
    headerShown: false
  }} >
          <Tabs.Screen 
            name="index"
            
            options={{
              title: 'Início',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="noticia"
            options={{
              title: 'Notícias',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="newspaper-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="loja"
            options={{
              title: 'Loja',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bag-outline" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="perfil"
            options={{
              title: 'Perfil',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person-outline" color={color} size={size} />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabsTitle: {
    alignContent:  'center',
  }
});
