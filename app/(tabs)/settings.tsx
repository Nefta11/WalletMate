import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { TransactionsContext } from '@/context/TransactionsContext';
import { Sun, Moon, Trash2, HelpCircle, Share, Info } from 'lucide-react-native';
import Card from '@/components/Card';
import CustomAlert from '@/components/CustomAlert';

export default function SettingsScreen() {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);
  const { clearAllTransactions } = useContext(TransactionsContext);
  const [showAlert, setShowAlert] = useState(false);

  const confirmReset = () => {
    setShowAlert(true);
  };

  const handleConfirmReset = () => {
    clearAllTransactions();
    setShowAlert(false);
  };

  const handleCancelReset = () => {
    setShowAlert(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>  
      <Modal
        visible={showAlert}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelReset}
      >
        <CustomAlert
          title="Restablecer Todos los Datos"
          message="Esto eliminará permanentemente todas tus transacciones. Esta acción no se puede deshacer."
          onConfirm={handleConfirmReset}
          onCancel={handleCancelReset}
          confirmText="Restablecer"
          cancelText="Cancelar"
        />
      </Modal>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Apariencia</Text>
      
      <Card style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            {theme === 'dark' ? (
              <Moon size={20} color={colors.text} />
            ) : (
              <Sun size={20} color={colors.text} />
            )}
            <Text style={[styles.settingText, { color: colors.text }]}>Tema Oscuro</Text>
          </View>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={theme === 'dark' ? colors.primary : '#f4f3f4'}
          />
        </View>
      </Card>
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Datos</Text>
      
      <Card style={[styles.card, { backgroundColor: colors.card }]}>
        <TouchableOpacity style={styles.settingRow} onPress={confirmReset}>
          <View style={styles.settingInfo}>
            <Trash2 size={20} color={colors.error} />
            <Text style={[styles.settingText, { color: colors.error }]}>Restablecer Todos los Datos</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Share size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Exportar Datos</Text>
          </View>
        </TouchableOpacity>
      </Card>
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Acerca de</Text>
      
      <Card style={[styles.card, { backgroundColor: colors.card }]}>
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <HelpCircle size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Ayuda y Soporte</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Info size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Acerca de WalletMate</Text>
          </View>
        </TouchableOpacity>
      </Card>
      
      <View style={styles.footer}>
        <Text style={[styles.version, { color: colors.textSecondary }]}>
          WalletMate v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    opacity: 0.2,
  },
  footer: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});