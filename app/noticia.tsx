import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NewsItem {
  id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  category: string;
  url: string;
}

const { width } = Dimensions.get('window');

const App = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Esporte');
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories: string[] = ['Esporte', 'Arte', 'Ciência', 'Tecnologia'];

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://brainai-api.com/kago');
      const json = await response.json();

      console.log('Dados recebidos da API:', json);
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

  const filteredData = data.filter(item => item.category === activeCategory);
  console.log('Dados filtrados:', filteredData);

  const renderItem = ({ item }: { item: NewsItem }) => {
    console.log('Renderizando item:', item);
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />
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
        <TouchableOpacity>
          <Text style={styles.backButton}>
            <Ionicons style={styles.backButtonIcon} name="arrow-back" size={35} />
          </Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notícias</Text>
        </View>
      </View>

      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
            <View style={styles.carouselContent}>
              <Text style={styles.carouselDate}>{item.date}</Text>
              <Text style={styles.carouselTitle}>{item.title}</Text>
              <Text style={styles.carouselAuthor}>{item.author}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity key={category} onPress={() => setActiveCategory(category)}>
            <Text style={[styles.categoryText, activeCategory === category && styles.activeCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredData}
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
  backButton: {
    backgroundColor: '#00ADEF',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    lineHeight: 45,
    textAlign: 'center',
  },
  backButtonIcon: {
    color: '#fff',
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
  carouselItem: {
    width: width * 0.7,
    marginRight: 10,
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
    color: '#333',
  },
  carouselAuthor: {
    fontSize: 12,
    color: '#999',
  },
  carouselDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  activeCategoryText: {
    color: '#00ADEF',
    fontWeight: 'bold',
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
});

export default App;
