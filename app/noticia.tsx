import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, Linking, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';



interface NewsItem {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
}

const { width } = Dimensions.get('window');

const router = useRouter();


const App = () => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0); // Para controlar o index ativo no carousel
  const [activeCategory, setActiveCategory] = useState<string>('Esporte'); // Estado para a categoria ativa

  const categories: string[] = ['Esporte', 'Arte', 'Ciência', 'Tecnologia'];

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://news-db86d-default-rtdb.asia-southeast1.firebasedatabase.app/.json'); // Altere para o endpoint correto
      const json = await response.json();
   
      

      setData(json.articles);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar as notícias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, []);

  const handleScroll = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const renderItem = ({ item }: { item: NewsItem }) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <View style={styles.card}>
          <Image source={{ uri: item.urlToImage }} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardAuthor}>{item.author}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ADEF" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Nenhuma notícia disponível.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      

        <TouchableOpacity onPress={() => router.back()}>

        
          <Text>
          <LinearGradient
          colors={['#FFFFFF','#00ADEF' ]} // Degradê de azul escuro para claro
          start={[0, 0]} // Início do degradê (esquerda superior)
          end={[1, 1]} // Fim do degradê (direita inferior)
          style={styles.gradientButton}// Estilos do botão
        >
            <Ionicons style={styles.backButtonIcon} name="arrow-back" size={35} />
        </LinearGradient>
          </Text>
        </TouchableOpacity >
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notícias</Text>
        </View>
      </View>

      {/* Slide/Carousel de notícias */}
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false} 
        onScroll={handleScroll} 
        scrollEventThrottle={16} 
        style={styles.carousel}
      >
        {data.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(item.url)}>
            <View style={styles.carouselItem}>
              <Image source={{ uri: item.urlToImage }} style={styles.carouselImage} />
              <View style={styles.carouselContent}>
                <Text style={styles.carouselDate}>{item.publishedAt}</Text>
                <Text style={styles.carouselTitle}>{item.title}</Text>
                <Text style={styles.carouselAuthor}>{item.author}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Indicador de página */}
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, activeIndex === index ? styles.activeIndicator : styles.inactiveIndicator]}
          />
        ))}
      </View>

      {/* Categorias exibidas para futuro uso */}
      <View style={styles.categories}>
  {categories.map((category) => (
    <TouchableOpacity key={category} onPress={() => setActiveCategory(category)}>
      {activeCategory === category ? (
        <LinearGradient
          colors={['#F8F8FF', '#00ADEF']} // Degradê de azul escuro para claro
          start={[0, 0]} // Início do degradê (esquerda superior)
          end={[1, 1]} // Fim do degradê (direita inferior)
          style={styles.activeCategoryButton} // Estilo para o botão ativo
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
      {/* Lista de notícias */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
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
  
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardAuthor: {
    fontSize: 14,
    color: '#999',
  },
  // Estilos do Carousel/Slide
  carousel: {
    marginVertical: 10,
  },
  carouselItem: {
    width: width * 0.7,
    marginRight: 10,
    marginLeft: 5,
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  carouselContent: {
    marginTop: 10,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Altere para branco
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  carouselAuthor: {
    fontSize: 12,
    color: '#fff', // Altere para branco
  },
  carouselDate: {
    fontSize: 12,
    color: '#fff', // Altere para branco
    marginBottom: 5,
  },
  // Estilos dos indicadores de página
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#00ADEF',
  },
  inactiveIndicator: {
    backgroundColor: '#ccc',
  },
});

export default App;
