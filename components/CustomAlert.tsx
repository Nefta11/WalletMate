import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';

interface CustomAlertProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  visible: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  visible,
}) => {
  const { colors } = React.useContext(ThemeContext);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.alertBox, { backgroundColor: colors.card }]}>  
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
          <View style={styles.buttonContainer}>
            {onCancel && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.error }]}
                onPress={onCancel}
              >
                <Text style={styles.buttonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    marginBottom: 20,
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

export default CustomAlert;