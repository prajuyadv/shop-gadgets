import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { useCartStore } from "../../store/cart-store";
import { getProduct } from "../../api/api";


const ProductDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const toast = useToast();

  const {data: product, error, isLoading } = getProduct(slug);




  const { items, addItem, incrementItem, decrementItem } = useCartStore();
  const cartItem = items.find((item) => item.id === product?.id);

  const initialQuantity = cartItem ? cartItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

   if(isLoading) return <ActivityIndicator />;
   if(error) return <Text>Error: {error.message}</Text>
  if (!product) return <Redirect href="/404" />;


  const increaseQuantity = () => {
    if (quantity < product.maxQuantity) {
      setQuantity((prev) => prev + 1);
      incrementItem(product.id);
    } else {
      toast.show(" Cannot add more than maximun quantity", {
        type: "warning",
        placement: "top",
        duration: 1500,
      });
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      decrementItem(product.id);
    }
  };

  const addToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      heroImage: product.heroImage,
      price: product.price,
      quantity,
      maxQuantity: product.maxQuantity,
    });
    toast.show("Added to cart", {
      type: "success",
      placement: "top",
      duration: 1500,
    });
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.title }} />
      <Image source={{uri:product.heroImage}} style={styles.heroImage} />
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.slug}>{product.slug}</Text>
      </View>

      <FlatList
        data={product.imagesUrl}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Image source={{uri: item}} style={styles.image} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imagesContainer}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={increaseQuantity}
          disabled={quantity >= product.maxQuantity}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            {
              opacity: quantity === 0 ? 0.5 : 1,
            },
          ]}
          onPress={addToCart}
          disabled={quantity == 0}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  heroImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 8,
  },
  slug: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  price: {
    fontWeight: "bold",
    color: "#000",
  },
  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 15,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  errorMessage: {
    fontSize: 18,
    color: "#f00",
    textAlign: "center",
    marginTop: 20,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
});
