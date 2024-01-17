import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";

type Action = {
  type: string,
  payload: any,
};

type TempTransaction = {
  amount: number,
  date: Date,
  description: string
};

type Transaction = TempTransaction & {
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
  TempTransaction,
  Transaction,
  TransactionsOverviewStackParamList,
  TransactionOverviewNavigationProp,
  TransactionOverviewStackProp,
  Action,
};
