import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from "../theme/theme";
import {images} from "../helper/image"

type Price = {
    price: string;
    currency: string;
}

type Props = {
    price: Price;
    buttonPressHandler: any;
    buttonTitle: string;
}

export const PaymentFooter = ({price, buttonPressHandler, buttonTitle}:Props) => {
 return (
       <View style={styles.priceFooter}>
           <View style={styles.priceContainer}>
               <Text style={styles.priceTitle}>Price</Text>
               <Text style={styles.priceText}>
                   {price.currency} <Text style={styles.price}>{price.price}</Text>
               </Text>
           </View>
           <TouchableOpacity
               style={styles.payButton}
               onPress={() => buttonPressHandler()}>
               <Text style={styles.buttonText}>{buttonTitle}</Text>
           </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    priceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_20,
        padding: SPACING.space_20,
    },
    priceContainer: {
        alignItems: 'center',
        width: 100,
    },
    priceTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.secondaryLightGreyHex,
    },
    priceText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex,
    },
    price: {
        color: COLORS.primaryWhiteHex,
    },
    payButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: BORDERRADIUS.radius_20,
    },
    buttonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
});
