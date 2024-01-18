import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TransactionData, TransactionOverviewStackProp } from "../types";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { TransactionsContext } from "../store/transactions-context";
import TransactionForm from "../components/ManageTransaction/TransactionForm";
import { Transaction } from "../types";
import { storeTransaction, updateTransaction, deleteTransaction } from "../util/https";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function ManageTransaction({ route, navigation }: TransactionOverviewStackProp): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>();

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

  async function deleteTransactionHandler() {
    setIsSubmitting(true);
    try {
      await deleteTransaction(editedTransactionId);
      transactionsCtx.deleteTransaction(editedTransactionId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete transaction - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(transactionData: TransactionData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        transactionsCtx.updateTransaction(editedTransactionId, transactionData);
        await updateTransaction(editedTransactionId, transactionData);
      } else {
        const id = await storeTransaction(transactionData);
        transactionsCtx.addTransaction({ ...transactionData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
    
    
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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