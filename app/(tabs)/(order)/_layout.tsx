import React from 'react';
import {Stack} from "expo-router";


const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name={"order"} options={{title: "Order"}}/>
        </Stack>
    );
};

export default Layout