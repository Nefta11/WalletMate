import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { X } from 'lucide-react-native';
import { categoryOptions } from '@/utils/categories';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  initialFilters: {
    type: string;
    category: string;
    startDate: Date | null;
    endDate: Date | null;
  };
}

export default function FilterModal({
  visible,
  onClose,
  onApply,
  initialFilters,
}: FilterModalProps) {
  const { colors } = useContext(ThemeContext);
  const [filters, setFilters] = useState(initialFilters);

  const handleReset = () => {
    setFilters({
      type: 'all',
      category: 'all',
      startDate: null,
      endDate: null,
    });
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Filtrar Transacciones</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.filtersContainer}>
            <Text style={[styles.filterTitle, { color: colors.text }]}>Tipo de Transacción</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  filters.type === 'all' && [styles.selectedOption, { borderColor: colors.primary }]
                ]}
                onPress={() => setFilters({ ...filters, type: 'all' })}
              >
                <Text style={[
                  styles.optionText,
                  { color: colors.text },
                  filters.type === 'all' && { color: colors.primary }
                ]}>
                  Todos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  filters.type === 'income' && [styles.selectedOption, { borderColor: colors.primary }]
                ]}
                onPress={() => setFilters({ ...filters, type: 'income' })}
              >
                <Text style={[
                  styles.optionText,
                  { color: colors.text },
                  filters.type === 'income' && { color: colors.primary }
                ]}>
                  Ingresos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  filters.type === 'expense' && [styles.selectedOption, { borderColor: colors.primary }]
                ]}
                onPress={() => setFilters({ ...filters, type: 'expense' })}
              >
                <Text style={[
                  styles.optionText,
                  { color: colors.text },
                  filters.type === 'expense' && { color: colors.primary }
                ]}>
                  Gastos
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.filterTitle, { color: colors.text }]}>Categorías</Text>
            <View style={styles.categoriesContainer}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  filters.category === 'all' && [styles.selectedCategory, { backgroundColor: colors.primary }]
                ]}
                onPress={() => setFilters({ ...filters, category: 'all' })}
              >
                <Text style={[
                  styles.categoryText,
                  filters.category === 'all' && styles.selectedCategoryText
                ]}>
                  Todas
                </Text>
              </TouchableOpacity>
              
              {categoryOptions.map((category) => (
                <TouchableOpacity
                  key={category.value}
                  style={[
                    styles.categoryButton,
                    filters.category === category.value && [styles.selectedCategory, { backgroundColor: colors.primary }]
                  ]}
                  onPress={() => setFilters({ ...filters, category: category.value })}
                >
                  <Text style={[
                    styles.categoryText,
                    filters.category === category.value && styles.selectedCategoryText
                  ]}>
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Date range filters would be added here in a full implementation */}
          </ScrollView>
          
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.resetButton, { borderColor: colors.border }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>Restablecer</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.applyButton, { backgroundColor: colors.primary }]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    marginTop: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  filtersContainer: {
    padding: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 12,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 12,
    marginBottom: 12,
    borderColor: '#DDDDDD',
  },
  selectedOption: {
    borderWidth: 2,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#06B6D4',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#555555',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  resetButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  resetButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  applyButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
});