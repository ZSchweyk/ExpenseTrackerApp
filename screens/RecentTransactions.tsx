import { Text } from "react-native";
import { useContext } from "react";

import TransactionsOutput from "../components/TransactionsOutput/TransactionsOutput";
import { TransactionsContext } from "../store/transactions-context";
import { getDateMinusDays } from "../util/date";
import { Transaction } from "../types";

function RecentTransactions(): JSX.Element {
  const transactionsCtx = useContext(TransactionsContext);

  const recentTransactions = transactionsCtx.transactions.filter((transaction: Transaction) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return transaction.date >= date7DaysAgo && transaction.date <= today;
  });

  return (
    <TransactionsOutput
      transactions={recentTransactions}
      transactionsPeriod="Last 7 Days"
      fallbackText="No transactions registered for the last 7 days."
    />
  );
}

export default RecentTransactions;