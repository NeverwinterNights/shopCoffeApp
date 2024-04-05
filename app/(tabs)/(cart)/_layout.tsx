import React from 'react';
import {Stack} from "expo-router";


const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name={"cart"} options={{title: "Cart",  }}/>
        </Stack>
    );
};

export default Layout