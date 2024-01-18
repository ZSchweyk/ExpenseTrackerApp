import { useContext, useEffect, useState } from "react";

import TransactionsOutput from "../components/TransactionsOutput/TransactionsOutput";
import { TransactionsContext } from "../store/transactions-context";
import { getDateMinusDays } from "../util/date";
import { Transaction } from "../types";
import { fetchTransactions } from "../util/https";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentTransactions(): JSX.Element {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>();

  const transactionsCtx = useContext(TransactionsContext);

  useEffect(() => {
    async function getTransactions() {
      setIsFetching(true);
      try {
        const transactions = await fetchTransactions();
        transactionsCtx.setTransactions(transactions);
      } catch (error) {
        setError('Could not fetch transactions!');
      }
      setIsFetching(false);
      
    }
    
    getTransactions();
  }, []);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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