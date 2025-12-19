import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useCartStore } from "../store/cart-store";
import { createOrder, createOrderItem } from "../api/api";

type CartItemType = {
  id: number;
  title: string;
  heroImage: string;
  price: number;
  quantity: number;
  maxQuantity: number;
};

type CartItemProps = {
  item: CartItemType;
  onRemove: (id: number) => void;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
};

const CartItem = ({ item, onDecrement, onIncrement, onRemove }: CartItemProps) => {
  return (
    <View style={styles.cartItem}>
      <Image source={{uri:item.heroImage}} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onDecrement(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => onIncrement(item.id)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={styles.removeButton}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
 
    </View>
  );
};

export default function Cart() {
  const { items, removeItem, incrementItem, decrementItem, getTotalPrice, resetCart } = useCartStore();

  const {mutateAsync: createSupabaseOrder}= createOrder();
  const { mutateAsync: createSupabaseOrderItem } = createOrderItem();
  
  const handleCheckout = async () => {
    const totalPrice= parseFloat(getTotalPrice());

    try{
      await createSupabaseOrder (
        {totalPrice},
        {
          onSuccess: data => {
            createSupabaseOrderItem(
              items.map(item => ({
                orderId: data.id,
                productId: item.id,
                quantity: item.quantity,
              })),
              {
                onSuccess: () => {
                  alert('order created successfully');
                  resetCart()
                }
              }
            );
          },
        }
      );
    } catch(error) {
     console.log(error);
     alert('An error occurred while creating the order');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      {/* FlatList */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={removeItem}
            onIncrement={incrementItem}
            onDecrement={decrementItem}
          />
        )}
        contentContainerStyle={styles.cartList}
        ListEmptyComponent={<Text style={styles.emptyCartText}>Your cart is empty</Text>}
      />

      {/* Footer */}
      {items.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
          <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  cartList: {
    paddingVertical: 16,
  },
  emptyCartText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#555",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: "#888",
    marginBottom: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#ff5252",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
