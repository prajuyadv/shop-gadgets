import { Stack } from "expo-router";

export default  function RotLayout(){
return (
    <Stack>
        <Stack.Screen 
            name='(shop)'   
            options={{headerShown: false, title: 'Shop'}}
        />
         <Stack.Screen 
            name='categories'   
            options={{headerShown: false, title: 'Categories'}}
        />
         <Stack.Screen 
            name='product'   
            options={{headerShown: true, title: 'Product'}}
        />
         <Stack.Screen 
            name='cart'   
            options={{presentation: 'modal', title: 'Cart'}}
        />
         <Stack.Screen 
            name='auth'   
            options={{headerShown: true, title: 'Auth'}}
        />
    </Stack>
)
}