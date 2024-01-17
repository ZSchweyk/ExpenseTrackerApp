import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TransactionOverviewStackProp } from "../types";

import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { TransactionsContext } from "../store/transactions-context";


function ManageTransaction({ route, navigation }: TransactionOverviewStackProp): JSX.Element {
  const transactionsCtx = useContext(TransactionsContext);
  
  const editedTransactionId = route.params?.transactionId;
  const isEditing = !!editedTransactionId;

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

  function confirmHandler() {
    if (isEditing) {
      transactionsCtx.updateTransaction({
        id: editedTransactionId,
        description: 'Test',
        amount: 19.99,
        date: new Date('2022-05-19')
      });
    } else {
      transactionsCtx.addTransaction({
        description: 'Test',
        amount: 19.99,
        date: new Date('2022-05-19')
      });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>Cancel</Button>
        <Button style={styles.button} onPress={confirmHandler} >{isEditing ? 'Update' : 'Add'}</Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
});