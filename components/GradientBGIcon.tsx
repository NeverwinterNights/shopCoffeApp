import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';
import {LinearGradient} from "expo-linear-gradient";

type Props = {
    name: string;
    color: string;
    size: number;
}

const GradientBGIcon = ({name, color, size}: Props) => {
    return (
        <View style={styles.container}>
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                style={styles.linearGradientBG}>
                <CustomIcon name={name} color={color} size={size}/>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: 'hidden',
    },
    linearGradientBG: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GradientBGIcon;
