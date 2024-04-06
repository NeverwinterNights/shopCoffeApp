import React, {useLayoutEffect} from 'react';
import {Button, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link, useNavigation, useRouter} from "expo-router";
import {useStore} from "../../../store/store";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {COLORS, SPACING} from "../../../theme/theme";
import {SafeAreaView} from "react-native-safe-area-context";
import {Header} from "../../../components/Header";
import {EmptyListAnimation} from "../../../components/EmptyListAnimation";
import {CartItem} from "../../../components/CartItem";
import {PaymentFooter} from "../../../components/PaymentFooter";


const Cart = () => {
    const navigation = useNavigation();

    const CartList = useStore((state) => state.CartList);
    const CartPrice = useStore((state) => state.CartPrice);
    const incrementCartItemQuantity = useStore(
        (state) => state.incrementCartItemQuantity,
    );
    const decrementCartItemQuantity = useStore(
        (state) => state.decrementCartItemQuantity,
    );
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const tabBarHeight = useBottomTabBarHeight();
    const {push} = useRouter()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'slide_from_bottom',
        });
    }, []);

    const buttonPressHandler = () => {
        push({ pathname: "/(aux)/payments", params: {amount: CartPrice} })
    };

    const incrementCartItemQuantityHandler = (id: string, size: string) => {
        incrementCartItemQuantity(id, size);
        calculateCartPrice();
    };

    const decrementCartItemQuantityHandler = (id: string, size: string) => {
        decrementCartItemQuantity(id, size);
        calculateCartPrice();
    };


    return (
        <SafeAreaView style={styles.screenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex}/>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewFlex}>
                <View
                    style={[styles.scrollViewInnerView, {marginBottom: tabBarHeight}]}>
                    <View style={styles.itemContainer}>
                        <Header title="Cart"/>
                        {CartList.length == 0 ? (
                            <EmptyListAnimation title={'Cart is Empty'}/>
                        ) : (
                            <View style={styles.listItemContainer}>
                                {CartList.map((data: any) => {
                                    // console.log ("data", data)
                                    return (
                                    <Link key={data.id} href={{
                                        pathname: "/(tabs)/(order)/order", params: {
                                            index: data.index,
                                            id: data.id,
                                            type: data.type,
                                        }
                                    }} asChild>
                                        <TouchableOpacity
                                            key={data.id}>
                                            <CartItem
                                                id={data.id}
                                                name={data.name}
                                                imagelink_square={data.imagelink_square}
                                                special_ingredient={data.special_ingredient}
                                                roasted={data.roasted}
                                                prices={data.prices}
                                                type={data.type}
                                                incrementCartItemQuantityHandler={
                                                    incrementCartItemQuantityHandler
                                                }
                                                decrementCartItemQuantityHandler={
                                                    decrementCartItemQuantityHandler
                                                }
                                            />
                                        </TouchableOpacity>
                                    </Link>
                                )})}
                            </View>
                        )}
                    </View>

                    {CartList.length != 0 ? (
                        <PaymentFooter
                            buttonPressHandler={buttonPressHandler}
                            buttonTitle="Pay"
                            price={{price: CartPrice.toString(), currency: '$'}}
                        />
                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    scrollViewFlex: {
        flexGrow: 1,
    },
    scrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemContainer: {
        flex: 1,
    },
    listItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
});

export default Cart
