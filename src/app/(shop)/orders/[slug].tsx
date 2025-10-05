import { Redirect, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { ORDERS } from '../../../../assets/orders';

const OrderDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const order = ORDERS.find((order) => order.slug === slug);

  if (!order) return <Redirect href="/404" />;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: order.item }} />

      {/* Order Basic Info */}
      <Text style={styles.item}>{order.item}</Text>
      <Text style={styles.details}>{order.details}</Text>

      {/* Order Status */}
      <View style={[styles.statusBadge, styles[`statusBadge_${order.status}`]]}>
        <Text style={styles.statusText}>{order.status}</Text>
      </View>

      <Text style={styles.date}>{order.date}</Text>

      {/* Order Items */}
      <Text style={styles.itemsTitle}>Items Ordered:</Text>

      <FlatList
        data={order.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={item.heroImage} style={styles.heroImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={{ marginTop: 8 }}
      />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
    marginBottom: 16,
  },
  statusBadge: {
    padding: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusBadge_Pending: {
    backgroundColor: 'orange',
  },
  statusBadge_Completed: {
    backgroundColor: 'green',
  },
  statusBadge_Shipped: {
    backgroundColor: 'blue',
  },
  statusBadge_InTransit: {
    backgroundColor: 'purple',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  heroImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
});
