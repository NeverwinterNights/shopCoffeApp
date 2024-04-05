import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';
import {StyleSheet} from 'react-native';
import React from "react";
import {COLORS} from "../../theme/theme";
import {BlurView} from "expo-blur";
import CustomIcon from "../../components/CustomIcon";


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{marginBottom: -3}} {...props} />;
}

export default function TabLayout() {

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: styles.tabBarStyle,
            tabBarBackground: () => (
                <BlurView
                    intensity={15}
                    style={styles.BlurViewStyles}
                />
            ),
        }}>
            <Tabs.Screen name={"(home)"}     options={{
                tabBarIcon: ({focused}) => (
                    <CustomIcon
                        name="home"
                        size={25}
                        color={
                            focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                        }
                    />
                ),
            }}/>
            <Tabs.Screen name={"(cart)"}  options={{
                tabBarIcon: ({focused}) => (
                    <CustomIcon
                        name="cart"
                        size={25}
                        color={
                            focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                        }
                    />
                ),
            }}/>
            <Tabs.Screen name={"(favorites)"} options={{
                tabBarIcon: ({focused}) => (
                    <CustomIcon
                        name="like"
                        size={25}
                        color={
                            focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                        }
                    />
                ),
            }}/>
            <Tabs.Screen name={"(order)"} options={{
                tabBarIcon: ({focused}) => (
                    <CustomIcon
                        name="bell"
                        size={25}
                        color={
                            focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                        }
                    />
                ),
            }}/>

        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
