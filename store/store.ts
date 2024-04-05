import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage, devtools} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData, {CoffeeDataItemType} from '../data/CoffeeData';
import BeansData, {BeansDataItemType} from '../data/BeansData';

export type Store = {
    CoffeeList: CoffeeDataItemType[],
    BeanList: BeansDataItemType[],
    CartPrice: number,
    FavoritesList: [],
    CartList: [],
    OrderHistoryList: [],
    addToCart:(cartItem: any)=> void
    calculateCartPrice:()=> void
    addToFavoriteList: (type: string, id: string) => void
    deleteFromFavoriteList: (type: string, id: string) => void
}

export type StoreMainData = {
    CoffeeList: CoffeeDataItemType[],
    BeanList: BeansDataItemType[],
}
export const useStore = create<Store>()(
    devtools(
        persist(
            (set, get) => ({
                CoffeeList: CoffeeData,
                BeanList: BeansData,
                CartPrice: 0,
                FavoritesList: [],
                CartList: [],
                OrderHistoryList: [],
                addToCart: (cartItem: any) =>
                    set(
                        produce(state => {
                            let found = false;
                            for (let i = 0; i < state.CartList.length; i++) {
                                if (state.CartList[i].id == cartItem.id) {
                                    found = true;
                                    let size = false;
                                    for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                        if (
                                            state.CartList[i].prices[j].size == cartItem.prices[0].size
                                        ) {
                                            size = true;
                                            state.CartList[i].prices[j].quantity++;
                                            break;
                                        }
                                    }
                                    if (!size) {
                                        state.CartList[i].prices.push(cartItem.prices[0]);
                                    }
                                    state.CartList[i].prices.sort((a: any, b: any) => {
                                        if (a.size > b.size) {
                                            return -1;
                                        }
                                        if (a.size < b.size) {
                                            return 1;
                                        }
                                        return 0;
                                    });
                                    break;
                                }
                            }
                            if (!found) {
                                state.CartList.push(cartItem);
                            }
                        }),
                    ),
                calculateCartPrice: () =>
                    set(
                        produce(state => {
                            let totalPrice = 0;
                            for (let i = 0; i < state.CartList.length; i++) {
                                let tempPrice = 0;
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    tempPrice =
                                        tempPrice +
                                        parseFloat(state.CartList[i].prices[j].price) *
                                        state.CartList[i].prices[j].quantity;
                                }
                                state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
                                totalPrice = totalPrice + tempPrice;
                            }
                            state.CartPrice = totalPrice.toFixed(2).toString();
                        }),
                    ),
                addToFavoriteList: (type: string, id: string) =>
                    set(
                        produce(state => {
                            if (type == 'Coffee') {
                                for (let i = 0; i < state.CoffeeList.length; i++) {

                                    if (state.CoffeeList[i].id == id) {


                                        if (state.CoffeeList[i].favourite == false) {
                                            state.CoffeeList[i].favourite = true;
                                            state.FavoritesList.unshift(state.CoffeeList[i]);
                                        } else {
                                            state.CoffeeList[i].favourite = false;
                                        }
                                        break;
                                    }
                                }
                            } else if (type == 'Bean') {
                                for (let i = 0; i < state.BeanList.length; i++) {
                                    if (state.BeanList[i].id == id) {
                                        if (state.BeanList[i].favourite == false) {
                                            state.BeanList[i].favourite = true;
                                            state.FavoritesList.unshift(state.BeanList[i]);
                                        } else {
                                            state.BeanList[i].favourite = false;
                                        }
                                        break;
                                    }
                                }
                            }
                        }),
                    ),
                deleteFromFavoriteList: (type: string, id: string) =>
                    set(
                        produce(state => {
                            if (type == 'Coffee') {
                                for (let i = 0; i < state.CoffeeList.length; i++) {
                                    if (state.CoffeeList[i].id == id) {
                                        state.CoffeeList[i].favourite = state.CoffeeList[i].favourite != true;
                                        break;
                                    }
                                }
                            } else if (type == 'Beans') {
                                for (let i = 0; i < state.BeanList.length; i++) {
                                    if (state.BeanList[i].id == id) {
                                        state.BeanList[i].favourite = state.BeanList[i].favourite != true;
                                        break;
                                    }
                                }
                            }
                            let spliceIndex = -1;
                            for (let i = 0; i < state.FavoritesList.length; i++) {
                                if (state.FavoritesList[i].id == id) {
                                    spliceIndex = i;
                                    break;
                                }
                            }
                            state.FavoritesList.splice(spliceIndex, 1);
                        }),
                    ),
            }),
            {
                name: 'coffee-app',
                storage: createJSONStorage(() => AsyncStorage),
            },
        ))
)

// export const useMainDataStore = create<StoreMainData>(
//     (set, get) => ({
//         CoffeeList: CoffeeData,
//         BeanList: BeansData,
//     }),
// )