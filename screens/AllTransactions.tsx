import { Text } from "react-native";
import { useContext } from "react";

import TransactionsOutput from "../components/TransactionsOutput/TransactionsOutput";
import { TransactionsContext } from "../store/transactions-context";

function AllTransactions(): JSX.Element {
  const transactionsCtx = useContext(TransactionsContext);
  return (
    <TransactionsOutput
      transactions={transactionsCtx.transactions}
      transactionsPeriod="Total"
      fallbackText="No registered transactions found!"
    />
  );
}

export default AllTransactions;