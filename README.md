# WalletMate

## 🌟 Bienvenido a WalletMate

WalletMate es una aplicación diseñada para ayudarte a administrar tus finanzas personales de manera sencilla y eficiente. Con una interfaz intuitiva y herramientas poderosas, WalletMate te permite llevar un control detallado de tus ingresos, gastos y balances mensuales.

---

## 🚀 Características Principales

### 📊 Dashboard Interactivo
- Visualiza tu **balance total** de manera clara.
- Consulta tus **ingresos** y **gastos** mensuales.
- Gráficos interactivos para analizar tus **gastos por categoría**.

### 📝 Gestión de Transacciones
- Agrega nuevas transacciones fácilmente.
- Consulta tus transacciones recientes.
- Filtra y organiza tus transacciones por categorías.
- **Exporta tus transacciones** en formato CSV para compartir o respaldar.

### 🎨 Personalización de Temas
- Cambia entre temas claros y oscuros para una experiencia visual personalizada.

---

## 🛠️ Tecnologías Utilizadas

- **React Native**: Para la construcción de la interfaz de usuario.
- **Expo Router**: Para la navegación dentro de la aplicación.
- **Context API**: Para la gestión del estado global (temas y transacciones).
- **react-native-svg-charts**: Para la visualización de gráficos.
- **expo-file-system** y **expo-sharing**: Para la exportación y compartición de archivos.

---

## 📂 Estructura del Proyecto

```
walletmate/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Pantalla principal del Dashboard
│   │   ├── settings.tsx       # Configuración de la aplicación
│   │   ├── statistics.tsx     # Estadísticas detalladas
│   │   ├── transactions.tsx   # Listado de transacciones
│   ├── transaction/
│       ├── [id].tsx           # Detalles de una transacción
│       ├── new.tsx            # Crear una nueva transacción
├── components/
│   ├── AboutModal.tsx         # Modal para mostrar información sobre la app
│   ├── Card.tsx               # Componente de tarjeta reutilizable
│   ├── CategoryPicker.tsx     # Selector de categorías
│   ├── CustomAlert.tsx        # Alerta personalizada
│   ├── DatePicker.tsx         # Selector de fechas
│   ├── EditTransactionModal.tsx # Modal para editar transacciones
│   ├── ExportAlert.tsx        # Alerta para exportar transacciones
│   ├── FilterModal.tsx        # Modal para filtrar transacciones
│   ├── Header.tsx             # Encabezado reutilizable
│   ├── TransactionCard.tsx    # Componente para mostrar transacciones
├── context/
│   ├── ThemeContext.tsx       # Contexto para la gestión de temas
│   ├── TransactionsContext.tsx # Contexto para la gestión de transacciones
├── hooks/
│   ├── useFrameworkReady.ts   # Hook para verificar si el framework está listo
├── utils/
│   ├── categories.ts          # Utilidades para categorías
│   ├── dateUtils.ts           # Utilidades para manejo de fechas
│   ├── formatters.ts          # Formateadores de datos
│   ├── exportUtils.ts         # Funciones para exportar transacciones
├── assets/
│   ├── images/                # Imágenes y recursos gráficos
│       ├── WalletMate.png     # Captura de pantalla del Dashboard
```

---

## 📖 Cómo Empezar

### 1️⃣ Instalación
Clona este repositorio y ejecuta el siguiente comando para instalar las dependencias:
```bash
npm install
```

### 2️⃣ Ejecución
Inicia la aplicación en modo desarrollo con:
```bash
npm start
```

### 3️⃣ Construcción
Para generar una versión lista para producción:
```bash
npm run build
```

---

## 🧪 Pruebas

Actualmente, WalletMate no incluye un conjunto de pruebas automatizadas. Sin embargo, puedes contribuir agregando pruebas unitarias o de integración utilizando herramientas como Jest o React Testing Library.

---

## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Envía un pull request.

---

## 📜 Licencia
Este proyecto está protegido por una licencia propietaria. Todos los derechos están reservados por Neftali Arturo Hernández Vergara. Está estrictamente prohibido copiar, modificar, distribuir o utilizar este software sin autorización explícita. Consulta el archivo `LICENSE` para más detalles.

---

## 📧 Contacto
Si tienes preguntas o sugerencias, no dudes en contactarnos:
- **Email**: neftaliarturohernandez@gmail.com
- **Sitio Web**: [Nefta11Dev](https://neftalivergaraportafolio.netlify.app/)

---

¡Gracias por usar WalletMate! 💰
