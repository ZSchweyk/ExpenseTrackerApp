import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type Action = {
  type: string,
  payload: any,
};

type TransactionData = {
  amount: number,
  date: Date,
  description: string,
};

type Transaction = TransactionData & {
  id: string
};;

type TransactionsOverviewStackParamList = {
  TransactionsOverview: undefined,
  ManageTransaction: {
    transactionId: string
  },
};

type TransactionOverviewNavigationProp = NativeStackNavigationProp<
  TransactionsOverviewStackParamList,
  'ManageTransaction'
>;

type TransactionOverviewStackProp = NativeStackScreenProps<
  TransactionsOverviewStackParamList,
  'ManageTransaction'
>;

export {
  TransactionData,
  Transaction,
  TransactionsOverviewStackParamList,
  TransactionOverviewNavigationProp,
  TransactionOverviewStackProp,
  Action,
};
