import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Education() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📚 Educación Financiera</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔹 Mini-Artículos o Lecciones</Text>
        <Text style={styles.text}>* ¿Qué es el presupuesto personal?</Text>
        <Text style={styles.text}>* Diferencia entre gasto necesario y gasto impulsivo.</Text>
        <Text style={styles.text}>* ¿Qué es el fondo de emergencia?</Text>
        <Text style={styles.text}>* ¿Por qué deberías ahorrar el 10% de tus ingresos?</Text>
        <Text style={styles.text}>* Intereses simples vs. intereses compuestos.</Text>
        <Text style={styles.text}>* Cómo salir de deudas paso a paso.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔹 Consejo del Día</Text>
        <Text style={styles.text}>💡 “Antes de comprar algo, pregúntate: ¿lo necesito o solo lo deseo?”</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔹 Glosario Básico</Text>
        <Text style={styles.text}>* Activo, pasivo</Text>
        <Text style={styles.text}>* Ingreso, egreso</Text>
        <Text style={styles.text}>* Tasa de interés</Text>
        <Text style={styles.text}>* Crédito, débito</Text>
        <Text style={styles.text}>* Score crediticio</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
});