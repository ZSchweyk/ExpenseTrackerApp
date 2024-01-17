import { View, Text, StyleSheet } from "react-native";

import TransactionsSummary from "./TransactionsSummary";
import TransactionsList from "./TransactionsList";
import { Transaction } from "../../types";
import { GlobalStyles } from "../../constants/styles";


function TransactionsOutput({ transactions, transactionsPeriod, fallbackText }: { transactions: Transaction[], transactionsPeriod: string, fallbackText: string }): JSX.Element {
  let content = (
    <Text style={styles.infoText}>{fallbackText}</Text>
  );

  if (transactions.length > 0) {
    content = <TransactionsList transactions={transactions} />;
  }
  
  return (
    <View style={styles.container}>
      <TransactionsSummary transactions={transactions} periodName={transactionsPeriod} />
      {content}
    </View>
  );
}

export default TransactionsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});