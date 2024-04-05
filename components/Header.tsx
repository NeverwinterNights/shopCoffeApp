import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from "../theme/theme";
import GradientBGIcon from "./GradientBGIcon";
import ProfilePic from "./ProfilePic";

type HeaderPropsType = {
    title?: string;
}

export const Header = ({title}: HeaderPropsType) => {
    return (
        <View style={styles.container}>
            <GradientBGIcon name="menu"
                            color={COLORS.primaryLightGreyHex}
                            size={FONTSIZE.size_16}/>
            <Text style={styles.text}>{title}</Text>
            <ProfilePic/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.space_30,
        paddingTop:5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
    },
});
