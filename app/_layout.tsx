import FontAwesome from '@expo/vector-icons/FontAwesome';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';
import {RootSiblingParent} from "react-native-root-siblings";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '/(tabs)/(home)/home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        PoppinsRegular: require('../assets/fonts/Poppins-Regular.ttf'),
        PoppinsBlack: require('../assets/fonts/Poppins-Black.ttf'),
        PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
        PoppinsExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
        PoppinsExtraLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
        PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
        PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
        PoppinsSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
        PoppinsSemiThin: require('../assets/fonts/Poppins-Thin.ttf'),
        IcoMoon: require('../assets/fonts/app_icons.ttf'),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

function RootLayoutNav() {

    return (
        <RootSiblingParent>
            <Stack>
                <Stack.Screen name={"(tabs)"} options={{headerShown: false}}/>
            </Stack>
        </RootSiblingParent>
    );
}
