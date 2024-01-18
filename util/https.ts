import axios from "axios";
import { Transaction, TransactionData } from "../types";

const BACKEND_URL: string = 'https://transactiontrackerapp-1c325-default-rtdb.firebaseio.com';

export async function storeTransaction(transactionData: TransactionData): Promise<string> {
  const response = await axios.post(
    BACKEND_URL + '/transactions.json',
    transactionData
  );
  const id: string = response.data.name;
  return id;
}

export async function fetchTransactions(): Promise<Transaction[]> {
  const response = await axios.get(BACKEND_URL + '/transactions.json');

  const transactions: Transaction[] = [];

  for (const key in response.data) {
    const transactionObj: Transaction = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    transactions.push(transactionObj);
  }

  return transactions;
}

export function updateTransaction(id: string, transactionData: TransactionData) {
  return axios.put(BACKEND_URL + `/transactions/${id}.json`, transactionData);
}

export function deleteTransaction(id: string) {
  return axios.delete(BACKEND_URL + `/transactions/${id}.json`);
}