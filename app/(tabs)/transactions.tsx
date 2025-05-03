import { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Search, X, Filter } from 'lucide-react-native';
import { TransactionsContext } from '@/context/TransactionsContext';
import { ThemeContext } from '@/context/ThemeContext';
import TransactionCard from '@/components/TransactionCard';
import FilterModal from '@/components/FilterModal';
import { Transaction } from '@/types';
import Header from '@/components/Header';

export default function Transactions() {
  const router = useRouter();
  const { transactions } = useContext(TransactionsContext);
  const { colors } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    startDate: null,
    endDate: null,
  });

  // Apply filters and search
  useEffect(() => {
    let result = [...transactions];
    
    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(t => 
        filters.type === 'income' ? t.amount > 0 : t.amount < 0
      );
    }
    
    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category);
    }
    
    // Date range filter
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      result = result.filter(t => new Date(t.date) >= startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      result = result.filter(t => new Date(t.date) <= endDate);
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.note.toLowerCase().includes(query) || 
        Math.abs(t.amount).toString().includes(query)
      );
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredTransactions(result);
  }, [transactions, filters, searchQuery]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        No se encontraron transacciones
      </Text>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/transaction/new')}
      >
        <Text style={styles.addButtonText}>Agregar Transacción</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Transacciones" colors={colors} />
      <View style={styles.header}>
        <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Buscar transacciones..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity 
          style={[styles.filterButton, { borderColor: colors.border }]} 
          onPress={() => setShowFilters(true)}
        >
          <Filter size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/transaction/new')}
      >
        <Plus size={24} color="#FFF" />
      </TouchableOpacity>

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={applyFilters}
        initialFilters={filters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 20,
  },
  addButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});