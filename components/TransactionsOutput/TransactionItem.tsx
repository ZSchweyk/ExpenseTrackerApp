import { Pressable, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native"; 

import { Transaction } from "../../types";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import { TransactionOverviewNavigationProp } from "../../types";

function TransactionItem({ transaction } : { transaction: Transaction }): JSX.Element {
  const navigation = useNavigation<TransactionOverviewNavigationProp>();

  function transactionPressHandler() {
    navigation.navigate('ManageTransaction', {
      transactionId: transaction.id,
    });
  }

  function amountContainerBackgroundColor(): object {
    if (transaction.amount < 0) {
      return { backgroundColor: GlobalStyles.colors.negative };
    } else if (transaction.amount > 0) {
      return { backgroundColor: GlobalStyles.colors.positive };
    } else {
      return { backgroundColor: 'white' };
    }
  }
  
  return (
    <Pressable
      onPress={transactionPressHandler}
      style={({pressed}: {pressed: boolean}) => pressed && styles.pressed}
    >
      <View style={styles.transactionItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{transaction.description}</Text>
          <Text style={styles.textBase}>{getFormattedDate(transaction.date)}</Text>
        </View>
        <View style={[styles.amountContainer, amountContainerBackgroundColor()]}>
          <Text style={styles.amount}>${-transaction.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default TransactionItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: .75,
  },
  transactionItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between', // pushes items in row away from each other
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: .4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});