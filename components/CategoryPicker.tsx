import React, { useContext } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { categoryOptions } from '@/utils/categories';

interface CategoryPickerProps {
  visible: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryPicker({
  visible,
  onClose,
  selectedCategory,
  onSelectCategory,
}: CategoryPickerProps) {
  const { colors } = useContext(ThemeContext);

  const handleSelect = (category: string) => {
    onSelectCategory(category);
    onClose();
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
            <Text style={[styles.title, { color: colors.text }]}>Seleccionar Categoría</Text>
            <TouchableOpacity 
              style={[styles.closeButton, { borderColor: colors.border }]} 
              onPress={onClose}
            >
              <Text style={{ color: colors.text }}>Hecho</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.categoriesList}>
            {categoryOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.categoryItem,
                  selectedCategory === option.value && { backgroundColor: colors.primary + '20' }
                ]}
                onPress={() => handleSelect(option.value)}
              >
                <Text style={[
                  styles.categoryText,
                  { color: colors.text },
                  selectedCategory === option.value && { color: colors.primary },
                ]}>
                  {option.label}
                </Text>
                {selectedCategory === option.value && (
                  <View style={[styles.selectedIndicator, { backgroundColor: colors.primary }]} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoriesList: {
    padding: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  selectedIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});