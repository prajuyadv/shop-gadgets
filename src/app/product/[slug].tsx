import { StyleSheet, Text, View ,Image} from 'react-native'
import React,{useState} from 'react'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { PRODUCTS } from '../../../assets/products';
import { useToast } from 'react-native-toast-notifications';
import { useCartStore } from '../../store/cart-store';

const ProductDetails = () => {
    const { slug } = useLocalSearchParams<{ slug : string }> ();
    const toast = useToast();

    const product = PRODUCTS.find((product) => product.slug === slug );

    if(!product) return <Redirect href='/404'/>

    const { items, addItem, incrementItem, decrementItem} = useCartStore();

    const cartItem = items.find(item => item.id === product.id);

    const initialQuantity = cartItem ? cartItem.quantity : 1;

    const [quantity, setQuantity] = useState(initialQuantity);

    const increaseQuantity = () =>{};
    const decreaseQuantity = () => { };
    const addToCart=() =>{}
  return (
    <View style={styles.container}>
        <Stack.Screen  options={{title: product.title}}/>
        <Image  source={product.heroImage} style={styles.heroImage}/>
        <View style={{padding:16, flex:1}}>

            <Text>{product.title}</Text>
            <Text>{product.slug}</Text>
        </View>
    </View>
  )
}

export default ProductDetails;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFF',
    },
    heroImage: {
        width: '100%',
        height: 250,
        resizeMode:'cover',
    },
    title: {
        fontSize: 24,
        fontWeight:'bold',
        marginVertical:8,
    },
    slug: {
        fontSize: 18,
        color:'#555',
        marginBottom: 16,
    },
    priceContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:16,
    },
    price: {
        fontWeight:'bold',
        color: '#000',
    },
})