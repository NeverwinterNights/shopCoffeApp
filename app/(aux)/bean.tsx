import React, {useLayoutEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import {Store, useStore} from "../../store/store";
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from "../../theme/theme";
import {ImageBackgroundInfo} from "../../components/ImageBackgroundInfo";
import {CoffeeDataItemType} from "../../data/CoffeeData";
import {PaymentFooter} from "../../components/PaymentFooter";
import {SafeAreaView} from "react-native-safe-area-context";


const Bean = () => {
    const navigation = useNavigation();
    const [addToFavoriteList, deleteFromFavoriteList, addToCart, calculateCartPrice] = useStore((state) => [state.addToFavoriteList, state.deleteFromFavoriteList, state.addToCart, state.calculateCartPrice]);
    const [fullDesc, setFullDesc] = useState(false);
    const {push} = useRouter()
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            animation: 'slide_from_bottom',
        });
    }, []);

    const {id, index, type} = useLocalSearchParams()


    // const itemOfIndex = useMainDataStore((state) =>
    const itemOfIndex = useStore((state) =>
        type == 'Coffee' ? state.CoffeeList : state.BeanList)[index as any];

    const [price, setPrice] = useState(itemOfIndex.prices[0]);

    const backHandler = () => {
        navigation.goBack();
    };
    const toggleFavourite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    };

    const addToCartHandler = ({
                                  id,
                                  index,
                                  name,
                                  roasted,
                                  imagelink_square,
                                  special_ingredient,
                                  type,
                                  price,
                              }: any) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices: [{...price, quantity: 1}],
        });
        calculateCartPrice();
        push('/cart');
    };

    return (
        <SafeAreaView style={styles.container}  edges={['bottom']}>
            <StatusBar barStyle={"light-content"} backgroundColor={COLORS.primaryBlackHex}/>
            <ScrollView showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewFlex}
            >
                <ImageBackgroundInfo backHandler={backHandler}
                                     toggleFavourite={toggleFavourite}
                                     special_ingredient={itemOfIndex.special_ingredient}
                                     roasted={itemOfIndex.roasted}
                                     ratings_count={itemOfIndex.ratings_count}
                                     ingredients={itemOfIndex.ingredients}
                                     imagelink_portrait={itemOfIndex.imagelink_portrait}
                                     enableBackHandler={true}
                                     favourite={itemOfIndex.favourite}
                                     name={itemOfIndex.name}
                                     type={itemOfIndex.type}
                                     id={itemOfIndex.id}
                                     average_rating={itemOfIndex.average_rating}/>
                <View style={styles.footerInfoArea}>
                    <Text style={styles.infoTitle}>Description</Text>
                    {fullDesc ? (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc(prev => !prev);
                            }}>
                            <Text style={styles.descriptionText}>
                                {itemOfIndex.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc(prev => !prev);
                            }}>
                            <Text numberOfLines={3} style={styles.descriptionText}>
                                {itemOfIndex.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    )}
                    <Text style={styles.infoTitle}>Size</Text>
                    <View style={styles.sizeOuterContainer}>
                        {itemOfIndex.prices.map((data: CoffeeDataItemType["prices"][0]) => (
                            <TouchableOpacity
                                key={data.size}
                                onPress={() => {
                                    setPrice(data);
                                }}
                                style={[
                                    styles.sizeBox,
                                    {
                                        borderColor:
                                            data.size == price.size
                                                ? COLORS.primaryOrangeHex
                                                : COLORS.primaryDarkGreyHex,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.sizeText,
                                        {
                                            fontSize:
                                                itemOfIndex.type == 'Bean'
                                                    ? FONTSIZE.size_14
                                                    : FONTSIZE.size_16,
                                            color:
                                                data.size == price.size
                                                    ? COLORS.primaryOrangeHex
                                                    : COLORS.secondaryLightGreyHex,
                                        },
                                    ]}>
                                    {data.size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <PaymentFooter price={price}
                               buttonTitle="Add to Cart"
                               buttonPressHandler={() => {
                                   addToCartHandler({
                                       id: itemOfIndex.id,
                                       index: itemOfIndex.index,
                                       name: itemOfIndex.name,
                                       roasted: itemOfIndex.roasted,
                                       imagelink_square: itemOfIndex.imagelink_square,
                                       special_ingredient: itemOfIndex.special_ingredient,
                                       type: itemOfIndex.type,
                                       price: price,
                                   })
                               }}/>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    scrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    footerInfoArea: {
        padding: SPACING.space_20,
    },
    infoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_10,
    },
    descriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_30,
    },
    sizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
    },
    sizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_24 * 2,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
    },
    sizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
    },
});

export default Bean
