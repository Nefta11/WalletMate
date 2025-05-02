import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useContext } from 'react';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { PieChart } from 'react-native-svg-charts';
import { TransactionsContext } from '@/context/TransactionsContext';
import { ThemeContext } from '@/context/ThemeContext';
import TransactionCard from '@/components/TransactionCard';
import Card from '@/components/Card';
import { formatCurrency } from '@/utils/formatters';
import { getCategoryColor } from '@/utils/categories';
import { formatMonthYear } from '@/utils/dateUtils';

export default function Dashboard() {
  const router = useRouter();
  const { transactions, getMonthlyTotals, getCategoryTotals } = useContext(TransactionsContext);
  const { colors } = useContext(ThemeContext);

  const { income, expenses, balance } = getMonthlyTotals(new Date());
  const categories = getCategoryTotals(new Date());

  // Get last 5 transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Prepare data for pie chart
  const pieData = categories.map(category => ({
    value: Math.abs(category.amount),
    svg: {
      fill: getCategoryColor(category.name),
    },
    key: category.name,
  }));

  const currentMonth = formatMonthYear(new Date());

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Total Balance</Text>
          <Text style={[styles.balance, { color: colors.text }]}>{formatCurrency(balance)}</Text>
        </View>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/transaction/new')}
        >
          <Plus color="white" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <Card style={StyleSheet.flatten([styles.summaryCard, { backgroundColor: colors.success }])}>
          <Text style={styles.summaryTitle}>Ingresos</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(income)}</Text>
        </Card>
        <Card style={StyleSheet.flatten([styles.summaryCard, { backgroundColor: colors.error }])}>
          <Text style={styles.summaryTitle}>Gastos</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(Math.abs(expenses))}</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Gastos por Categoría - {currentMonth}
        </Text>
        {pieData.length > 0 ? (
          <View style={styles.chartContainer}>
            <PieChart 
              style={styles.chart} 
              data={pieData} 
              innerRadius="60%" 
              padAngle={0.02}
            />
            <View style={styles.chartLegend}>
              {categories.map(category => (
                <View key={category.name} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: getCategoryColor(category.name) }]} />
                  <Text style={[styles.legendText, { color: colors.text }]}>{category.name}</Text>
                  <Text style={[styles.legendAmount, { color: colors.text }]}>
                    {formatCurrency(Math.abs(category.amount))}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
            No hay datos de gastos para este mes
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Transacciones Recientes</Text>
          <TouchableOpacity onPress={() => router.push('/transactions')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        
        {recentTransactions.length > 0 ? (
          recentTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
            Aún no hay transacciones. Agrega tu primera transacción.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

export function HomeScreen() {
  const router = useRouter();
  const { colors } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>      
      <Text style={[styles.title, { color: colors.text }]}>Bienvenido a WalletMate</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Administra tus finanzas fácilmente</Text>
      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/transaction/new')}
      >
        <Text style={styles.startButtonText}>Comenzar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  balance: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    marginHorizontal: 4,
  },
  summaryTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#fff',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  chartContainer: {
    height: 220,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chart: {
    height: 200,
    width: Dimensions.get('window').width * 0.4,
  },
  chartLegend: {
    flex: 1,
    paddingLeft: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  legendAmount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  noDataText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 32,
  },
  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignSelf: 'center',
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#fff',
  },
});