import { useContext, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import { TransactionsContext } from '@/context/TransactionsContext';
import { Sun, Moon, Trash2, HelpCircle, Share, Info } from 'lucide-react-native';
import Card from '@/components/Card';
import CustomAlert from '@/components/CustomAlert';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function SettingsScreen() {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);
  const { clearAllTransactions, transactions } = useContext(TransactionsContext);
  const [showAlert, setShowAlert] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showExportAlert, setShowExportAlert] = useState(false);

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

  const handleExport = async () => {
    if (!transactions || transactions.length === 0) {
      alert('No hay transacciones para exportar.');
      return;
    }

    // Encabezados CSV
    const header = 'ID,Monto,Categoría,Nota,Fecha\n';
    // Filas CSV con formato mejorado
    const rows = transactions.map(t =>
      `${t.id},${t.amount.toFixed(2)},"${t.category}","${t.note.replace(/"/g, '""')}",${new Date(t.date).toLocaleDateString('es-ES')}`
    );
    const csv = header + rows.join('\n');

    // Guardar archivo temporal
    const fileUri = FileSystem.cacheDirectory + 'walletmate_transacciones.csv';
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });

    // Compartir archivo
    try {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Exportar transacciones',
        UTI: 'public.comma-separated-values-text',
      });
    } catch (error) {
      alert('No se pudo compartir el archivo.');
    }
  };

  const confirmExport = () => {
    setShowExportAlert(true);
  };

  const handleConfirmExport = () => {
    setShowExportAlert(false);
    handleExport();
  };

  const handleCancelExport = () => {
    setShowExportAlert(false);
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

      {/* CustomAlert para confirmar exportación */}
      <Modal
        visible={showExportAlert}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelExport}
      >
        <CustomAlert
          title="Exportar Datos"
          message="¿Estás seguro de que deseas exportar tus transacciones?"
          onConfirm={handleConfirmExport}
          onCancel={handleCancelExport}
          confirmText="Exportar"
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

        <TouchableOpacity style={styles.settingRow} onPress={confirmExport}>
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

        <TouchableOpacity style={styles.settingRow} onPress={() => setShowAboutModal(true)}>
          <View style={styles.settingInfo}>
            <Info size={20} color={colors.text} />
            <Text style={[styles.settingText, { color: colors.text }]}>Acerca de WalletMate</Text>
          </View>
        </TouchableOpacity>
      </Card>

      {/* Modal Acerca de WalletMate */}
      <Modal
        visible={showAboutModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 24, width: '85%', alignItems: 'center' }}>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
              <Image source={require('../../assets/images/WalletMate-removebg-preview.png')} style={{ width: 70, height: 70, marginBottom: -15 }} resizeMode="contain" />
            </View>
            <Text style={{ fontSize: 20, fontFamily: 'Inter-SemiBold', color: colors.primary, marginBottom: 12, textAlign: 'center' }}>Acerca de WalletMate</Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 10, textAlign: 'center' }}>
              WalletMate es una aplicación diseñada para ayudarte a gestionar tus finanzas personales de manera sencilla y eficiente. Permite registrar tus ingresos y gastos, visualizar estadísticas y aprender sobre educación financiera.
            </Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-SemiBold', marginTop: 10 }}>¿Qué busca?</Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 10 }}>
              WalletMate busca empoderar a los usuarios para que tomen el control de su dinero, tomen mejores decisiones y alcancen sus metas financieras.
            </Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-SemiBold', marginTop: 10 }}>Misión</Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 10 }}>
              Brindar una herramienta intuitiva y educativa que facilite la administración financiera y fomente el aprendizaje sobre finanzas personales.
            </Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-SemiBold', marginTop: 10 }}>Visión</Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 10 }}>
              Ser la app de referencia en educación y gestión financiera personal en Latinoamérica.
            </Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-SemiBold', marginTop: 10 }}>Desarrollador</Text>
            <Text style={{ color: colors.text, fontFamily: 'Inter-Regular', fontSize: 15, marginBottom: 16 }}>
              WalletMate fue desarrollada por Neftali Vergara, apasionado por la tecnología y la educación financiera.
            </Text>
            <TouchableOpacity onPress={() => setShowAboutModal(false)} style={{ alignSelf: 'center', marginTop: 8, padding: 10 }}>
              <Text style={{ color: colors.primary, fontFamily: 'Inter-SemiBold', fontSize: 16 }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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