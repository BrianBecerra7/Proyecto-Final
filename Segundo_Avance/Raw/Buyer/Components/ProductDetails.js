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

export default function ProductDetails({ route, navigation }) {

    const { product } = route.params


    const [productDetails, setProductDetails] = useState({
        ...product,
        description:
            "Este es un producto empresarial de alta calidad diseñado para satisfacer las necesidades de su empresa. Fabricado con materiales duraderos y tecnología de vanguardia, este producto ofrece un rendimiento excepcional y una larga vida útil.",
        features: [
            "Característica 1: Alta durabilidad",
            "Característica 2: Eficiencia energética",
            "Característica 3: Fácil integración",
            "Característica 4: Soporte técnico incluido",
            "Característica 5: Garantía extendida",
        ],
        specifications: {
            Dimensiones: "30 x 20 x 10 cm",
            Peso: "1.5 kg",
            Material: "Aluminio y polímeros de alta resistencia",
            Garantía: "2 años",
            Origen: "Importado",
        },
        stock: 15,
        seller: {
            name: "Empresa Proveedora S.A.",
            rating: 4.7,
            verified: true,
        },
    })

    
    const [quantity, setQuantity] = useState(1)

    const renderStars = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const halfStar = rating - fullStars >= 0.5

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Ionicons key={i} name="star" size={16} color={COLORS.primary} />)
            } else if (i === fullStars && halfStar) {
                stars.push(<Ionicons key={i} name="star-half" size={16} color={COLORS.primary} />)
            } else {
                stars.push(<Ionicons key={i} name="star-outline" size={16} color={COLORS.primary} />)
            }
        }

        return (
            <View style={styles.ratingContainer}>
                {stars}
                <Text style={styles.ratingText}>{rating}</Text>
            </View>
        )
    }

    const incrementQuantity = () => {
        if (quantity < productDetails.stock) {
            setQuantity(quantity + 1)
        }
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const addToCart = () => {
        alert(`Agregado al carrito: ${quantity} unidades de ${productDetails.name}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalles del Producto</Text>
                <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageContainer}>
                    <View style={styles.productImagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>Imagen del Producto</Text>
                        <Text style={styles.imagePlaceholderText}>400 x 300</Text>
                    </View>

                    
                    <View style={styles.stockIndicator}>
                        <Text style={styles.stockText}>
                            {productDetails.stock > 0 ? `${productDetails.stock} disponibles` : "Agotado"}
                        </Text>
                    </View>
                </View>

                
                <View style={styles.productInfoContainer}>
                    <Text style={styles.productCategory}>{productDetails.category}</Text>
                    <Text style={styles.productName}>{productDetails.name}</Text>
                    <View style={styles.priceRatingRow}>
                        <Text style={styles.productPrice}>{productDetails.price}</Text>
                        {renderStars(productDetails.rating)}
                    </View>

                    
                    <View style={styles.sellerContainer}>
                        <Text style={styles.sellerLabel}>Vendedor:</Text>
                        <View style={styles.sellerInfo}>
                            <Text style={styles.sellerName}>{productDetails.seller.name}</Text>
                            {productDetails.seller.verified && (
                                <View style={styles.verifiedBadge}>
                                    <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
                                    <Text style={styles.verifiedText}>Verificado</Text>
                                </View>
                            )}
                        </View>
                    </View>

                  
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Descripción</Text>
                        <Text style={styles.descriptionText}>{productDetails.description}</Text>
                    </View>

                   
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Características</Text>
                        {productDetails.features.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <Ionicons name="checkmark-circle" size={18} color={COLORS.primary} />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>

                    
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Especificaciones</Text>
                        {Object.entries(productDetails.specifications).map(([key, value], index) => (
                            <View key={index} style={styles.specificationItem}>
                                <Text style={styles.specificationKey}>{key}:</Text>
                                <Text style={styles.specificationValue}>{value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            
            <View style={styles.footer}>
                <View style={styles.quantitySelector}>
                    <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity} disabled={quantity <= 1}>
                        <Ionicons name="remove" size={20} color={quantity <= 1 ? COLORS.gray : COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={incrementQuantity}
                        disabled={quantity >= productDetails.stock}
                    >
                        <Ionicons name="add" size={20} color={quantity >= productDetails.stock ? COLORS.gray : COLORS.text} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                    <Ionicons name="cart-outline" size={20} color={COLORS.white} />
                    <Text style={styles.addToCartText}>Agregar al Carrito</Text>
                </TouchableOpacity>
            </View>
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
    },
    favoriteButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: "100%",
        height: 300,
        position: "relative",
    },
    productImagePlaceholder: {
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePlaceholderText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "500",
    },
    stockIndicator: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    stockText: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: "500",
    },
    productInfoContainer: {
        padding: 20,
    },
    productCategory: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: "600",
        marginBottom: 5,
    },
    productName: {
        fontSize: 22,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 10,
    },
    priceRatingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.accent,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 14,
        color: COLORS.textLight,
    },
    sellerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightGray,
    },
    sellerLabel: {
        fontSize: 14,
        color: COLORS.textLight,
        marginRight: 5,
    },
    sellerInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    sellerName: {
        fontSize: 14,
        fontWeight: "500",
        color: COLORS.text,
        marginRight: 8,
    },
    verifiedBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    verifiedText: {
        fontSize: 10,
        color: COLORS.white,
        marginLeft: 2,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.text,
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 22,
        color: COLORS.textLight,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    featureText: {
        fontSize: 14,
        color: COLORS.text,
        marginLeft: 10,
    },
    specificationItem: {
        flexDirection: "row",
        marginBottom: 8,
    },
    specificationKey: {
        fontSize: 14,
        fontWeight: "500",
        color: COLORS.text,
        width: "40%",
    },
    specificationValue: {
        fontSize: 14,
        color: COLORS.textLight,
        width: "60%",
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        backgroundColor: COLORS.white,
    },
    quantitySelector: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: 8,
        marginRight: 15,
    },
    quantityButton: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },
    quantityText: {
        fontSize: 16,
        fontWeight: "500",
        color: COLORS.text,
        paddingHorizontal: 10,
    },
    addToCartButton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        borderRadius: 8,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.white,
        marginLeft: 8,
    },
})

