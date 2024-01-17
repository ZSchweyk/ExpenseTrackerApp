import { FlatList, Text } from "react-native";
import { Transaction } from "../../types";

import TransactionItem from "./TransactionItem";

function renderTransactionItem({ item } : { item: Transaction }): JSX.Element {
  return <TransactionItem transaction={item} />
}

function TransactionsList({ transactions } : { transactions: Transaction[] }): JSX.Element {
  return (
    <FlatList
      data={transactions}
      renderItem={renderTransactionItem}
      keyExtractor={(item: Transaction) => item.id}
    />
  );
}

export default TransactionsList;