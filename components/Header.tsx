// components/Header.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HeaderProps {
  userName: string;
  userImage: string; // URL da imagem do usuário
}

const Header: React.FC<HeaderProps> = ({ userName, userImage }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Logo à esquerda */}
      <Image 
        source={require('../assets/images/icon.png')} // Substitua pelo caminho da sua logo
        style={styles.logo}
      />

      {/* Informação do usuário à direita */}
      <View style={styles.userInfo}>
        <View >
        <Text style={styles.bemVindo}>Seja Bem Vindo</Text>
        <Text style={styles.userName}>{userName}</Text>
        </View>
        <Image 
          source={{ uri: userImage }} // URL da imagem do usuário
          style={styles.userImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff', // Cor de fundo do header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop:  30,

  },
  logo: {
    width: 50,
    height: 50,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bemVindo:{
    fontSize: 13,
    opacity: 0.6,
    textAlign: 'center',
  },


  userName: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
