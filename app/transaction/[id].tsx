import { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { X, Trash2, Edit3 } from 'lucide-react-native';
import { TransactionsContext } from '@/context/TransactionsContext';
import { ThemeContext } from '@/context/ThemeContext';
import { formatCurrency } from '@/utils/formatters';
import { formatDateForDisplay } from '@/utils/dateUtils';
import { getCategoryName } from '@/utils/categories';
import Card from '@/components/Card';

export default function TransactionDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { transactions, deleteTransaction } = useContext(TransactionsContext);
  const { colors } = useContext(ThemeContext);
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (id) {
      const found = transactions.find(t => t.id === id);
      if (found) {
        setTransaction(found);
      } else {
        // Transaction not found
        Alert.alert('Error', 'Transaction not found');
        router.back();
      }
    }
  }, [id, transactions, router]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            if (transaction) {
              deleteTransaction(transaction.id);
              router.back();
            }
          }
        },
      ]
    );
  };

  if (!transaction) {
    return null;
  }

  const isExpense = transaction.amount < 0;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Transaction Details</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Trash2 size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.amountSection}>
          <Text style={[
            styles.transactionType,
            { color: isExpense ? colors.error : colors.success }
          ]}>
            {isExpense ? 'Expense' : 'Income'}
          </Text>
          <Text style={[
            styles.amount,
            { color: isExpense ? colors.error : colors.success }
          ]}>
            {formatCurrency(Math.abs(transaction.amount))}
          </Text>
        </View>

        <Card style={[styles.detailsCard, { backgroundColor: colors.card }]}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Category</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {getCategoryName(transaction.category)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Date</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {formatDateForDisplay(new Date(transaction.date))}
            </Text>
          </View>

          {transaction.note && (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Note</Text>
                <Text style={[styles.detailValue, { color: colors.text }]}>
                  {transaction.note}
                </Text>
              </View>
            </>
          )}
        </Card>

        <TouchableOpacity 
          style={[styles.editButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            // For editing we would navigate to the edit screen
            // This would be implemented in a real app
            Alert.alert('Edit Transaction', 'Editing functionality would go here');
          }}
        >
          <Edit3 size={20} color="#FFF" style={styles.editIcon} />
          <Text style={styles.editButtonText}>Edit Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  amountSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  transactionType: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  amount: {
    fontSize: 40,
    fontFamily: 'Inter-Bold',
  },
  detailsCard: {
    borderRadius: 12,
    marginBottom: 24,
  },
  detailRow: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    opacity: 0.2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  editIcon: {
    marginRight: 8,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});