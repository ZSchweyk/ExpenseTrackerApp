import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ManageTransaction from './screens/ManageTransaction';
import RecentTransactions from './screens/RecentTransactions';
import AllTransactions from './screens/AllTransactions';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import { TransactionOverviewNavigationProp, TransactionsOverviewStackParamList } from './types';
import TransactionsContextProvider from './store/transactions-context';

const Stack = createNativeStackNavigator<TransactionsOverviewStackParamList>();
const BottomTabs = createBottomTabNavigator();

function TransactionsOverview(): JSX.Element {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon='add'
            size={24}
            color={tintColor === undefined ? 'white' : tintColor}
            onPress={() => {
              navigation.navigate('ManageTransaction');
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name='RecentTransactions'
        component={RecentTransactions}
        options={{
          title: 'Recent Transactions',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='hourglass' size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name='AllTransactions'
        component={AllTransactions}
        options={{
          title: 'All Transactions',
          tabBarLabel: 'All Transactions',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar' size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App(): JSX.Element {
  return (
    <>
      <StatusBar style="light" />
      <TransactionsContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name='TransactionsOverview'
              component={TransactionsOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageTransaction"
              component={ManageTransaction}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionsContextProvider>
    </>
  );
}


