import React, { useContext, Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import ListContext from '../context/ListContext';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    addItem
} from "../Store/Action";

class Detail extends React.Component {
    constructor(props) {
        super()
        this.state = {
            title: "",
            description: ""
        }

    }

    addItems = (title, description) => {
        if (!this.state.title) {
            alert("Please add title.");
        }
        else if (!this.state.description) {
            alert("Please add description.");
        }
        else {
            this.props.addItem(title, description);
            this.props.navigation.navigate('Home', {
                title: title,
                description: description,
            });
        }

    }

    handleTitle = text => {
        this.setState({ title: text });
    };
    handleDescription = text => {
        this.setState({ description: text });
    };

    componentDidMount = () => {
        const arrayList = this.props.reducer.listData;
        this.setState({
            itemList: arrayList
        })
    }

    render() {
        return (
            <View style={styles.parent}>
                <View style={styles.child}>
                    <Text style={styles.text} >ITEMS</Text>
                </View>
                <View style={{ flexDirection: "column" }}>

                    <Text style={{ fontSize: 20, color: "black", marginLeft: 20, marginTop: 40 }}>Title</Text>
                    <TextInput
                        placeholder="Title"
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#058DF1"
                        onChangeText={text => this.handleTitle(text)}
                        value={this.state.title}
                        autoCorrect={false}

                    />
                </View>
                <View style={{ flexDirection: "column" }}>
                    <Text style={{ fontSize: 20, color: "black", marginLeft: 20 }}>Description</Text>
                    <TextInput
                        style={styles.inputDescp}
                        placeholder="Description"
                        multiline={true}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#058DF1"
                        onChangeText={text => this.handleDescription(text)}
                        value={this.state.description}
                        autoCorrect={false}
                    />
                </View>
                <View style={{ justifyContent: "flex-end", flex: 1, paddingBottom: 30, paddingHorizontal: 50 }}>
                    <Button style={{}} title="Submit" onPress={() => { this.addItems(this.state.title, this.state.description) }} />
                </View>
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
)(Detail);



const styles = StyleSheet.create({
    flatlist: {
        fontSize: 18,
        paddingVertical: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    input: {
        margin: 15,
        height: 50,
        borderColor: "#058DF1",
        borderWidth: 1,
        paddingLeft: 10,
        backgroundColor: "white"
    },
    inputDescp: {
        margin: 15,
        height: 200,
        borderColor: "#058DF1",
        borderWidth: 1,
        paddingLeft: 10,
        backgroundColor: "white"
    },
    parent: {
        flex: 1,
    },
    child: {
        flexDirection: "row",
        flex: 0.15,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#058DF1",
    },
    text: {
        fontSize: 20,
        fontStyle: 'normal',
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 5
    }
});
