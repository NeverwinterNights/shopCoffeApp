import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Link} from "expo-router";
import {useStore} from "../../../store/store";


const Cart = () => {
    const CartList = useStore((state) =>  state.CartList);
    return (
        <View style={styles.container}>
            <Text>Cart</Text>
            <Link href={{pathname: "/(aux)/payments", params:{ prevScreen: 'Payments' }}} asChild>
                <Button title={"To Payments"}/>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export default Cart
