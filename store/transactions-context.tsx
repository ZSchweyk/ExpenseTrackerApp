import { createContext, useReducer } from "react";
import { TransactionData, Transaction, Action } from "../types";

const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: -59.99,
    date: new Date(2024, 1, 14, 4, 35)
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: -89.29,
    date: new Date(2024, 1, 8, 9, 15)
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: -5.99,
    date: new Date(2021, 12, 1, 11, 27)
  },
  {
    id: 'e4',
    description: 'A GREAT book',
    amount: -14.99,
    date: new Date(2022, 2, 19, 12, 49)
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: -18.59,
    date: new Date(2022, 2, 18, 13, 5)
  },
];

export const TransactionsContext = createContext({
  transactions: [],
  addTransaction: (tempTransaction: TransactionData) => { },
  deleteTransaction: (id: string) => { },
  updateTransaction: (id: string, transaction: TransactionData) => { }
});

function transactionsReducer(state: Transaction[], action: Action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state]
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
  const [transactionsState, dispatch] = useReducer(transactionsReducer, DUMMY_TRANSACTIONS);

  function addTransaction(tempTransaction: TransactionData) {
    dispatch({ type: 'ADD', payload: tempTransaction });
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
    deleteTransaction: deleteTransaction,
    updateTransaction: updateTransaction
  };

  
  return (
    // @ts-expect-error
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export default TransactionsContextProvider;