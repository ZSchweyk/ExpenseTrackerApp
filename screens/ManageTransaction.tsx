import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TransactionData, TransactionOverviewStackProp } from "../types";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { TransactionsContext } from "../store/transactions-context";
import TransactionForm from "../components/ManageTransaction/TransactionForm";
import { Transaction } from "../types";


function ManageTransaction({ route, navigation }: TransactionOverviewStackProp): JSX.Element {
  const transactionsCtx = useContext(TransactionsContext);
  
  const editedTransactionId = route.params?.transactionId;
  const isEditing = !!editedTransactionId;

  // Will be undefined if there's no transactionId parameter provided,
  // which will occur if the user is adding a new transaction
  const selectedTransaction: Transaction | undefined = transactionsCtx.transactions.find(
    (transaction: Transaction) => transaction.id === editedTransactionId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Transaction' : 'Add Transaction'
    });
  }, [navigation, isEditing]);

  function deleteTransactionHandler() {
    transactionsCtx.deleteTransaction(editedTransactionId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(transactionData: TransactionData) {
    if (isEditing) {
      transactionsCtx.updateTransaction(editedTransactionId, transactionData);
    } else {
      transactionsCtx.addTransaction(transactionData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TransactionForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler} 
        onSubmit={confirmHandler}
        defaultValues={selectedTransaction}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteTransactionHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
});