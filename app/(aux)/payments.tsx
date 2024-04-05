import React, {useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useLocalSearchParams, useNavigation} from "expo-router";


const Payments = () => {
    const navigation = useNavigation();
    const {prevScreen} = useLocalSearchParams<{ prevScreen: string }>()
    useLayoutEffect(() => {
        navigation.setOptions({
            animation: 'slide_from_bottom',
            headerTitle: 'Payments',
            headerBackTitle: prevScreen
            // headerBackTitleVisible: true
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Payments</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export default Payments
