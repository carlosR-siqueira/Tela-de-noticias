import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, Linking, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//components
import  HeaderTitleComponent from '@/components/HeaderTitle'
import  Categories from '@/components/Categories'

interface NewsItem {
  id: string;
  title: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
}

const { width } = Dimensions.get('window');

const App = () => {
  const router = useRouter(); // useRouter movido para dentro do componente
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
      console.log(json); // Verifique a estrutura dos dados retornados

      setData(json.articles || []);
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
      <HeaderTitleComponent />

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
  
      <GestureHandlerRootView style={styles.categoriesContainer}  >
        <Categories />
      </GestureHandlerRootView>

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
  categoriesContainer: {
    paddingVertical: 15,
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
  carouselDate: {
    fontSize: 12,
    color: '#999',
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carouselAuthor: {
    fontSize: 14,
    color: '#999',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#00ADEF',
  },
  inactiveIndicator: {
    backgroundColor: '#ddd',
  },
});

export default App;
