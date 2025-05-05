import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const handleExport = async (transactions) => {
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