import { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { TransactionsContext } from '@/context/TransactionsContext';
import { ThemeContext } from '@/context/ThemeContext';
import { formatCurrency } from '@/utils/formatters';
import { getCategoryColor } from '@/utils/categories';
import { getMonthName, getMonthsArray } from '@/utils/dateUtils';
import Card from '@/components/Card';
import Header from '@/components/Header';
import { PieChart as ChartKitPieChart } from 'react-native-chart-kit';

export default function Statistics() {
  const { getMonthlyTotals, getCategoryTotals, getMonthlyData } = useContext(TransactionsContext);
  const { colors } = useContext(ThemeContext);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const currentDate = new Date(selectedYear, selectedMonth, 1);
  const { income, expenses } = getMonthlyTotals(currentDate);
  const categories = getCategoryTotals(currentDate);
  const monthlyData = getMonthlyData(selectedYear);

  // Generate months for month selector
  const months = getMonthsArray();

  // Previous and next year handlers
  const prevYear = () => setSelectedYear(selectedYear - 1);
  const nextYear = () => {
    const newYear = selectedYear + 1;
    if (newYear <= new Date().getFullYear()) {
      setSelectedYear(newYear);
    }
  };

  // Bar chart data
  const barData = monthlyData.map(item => ({
    month: item.month,
    income: item.income,
    expenses: Math.abs(item.expenses)
  }));

  // Pie chart data
  const pieData = categories.map(category => ({
    value: Math.abs(category.amount),
    svg: {
      fill: getCategoryColor(category.name),
    },
    key: category.name,
  }));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Estadísticas" colors={colors} />
      <View style={styles.yearSelector}>
        <TouchableOpacity onPress={prevYear}>
          <Text style={[styles.yearNav, { color: colors.primary }]}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={[styles.yearText, { color: colors.text }]}>{selectedYear}</Text>
        <TouchableOpacity
          onPress={nextYear}
          disabled={selectedYear >= new Date().getFullYear()}
        >
          <Text
            style={[
              styles.yearNav,
              { color: selectedYear >= new Date().getFullYear() ? colors.textSecondary : colors.primary }
            ]}
          >
            {'>'}
          </Text>
        </TouchableOpacity>
      </View>

      <Card style={[styles.chartCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>Resumen Mensual - {selectedYear}</Text>
        <View style={styles.barChartContainer}>
          {/* Aquí puedes agregar tus gráficos de barras si es necesario */}
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.success }]} />
            <Text style={[styles.legendText, { color: colors.text }]}>Ingresos</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: colors.error }]} />
            <Text style={[styles.legendText, { color: colors.text }]}>Gastos</Text>
          </View>
        </View>
      </Card>

      <Text style={[styles.monthSelectorTitle, { color: colors.text }]}>Seleccionar Mes</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.monthSelector}
        contentContainerStyle={styles.monthSelectorContent}
      >
        {months.map((month, index) => (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthItem,
              selectedMonth === index && { backgroundColor: colors.primary }
            ]}
            onPress={() => setSelectedMonth(index)}
          >
            <Text
              style={[
                styles.monthText,
                { color: selectedMonth === index ? '#FFF' : colors.text }
              ]}
            >
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.monthStats}>
        <Card style={[styles.statCard, { backgroundColor: colors.success }]}>
          <Text style={styles.statLabel}>Ingresos</Text>
          <Text style={styles.statValue}>{formatCurrency(income)}</Text>
        </Card>
        <Card style={[styles.statCard, { backgroundColor: colors.error }]}>
          <Text style={styles.statLabel}>Gastos</Text>
          <Text style={styles.statValue}>{formatCurrency(Math.abs(expenses))}</Text>
        </Card>
      </View>

      <Card style={[styles.categoryCard, { backgroundColor: colors.card }]}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>
          Gastos por Categoría - {getMonthName(selectedMonth)} {selectedYear}
        </Text>

        {pieData.length > 0 ? (
          <View style={styles.pieChartContainer}>
            <ChartKitPieChart
              data={categories.map(category => ({
                name: category.name,
                amount: Math.abs(category.amount),
                color: getCategoryColor(category.name),
                legendFontColor: colors.text,
                legendFontSize: 12,
              }))}
              width={Dimensions.get('window').width - 32}
              height={180}
              chartConfig={{
                color: () => colors.primary,
                labelColor: () => colors.text,
                backgroundColor: colors.card,
                backgroundGradientFrom: colors.card,
                backgroundGradientTo: colors.card,
                decimalPlaces: 0,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="0"
              hasLegend={false}
            />
            <View style={styles.categoryLegend}>
              {categories.map(category => (
                <View key={category.name} style={styles.categoryItem}>
                  <View style={[styles.categoryColor, { backgroundColor: getCategoryColor(category.name) }]} />
                  <Text style={[styles.categoryName, { color: colors.text }]}>{category.name}</Text>
                  <Text style={[styles.categoryAmount, { color: colors.text }]}>
                    {formatCurrency(Math.abs(category.amount))}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Text style={[styles.noDataText, { color: colors.textSecondary }]}>
            No hay datos de gastos para {getMonthName(selectedMonth)} {selectedYear}
          </Text>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: -13,
  },
  yearSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  yearText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginHorizontal: 24,
  },
  yearNav: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  chartCard: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  barChartContainer: {
    height: 200,
    flexDirection: 'row',
  },
  barChart: {
    flex: 1,
  },
  expenseChart: {
    marginLeft: 4,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  monthSelectorTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  monthSelector: {
    marginBottom: 24,
  },
  monthSelectorContent: {
    paddingRight: 16,
  },
  monthItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  monthText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  monthStats: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFF',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FFF',
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  pieChartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoryLegend: {
    width: '100%',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  categoryAmount: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  noDataText: {
    textAlign: 'center',
    padding: 24,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});