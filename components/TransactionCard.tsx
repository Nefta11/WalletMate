import { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Transaction } from '@/types';
import { ThemeContext } from '@/context/ThemeContext';
import { formatCurrency } from '@/utils/formatters';
import { formatDateForDisplay } from '@/utils/dateUtils';
import { getCategoryIcon } from '@/utils/categories';

interface TransactionCardProps {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: TransactionCardProps) {
  const router = useRouter();
  const { colors } = useContext(ThemeContext);
  const isExpense = transaction.amount < 0;
  
  const CategoryIcon = getCategoryIcon(transaction.category);
  
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={() => router.push(`/transaction/${transaction.id}`)}
    >
      <View style={[styles.iconContainer, { backgroundColor: isExpense ? colors.error : colors.success }]}>
        <CategoryIcon size={20} color="#FFF" />
      </View>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={[styles.title, { color: colors.text }]}>
            {transaction.note || 'Sin descripción'}
          </Text>
          <Text style={[
            styles.amount,
            { color: isExpense ? colors.error : colors.success }
          ]}>
            {isExpense ? '-' : '+'}{formatCurrency(Math.abs(transaction.amount))}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {formatDateForDisplay(new Date(transaction.date))}
          </Text>
          <Text style={[styles.category, { color: colors.textSecondary }]}>
            {transaction.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  category: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});