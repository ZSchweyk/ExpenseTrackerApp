import { createContext, useReducer } from "react";
import { TransactionData, Transaction, Action } from "../types";

export const TransactionsContext = createContext({
  transactions: [],
  addTransaction: (tempTransaction: Transaction) => { },
  setTransactions: (transactions: Transaction[]) => {},
  deleteTransaction: (id: string) => { },
  updateTransaction: (id: string, transaction: TransactionData) => { }
});

function transactionsReducer(state: Transaction[], action: Action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      const updatableTransactionIndex: number = state.findIndex(
        expense => expense.id === action.payload.id
      );
      const updatableTransaction = state[updatableTransactionIndex];
      const updatedItem = { ...updatableTransaction, ...action.payload }
      const updatedTransactions = [...state];
      updatedTransactions[updatableTransactionIndex] = updatedItem;
      return updatedTransactions;
    case 'DELETE':
      return state.filter(transaction => transaction.id !== action.payload);
    default:
      return state;
  }
}

function TransactionsContextProvider({ children }: { children: React.ReactNode }) {
  const [transactionsState, dispatch] = useReducer(transactionsReducer, []);

  function addTransaction(tempTransaction: TransactionData) {
    dispatch({ type: 'ADD', payload: tempTransaction });
  }

  function setTransactions(transactions: Transaction[]) {
    dispatch({ type: 'SET', payload: transactions });
  }

  function deleteTransaction(id: string) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateTransaction(id: string, transaction: TransactionData) {
    dispatch({ type: 'UPDATE', payload: {id: id, ...transaction} });
  }

  const value = {
    transactions: transactionsState,
    addTransaction: addTransaction,
    setTransactions: setTransactions,
    deleteTransaction: deleteTransaction,
    updateTransaction: updateTransaction
  };

  
  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export default TransactionsContextProvider;