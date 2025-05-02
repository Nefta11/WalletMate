import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { formatDateForDisplay, getMonthName } from '@/utils/dateUtils';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface DatePickerProps {
  visible: boolean;
  onClose: () => void;
  date: Date;
  onSelectDate: (date: Date) => void;
}

export default function DatePicker({
  visible,
  onClose,
  date,
  onSelectDate,
}: DatePickerProps) {
  const { colors } = useContext(ThemeContext);
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());
  const [selectedDate, setSelectedDate] = useState(date.getDate());

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleSelectDate = (day: number) => {
    setSelectedDate(day);
    const newDate = new Date(year, month, day);
    onSelectDate(newDate);
    onClose();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay}></View>);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            selectedDate === day && styles.selectedDay,
            selectedDate === day && { backgroundColor: colors.primary }
          ]}
          onPress={() => handleSelectDate(day)}
        >
          <Text
            style={[
              styles.calendarDayText,
              { color: colors.text },
              selectedDate === day && { color: '#FFF' }
            ]}
          >
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    
    return days;
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
            <Text style={[styles.title, { color: colors.text }]}>Seleccionar Fecha</Text>
            <TouchableOpacity 
              style={[styles.closeButton, { borderColor: colors.border }]} 
              onPress={onClose}
            >
              <Text style={{ color: colors.text }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <ChevronLeft size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.monthYearText, { color: colors.text }]}>
              {getMonthName(month)} {year}
            </Text>
            <TouchableOpacity onPress={handleNextMonth}>
              <ChevronRight size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.weekdaysRow}>
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <Text key={day} style={[styles.weekdayText, { color: colors.textSecondary }]}>
                {day}
              </Text>
            ))}
          </View>
          
          <View style={styles.calendarGrid}>
            {renderCalendar()}
          </View>
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={[styles.todayButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                const today = new Date();
                setYear(today.getFullYear());
                setMonth(today.getMonth());
                setSelectedDate(today.getDate());
                onSelectDate(today);
                onClose();
              }}
            >
              <Text style={styles.todayButtonText}>Hoy</Text>
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
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  monthYearText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  weekdayText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarDayText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  selectedDay: {
    borderRadius: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
  },
  todayButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  todayButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
});