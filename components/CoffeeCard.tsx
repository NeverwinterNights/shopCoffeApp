import React from 'react';
import {
    Dimensions,
    ImageBackground,
    ImageBackgroundProps,
    ImageProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from "../theme/theme";
import CustomIcon from "./CustomIcon";
import BGIcon from "./BGIcon";
import {images} from "../helper/image"
type Props = {
    id: string;
    index: number;
    type: string;
    roasted: string;
    // imageLink: ImageProps;
    imageLink: keyof typeof images;
    name: string;
    special_ingredient: string;
    average_rating: number;
    price: any;
    buttonPressHandler: any;
}

const CARD = Dimensions.get('window').width * 0.32;




export const CoffeeCard = ({
                               name,
                               special_ingredient,
                               average_rating,
                               price,
                               buttonPressHandler,
                               imageLink,
                               type,
                               roasted,
                               index,
                               id
                           }: Props) => {
    return (
        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.cardLinearGradientContainer}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
            <ImageBackground
               source={images[imageLink]}
                style={styles.cardImageBG}
                resizeMode="cover">
                <View style={styles.cardRatingContainer}>
                    <CustomIcon
                        name={'star'}
                        color={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_16}
                    />
                    <Text style={styles.cardRatingText}>{average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardSubtitle}>{special_ingredient}</Text>
            <View style={styles.cardFooterRow}>
                <Text style={styles.cardPriceCurrency}>
                    $ <Text style={styles.cardPrice}>{price.price}</Text>
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        buttonPressHandler({
                            id,
                            index,
                            type,
                            roasted,
                            imageLink,
                            name,
                            special_ingredient,
                            prices: [{...price, quantity: 1}],
                        });
                    }}>
                    <BGIcon
                        color={COLORS.primaryWhiteHex}
                        name={'add'}
                        BGColor={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    cardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
    },
    cardImageBG: {
        width: CARD,
        height: CARD,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    cardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    cardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    cardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    cardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },
    cardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    cardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    cardPrice: {
        color: COLORS.primaryWhiteHex,
    },
});
