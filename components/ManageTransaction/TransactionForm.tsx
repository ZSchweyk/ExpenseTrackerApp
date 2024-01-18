import { Alert, StyleSheet, Text, TextInputBase, View } from "react-native";
import { useState } from "react";

import Input from "./Input";
import Button from "../UI/Button";
import { TransactionData } from "../../types";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function TransactionForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }: { submitButtonLabel: string, onCancel: () => void, onSubmit: (transactionData: TransactionData) => void, defaultValues?: TransactionData }): JSX.Element {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? (-defaultValues.amount).toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    }
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: string): void {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      }
    });
  }

  function submitHandler() {
    const amountIsValid = inputs.amount.value !== '' && !isNaN(+inputs.amount.value);
    const dateIsValid = (new Date(inputs.date.value)).toString() !== 'Invalid Date';
    const descriptionIsValid = inputs.description.value.trim() !== '';

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // show feedback
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
        };
      });
      return;
    }

    const transactionData: TransactionData = {
      amount: -+inputs.amount.value, // + converts string to number
      date: new Date(inputs.date.value),
      description: inputs.description.value.trim()
    };



    onSubmit(transactionData);
  }

  const formIsInvalid = 
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Transaction</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            // keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(null, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(null, 'date'),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none' // default is sentences
          // autoCorrect: false // default is true
          onChangeText: inputChangedHandler.bind(null, 'description'),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values - please check your input values</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  )
}

export default TransactionForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
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
});