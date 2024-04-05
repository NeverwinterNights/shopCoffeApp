import React from 'react';
import {Stack} from "expo-router";


const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name={"favorites"} options={{title: "Favorites"}}/>
        </Stack>
    );
};

export default Layout