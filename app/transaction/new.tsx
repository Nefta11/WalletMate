import { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import { X, ChevronDown } from 'lucide-react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { TransactionsContext } from '@/context/TransactionsContext';
import { ThemeContext } from '@/context/ThemeContext';
import { categoryOptions } from '@/utils/categories';
import { formatDateForDisplay } from '@/utils/dateUtils';
import { extractNumericValue } from '@/utils/formatters';
import CategoryPicker from '@/components/CategoryPicker';
import DatePicker from '@/components/DatePicker';

export default function NewTransaction() {
  const router = useRouter();
  const { addTransaction } = useContext(TransactionsContext);
  const { colors } = useContext(ThemeContext);

  const [type, setType] = useState<'ingreso' | 'gasto'>('gasto');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categoryOptions[0].value);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const amountInputRef = useRef<TextInput>(null);

  // Focus amount input on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      amountInputRef.current?.focus();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    // Validate amount
    if (!amount || parseFloat(extractNumericValue(amount)) === 0) {
      alert('Please enter a valid amount');
      return;
    }

    // Create transaction object
    const transaction = {
      id: Date.now().toString(),
      amount: parseFloat(extractNumericValue(amount)) * (type === 'gasto' ? -1 : 1),
      category,
      note: note.trim() || category, // Use category as default note if empty
      date: date.toISOString(),
    };

    // Add transaction
    addTransaction(transaction);

    // Navigate back
    router.back();
  };

  const getCategoryName = (value: string) => {
    const categoryOption = categoryOptions.find(cat => cat.value === value);
    return categoryOption ? categoryOption.label : '';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        entering={FadeIn.duration(300)}
        style={[styles.header, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <X size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Nueva Transacción</Text>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View
          entering={SlideInRight.delay(100).duration(300)}
          style={styles.typeSelector}
        >
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'gasto' && [styles.activeTypeButton, { backgroundColor: colors.error }]
            ]}
            onPress={() => setType('gasto')}
          >
            <Text style={[
              styles.typeButtonText,
              type === 'gasto' && styles.activeTypeText
            ]}>
              Gasto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'ingreso' && [styles.activeTypeButton, { backgroundColor: colors.success }]
            ]}
            onPress={() => setType('ingreso')}
          >
            <Text style={[
              styles.typeButtonText,
              type === 'ingreso' && styles.activeTypeText
            ]}>
              Ingreso
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          entering={SlideInRight.delay(200).duration(300)}
          style={[styles.amountContainer, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.currencySymbol, { color: colors.text }]}>$</Text>
          <TextInput
            ref={amountInputRef}
            style={[styles.amountInput, { color: colors.text }]}
            value={amount}
            onChangeText={setAmount}
            placeholder="Monto"
            placeholderTextColor={colors.textSecondary}
            keyboardType="decimal-pad"
            maxLength={10}
          />
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(300).duration(300)}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Categoría</Text>
          <TouchableOpacity
            style={[styles.pickerButton, { backgroundColor: colors.card }]}
            onPress={() => {
              Keyboard.dismiss();
              setShowCategoryPicker(true);
            }}
          >
            <Text style={[styles.pickerText, { color: colors.text }]}>
              {getCategoryName(category)}
            </Text>
            <ChevronDown size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(400).duration(300)}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Nota (opcional)</Text>
          <TextInput
            style={[styles.noteInput, { backgroundColor: colors.card, color: colors.text }]}
            value={note}
            onChangeText={setNote}
            placeholder="Nota (opcional)"
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(500).duration(300)}>
          <Text style={[styles.fieldLabel, { color: colors.text }]}>Fecha</Text>
          <TouchableOpacity
            style={[styles.pickerButton, { backgroundColor: colors.card }]}
            onPress={() => {
              Keyboard.dismiss();
              setShowDatePicker(true);
            }}
          >
            <Text style={[styles.pickerText, { color: colors.text }]}>
              {formatDateForDisplay(date)}
            </Text>
            <ChevronDown size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

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
    marginTop: 30,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTypeButton: {
    borderRadius: 8,
  },
  typeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#888',
  },
  activeTypeText: {
    color: '#FFF',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  currencySymbol: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontFamily: 'Inter-Bold',
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  pickerText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  noteInput: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
});