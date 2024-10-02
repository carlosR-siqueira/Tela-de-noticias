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
        source={{
            uri: 'https://scontent-gig4-1.cdninstagram.com/v/t51.2885-19/460285473_1051892146535588_1704474555675732952_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-gig4-1.cdninstagram.com&_nc_cat=108&_nc_ohc=w7wxfJU-UxYQ7kNvgHKbl-d&_nc_gid=a642592dcda0478993b55833da5dd2eb&edm=AEYEu-QBAAAA&ccb=7-5&oh=00_AYBVFStGUDTw1CX-sb6s4zx1175B5pHGDkdeOqf6WIjU_g&oe=67027590&_nc_sid=ead929'
        }} // Substitua pelo caminho da sua logo
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
