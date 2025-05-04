import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import CategoryPicker from '@/components/CategoryPicker';
import DatePicker from '@/components/DatePicker';
import { Transaction } from '@/types';
import { formatDateForDisplay } from '@/utils/dateUtils';
import { ThemeContext } from '@/context/ThemeContext';
import { TransactionsContext } from '@/context/TransactionsContext';

type EditTransactionModalProps = {
  transaction: Transaction;
  onClose: () => void;
};

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({ transaction, onClose }) => {
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [note, setNote] = useState(transaction.note || '');
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(new Date(transaction.date));

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { colors } = React.useContext(ThemeContext);
  const { updateTransaction } = useContext(TransactionsContext);

  const handleSave = () => {
    const updatedTransaction = {
      ...transaction,
      amount: parseFloat(amount),
      note,
      category,
      date: date.toISOString(),
    };
    updateTransaction(updatedTransaction);
    onClose();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Editar Transacción</Text>

        <TextInput
          style={[styles.input, { borderColor: colors.textSecondary, color: colors.text }]}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Monto"
          placeholderTextColor={colors.textSecondary}
        />

        <TouchableOpacity
          style={[styles.pickerButton, { borderColor: colors.textSecondary }]}
          onPress={() => {
            Keyboard.dismiss();
            setShowCategoryPicker(true);
          }}
        >
          <Text style={[styles.pickerText, { color: colors.text }]}>{category}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.pickerButton, { borderColor: colors.textSecondary }]}
          onPress={() => {
            Keyboard.dismiss();
            setShowDatePicker(true);
          }}
        >
          <Text style={[styles.pickerText, { color: colors.text }]}>{formatDateForDisplay(date)}</Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { borderColor: colors.textSecondary, color: colors.text }]}
          value={note}
          onChangeText={setNote}
          placeholder="Nota (opcional)"
          placeholderTextColor={colors.textSecondary}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.error }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CategoryPicker
        visible={showCategoryPicker}
        onClose={() => setShowCategoryPicker(false)}
        selectedCategory={category}
        onSelectCategory={setCategory}
      />

      <DatePicker
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        date={date}
        onSelectDate={setDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%',
    fontFamily: 'Inter-Regular',
  },
  pickerButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    justifyContent: 'center',
    width: '100%',
  },
  pickerText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});

export default EditTransactionModal;