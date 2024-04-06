import React, {useRef, useState} from 'react';
import {
    Dimensions,
    FlatList,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {useStore} from "../../../store/store";
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from "../../../theme/theme";
import {Header} from "../../../components/Header";
import {SafeAreaView} from "react-native-safe-area-context";
import CustomIcon from "../../../components/CustomIcon";
import {CoffeeCard} from "../../../components/CoffeeCard";
import {Link} from "expo-router";
import Toast from 'react-native-root-toast'

const getCategoriesFromData = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        } else {
            temp[data[i].name]++;
        }
    }
    let categories = Object.keys(temp);
    categories.unshift('All');
    return categories;
};

const getCoffeeList = (category: string, data: any) => {
    if (category == 'All') {
        return data;
    } else {
        let coffeelist = data.filter((item: any) => item.name == category);
        return coffeelist;
    }
};


const Index = () => {
    const coffeeList = useStore((state) => state.CoffeeList)
    const beanList = useStore((state) => state.BeanList);
    const [categories, setCategories] = useState(getCategoriesFromData(coffeeList));
    const [searchText, setSearchText] = useState('');
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    });
    const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, coffeeList));
    const tabBarHeight = useBottomTabBarHeight();
    const ListRef: any = useRef<FlatList>();
    const addToCart = useStore((state) => state.addToCart);
    const calculateCartPrice = useStore((state) => state.calculateCartPrice);
    const searchCoffee = (search: string) => {
        if (search != '') {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({index: 0, category: categories[0]});
            setSortedCoffee([
                ...coffeeList.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };

    const resetSearchCoffee = () => {
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setCategoryIndex({index: 0, category: categories[0]});
        setSortedCoffee([...coffeeList]);
        setSearchText('');
    };


    const CoffeeCardAddToCart = ({
                                     id,
                                     index,
                                     name,
                                     roasted,
                                     imageLink:imagelink_square,
                                     special_ingredient,
                                     type,
                                     prices,
                                 }: any) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            type,
            prices,
        });
        calculateCartPrice();
       Toast.show(`${name} is Added to Cart`, {
            duration: Toast.durations.LONG,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={COLORS.primaryBlackHex}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll}>

                {/* Header */}

                <Header/>
                <Text style={styles.screenTitle}>
                    Find the best{'\n'}coffee for you
                </Text>

                {/* Input search */}

                <View style={styles.inputContainerComponent}>
                    <TouchableOpacity style={styles.categoryScrollViewItem}
                    >
                        <CustomIcon
                            style={styles.inputIcon}
                            name="search"
                            size={FONTSIZE.size_18}
                            color={
                                searchText.length > 0
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryLightGreyHex
                            }
                        />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Find Your Coffee..."
                        value={searchText}
                        onChangeText={text => {
                            setSearchText(text);
                            searchCoffee(text);
                        }}
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        style={styles.textInputContainer}
                    />
                    {searchText.length > 0 ? (
                        <TouchableOpacity
                            onPress={() => {
                                resetSearchCoffee();
                            }}>
                            <CustomIcon
                                style={styles.inputIcon}
                                name="close"
                                size={FONTSIZE.size_16}
                                color={COLORS.primaryLightGreyHex}
                            />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>

                {/* Scroller Category */}

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryScrollViewStyle}
                >
                    {categories.map((data, index) => (
                        <View key={index.toString()} style={styles.categoryScrollViewContainer}>
                            <TouchableOpacity
                                style={styles.categoryScrollViewItem}
                                onPress={() => {
                                    ListRef?.current?.scrollToOffset({
                                        animated: true,
                                        offset: 0,
                                    });
                                    setCategoryIndex({index: index, category: categories[index]});
                                    setSortedCoffee([
                                        ...getCoffeeList(categories[index], coffeeList),
                                    ])
                                }}>
                                <Text style={[
                                    styles.categoryText,
                                    categoryIndex.index == index
                                        ? {color: COLORS.primaryOrangeHex}
                                        : {},
                                ]}>{data}</Text>
                                {categoryIndex.index == index ? (
                                    <View style={styles.activeCategory}/>
                                ) : (
                                    <></>
                                )}
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                {/* Coffee Flatlist */}

                <FlatList horizontal
                          ref={ListRef}
                          showsHorizontalScrollIndicator={false}
                          data={sortedCoffee}
                          keyExtractor={item => item.id}
                          ListEmptyComponent={
                              <View style={styles.emptyListContainer}>
                                  <Text style={styles.categoryText}>No Coffee Available</Text>
                              </View>
                          }
                          contentContainerStyle={styles.flatListContainer}
                          renderItem={({item}) => {
                              return (
                                  <Link href={{
                                      pathname: "/(aux)/bean", params: {
                                          index: item.index,
                                          id: item.id,
                                          type: item.type,
                                      }
                                  }} asChild>
                                      <TouchableOpacity>
                                          <CoffeeCard
                                              id={item.id}
                                              index={item.index}
                                              type={item.type}
                                              roasted={item.roasted}
                                              imageLink={item.imagelink_square}
                                              name={item.name}
                                              special_ingredient={item.special_ingredient}
                                              average_rating={item.average_rating}
                                              price={item.prices[2]}
                                              // buttonPressHandler={CoffeCardAddToCart}
                                              buttonPressHandler={CoffeeCardAddToCart}
                                          />
                                      </TouchableOpacity>
                                  </Link>
                              );
                          }}/>
                {/* Beams Flatlist */}
                <Text style={styles.coffeeBeansTitle}>Coffee Beans</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={beanList}
                    contentContainerStyle={[
                        styles.flatListContainer,
                        {marginBottom: tabBarHeight},
                    ]}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => {
                        return (
                            <Link href={{
                                pathname: "/(aux)/bean", params: {
                                    index: item.index,
                                    id: item.id,
                                    type: item.type,
                                }
                            }} asChild>
                                <TouchableOpacity>
                                    <CoffeeCard
                                        id={item.id}
                                        index={item.index}
                                        type={item.type}
                                        roasted={item.roasted}
                                        imageLink={item.imagelink_square as any}
                                        name={item.name}
                                        special_ingredient={item.special_ingredient}
                                        average_rating={item.average_rating}
                                        price={item.prices[2]}
                                        // buttonPressHandler={CoffeCardAddToCart}
                                        buttonPressHandler={CoffeeCardAddToCart}
                                    />
                                </TouchableOpacity>
                            </Link>
                        );
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    scroll: {
        flexGrow: 1,
    },
    screenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
    inputContainerComponent: {
        flexDirection: 'row',
        margin: SPACING.space_30,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
    },
    inputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    textInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    categoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    activeCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    categoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    categoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    categoryScrollViewItem: {
        alignItems: 'center',
    },
    flatListContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    emptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
    coffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
});

export default Index
