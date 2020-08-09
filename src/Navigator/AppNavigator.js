import Home from '../screens/Home';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Detail from '../screens/Detail';

const navigator = createStackNavigator({
    Home: Home,
    Detail: Detail,
},
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            title: 'ITEMS',
            headerShown: false,

        }
    });

export default createAppContainer(navigator);