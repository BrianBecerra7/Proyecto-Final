import { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, ScrollView, Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"; 


import { db } from "../../config/fb"; 


const COLORS = {
  primary: "#00BCD4",
  secondary: "#80DEEA",
  accent: "#0097A7",
  white: "#FFFFFF",
  lightGray: "#F5F5F5",
  gray: "#9E9E9E",
  text: "#263238",
  textLight: "#546E7A",
};

export default function DetailsBuyer() {
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const productsCollection = collection(db, "products");

        
        const q = query(productsCollection, where("category", "==", "Chemical"));

        
        const querySnapshot = await getDocs(q);

        
        console.log("Cantidad de productos encontrados: ", querySnapshot.size);

        
        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        
        console.log("Productos obtenidos: ", productsList);

        
        setProducts(productsList);
      } catch (error) {
        console.error("Error obteniendo productos: ", error);
      }
    };

    fetchProducts();
  }, []); 

  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={14} color={COLORS.primary} />);
      } else if (i === fullStars && halfStar) {
        stars.push(<Ionicons key={i} name="star-half" size={14} color={COLORS.primary} />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={14} color={COLORS.primary} />);
      }
    }

    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

      
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Marketplace</Text>
          <Text style={styles.headerSubtitle}>Encuentra los mejores productos empresariales</Text>
        </View>
      </View>

     
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.productsContainer}>
        <View style={styles.allProductsContainer}>
          <Text style={styles.sectionTitle}>Productos "Chemical"</Text>
          <View style={styles.productsGrid}>
            {products.length === 0 ? (
              <Text>No hay productos disponibles en esta categoría.</Text>
            ) : (
              products.map((product) => (
                <TouchableOpacity key={product.id} style={styles.productCard}>
                  
                  {product.imageUrl ? (
                    <Image
                      source={{ uri: product.imageUrl }}
                      style={styles.productImage}
                    />
                  ) : (
                    <View style={styles.productImagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>Image</Text>
                    </View>
                  )}
                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {product.name}
                    </Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                    {renderStars(product.rating || 0)} 
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
  },
  productsContainer: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  allProductsContainer: {
    marginTop: 25,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  productCard: {
    width: "45%",
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
  },
  productImage: {
    height: 150,
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productImagePlaceholder: {
    height: 150,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imagePlaceholderText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.accent,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: COLORS.textLight,
  },
});
