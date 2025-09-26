import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { CATEGORIES } from "../../assets/categories";

const ListHeader = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Top Section */}
      <View style={styles.headerTop}>
        {/* Left side: Avatar + Greeting */}
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              style={styles.avatarImageContainer}
            />
            <Text style={styles.avatarText}>Hello codewithHari</Text>
          </View>
        </View>

        {/* Right side: Shopping cart and Sign-out */}
        <View style={styles.headerRight}>
          {/* Cart */}
          <Link style={styles.cartContainer} href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>1</Text>
                  </View>
                </View>
              )}
            </Pressable>
          </Link>

          {/* Sign-out */}
          <TouchableOpacity style={styles.signOutButton}>
            <FontAwesome name="sign-out" size={25} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image
          source={require("../../assets/images/hero.png")}
          style={styles.heroImage}
        />
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={CATEGORIES}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.slug}`}>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={(item) => item.slug}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
    padding: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  heroContainer: {
    paddingTop: 20,
  },
  categoriesContainer: {
    paddingTop: 20,
  },
  avatarImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "600",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartContainer: {
    position: "relative",
  },
  badgeContainer: {
    position: "absolute",
    right: 8,
    top: -4,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  signOutButton: {
    marginLeft: 15,
  },
  heroImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
