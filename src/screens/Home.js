import React, { useContext, Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button, AsyncStorage, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    addItem
} from "../Store/Action";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            lastTitle: "",
            lastDescription: "",
            data: [],
            searchData: []
        }
    }

    addItemList = () => {
        this.props.navigation.navigate('Detail');
    }

    componentDidMount = async () => {
        let arrayList = this.props.reducer.listData;
        let asyncArray = await AsyncStorage.getItem('arrayList');
        asyncArray = JSON.parse(asyncArray);
        console.log("=== async value", asyncArray)
        if (!asyncArray) {
            if (arrayList) {
                this.setState({
                    itemList: arrayList,
                    data: arrayList,
                    lastTitle: arrayList[arrayList.length - 1].title,
                    lastDescription: arrayList[arrayList.length - 1].description
                }, async () => {
                    await AsyncStorage.setItem('arrayList', JSON.stringify(arrayList));
                })

            }
        }
        else {
            this.setState({
                itemList: asyncArray,
                data: asyncArray,
                lastTitle: asyncArray[asyncArray.length - 1].title,
                lastDescription: asyncArray[asyncArray.length - 1].description
            })
        }
    }


    componentDidUpdate = async (prevProps, prevState) => {
        const title = this.props.navigation.getParam('title');
        const description = this.props.navigation.getParam('description');
        const arrayList = this.props.reducer.listData;
        let asyncArray = await AsyncStorage.getItem('arrayList');
        asyncArray = JSON.parse(asyncArray);
        if (title !== this.state.lastTitle && title != "" && title !== undefined && title !== null) {
            this.setState({
                lastTitle: title,
                lastDescription: description,
                itemList: asyncArray,
                data: asyncArray
            });


            asyncArray.push({ id: asyncArray.length + 1, title: title, description: description });
            await AsyncStorage.setItem('arrayList', JSON.stringify(asyncArray));
            return false;
        }
        return null;
    }

    searchFilterFunction = text => {
        let newData = [];

        if (text && text != "") {
            newData = this.state.itemList.filter(item => {
                const itemData = `${item.title.toUpperCase()}`;
                const textData = text.toUpperCase();
                return itemData.startsWith(textData);
            });
        } else {
            newData = this.state.itemList;
        }

        this.setState({
            data: newData,
            searchData: newData
        });
    };

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.child}>
                    <Text style={styles.text} >ITEMS</Text>
                    <TouchableOpacity style={{ marginLeft: "30%" }} onPress={() => { this.addItemList() }}>
                        <Image
                            style={styles.addIcon}
                            source={{
                                uri: 'https://img.icons8.com/small/16/000000/plus-2-math.png',
                            }}
                            resizeMode="cover"

                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        backgroundColor: "white",
                        flexDirection: "row",
                        marginTop: 40
                    }}
                >
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="black"
                        placeholder="Search"
                        onChangeText={text => this.searchFilterFunction(text)}
                        autoCorrect={false}
                    />
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://img.icons8.com/ios/50/000000/search--v1.png',
                        }}
                        resizeMode="cover"
                    />
                </View>
                {this.state.data && this.state.data.length > 0 ?
                    (<FlatList
                        data={this.state.data}
                        extraData={this.state}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.flatlist}>
                                    <Text style={{ fontSize: 18, color: "#058DF1", fontWeight: "bold" }}>
                                        {item.title}
                                    </Text>
                                    <Text>
                                        {item.description}
                                    </Text>
                                </View>
                            );
                        }}

                    />) : (
                        <Text style={{ fontSize: 20, alignSelf: "center", marginTop: "60%" }}>Sorry no such item exists in this list</Text>
                    )}
            </View>
        );
    }

};

const mapStateToProps = state => {
    return {
        reducer: state.Reducer
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            addItem,

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);



const styles = StyleSheet.create({
    flatlist: {
        fontSize: 18,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    input: {
        height: 40,
        borderColor: "white",
        borderWidth: 1,
        width: "85%",
        color: "black",
        marginLeft: 10,
    },
    tinyLogo: {
        width: 30,
        height: 30,
        marginTop: 5
    },
    parent: {
        flex: 1
    },
    child: {
        flexDirection: "row",
        flex: 0.18,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#058DF1",
    },
    text: {
        fontSize: 20,
        fontStyle: 'normal',
        marginHorizontal: 15,
        marginTop: 5
    },
    addIcon: {
        width: 30,
        height: 30,
        marginLeft: "65%",
        marginTop: 5,
        zIndex: 99999
    },
});
