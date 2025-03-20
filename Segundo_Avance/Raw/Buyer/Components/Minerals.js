"use client"

import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"


const { width } = Dimensions.get("window")


const COLORS = {
    primary: "#00BCD4", 
    secondary: "#80DEEA", 
    accent: "#0097A7", 
    white: "#FFFFFF",
    lightGray: "#F5F5F5",
    gray: "#9E9E9E",
    text: "#263238",
    textLight: "#546E7A",
}

export default function DetailsBuyer({ navigation }) {
    
    
    const [products, setProducts] = useState([
        {
            id: "1",
            name: "Producto Empresarial 1",
            price: "$1,299.99",
            rating: 4.5,
            description: "Descripción breve del producto",
            category: "Tecnología",
        },
        {
            id: "2",
            name: "Producto Empresarial 2",
            price: "$899.99",
            rating: 4.2,
            description: "Descripción breve del producto",
            category: "Oficina",
        },
        {
            id: "3",
            name: "Producto Empresarial 3",
            price: "$2,499.99",
            rating: 4.8,
            description: "Descripción breve del producto",
            category: "Tecnología",
        },
        {
            id: "4",
            name: "Producto Empresarial 4",
            price: "$599.99",
            rating: 4.0,
            description: "Descripción breve del producto",
            category: "Mobiliario",
        },
        {
            id: "5",
            name: "Producto Empresarial 5",
            price: "$1,799.99",
            rating: 4.7,
            description: "Descripción breve del producto",
            category: "Servicios",
        },
    ])

    
    const categories = ["Agricultural", "Minerals", "Forestry", "Chemicals"]

    const [selectedCategory, setSelectedCategory] = useState("Todos")

    
    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const halfStar = rating - fullStars >= 0.5

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Ionicons key={i} name="star" size={14} color={COLORS.primary} />)
            } else if (i === fullStars && halfStar) {
                stars.push(<Ionicons key={i} name="star-half" size={14} color={COLORS.primary} />)
            } else {
                stars.push(<Ionicons key={i} name="star-outline" size={14} color={COLORS.primary} />)
            }
        }

        return (
            <View style={styles.ratingContainer}>
                {stars}
                <Text style={styles.ratingText}>{rating}</Text>
            </View>
        )
    }

    
    const navigateToProductDetails = (product) => {
        
        navigation.navigate("ProductDetails", { product })
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

            
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Marketplace</Text>
                    <Text style={styles.headerSubtitle}>Encuentra los mejores productos empresariales</Text>
                </View>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            
            <View style={styles.categoriesContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesScrollView}
                >
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                style={[styles.categoryButtonText, selectedCategory === category && styles.categoryButtonTextActive]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.productsContainer}>
                
                <View style={styles.featuredContainer}>
                    <Text style={styles.sectionTitle}>Productos Destacados</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuredScrollView}
                    >
                        {products.slice(0, 3).map((product) => (
                            <TouchableOpacity
                                key={product.id}
                                style={styles.featuredProductCard}
                                onPress={() => navigateToProductDetails(product)}
                            >
                                
                                <View style={styles.featuredImagePlaceholder}>
                                    <Text style={styles.imagePlaceholderText}>Imagen</Text>
                                    <Text style={styles.imagePlaceholderText}>350 x 200</Text>
                                </View>
                                <View style={styles.featuredProductInfo}>
                                    <Text style={styles.productCategory}>{product.category}</Text>
                                    <Text style={styles.featuredProductName} numberOfLines={1}>
                                        {product.name}
                                    </Text>
                                    <Text style={styles.featuredProductPrice}>{product.price}</Text>
                                    {renderStars(product.rating)}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                
                <View style={styles.allProductsContainer}>
                    <Text style={styles.sectionTitle}>Todos los Productos</Text>
                    <View style={styles.productsGrid}>
                        {products.map((product) => (
                            <TouchableOpacity
                                key={product.id}
                                style={styles.productCard}
                                onPress={() => navigateToProductDetails(product)}
                            >
                                
                                <View style={styles.productImagePlaceholder}>
                                    <Text style={styles.imagePlaceholderText}>Imagen</Text>
                                    <Text style={styles.imagePlaceholderText}>150 x 150</Text>
                                </View>
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName} numberOfLines={1}>
                                        {product.name}
                                    </Text>
                                    <Text style={styles.productPrice}>{product.price}</Text>
                                    {renderStars(product.rating)}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.lightGray,
        justifyContent: "center",
        alignItems: "center",
    },
    categoriesContainer: {
        paddingVertical: 10,
        backgroundColor: COLORS.white,
    },
    categoriesScrollView: {
        paddingHorizontal: 15,
    },
    categoryButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: COLORS.lightGray,
    },
    categoryButtonActive: {
        backgroundColor: COLORS.primary,
    },
    categoryButtonText: {
        fontSize: 14,
        fontWeight: "500",
        color: COLORS.textLight,
    },
    categoryButtonTextActive: {
        color: COLORS.white,
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
    featuredContainer: {
        marginTop: 15,
    },
    featuredScrollView: {
        paddingLeft: 20,
        paddingRight: 5,
    },
    featuredProductCard: {
        width: width * 0.7,
        marginRight: 15,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: "hidden",
    },
    featuredImagePlaceholder: {
        height: 180,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
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
    featuredProductInfo: {
        padding: 15,
    },
    productCategory: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: "600",
        marginBottom: 5,
    },
    featuredProductName: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 5,
    },
    featuredProductPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.accent,
        marginBottom: 8,
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
        width: (width - 50) / 2,
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
})

