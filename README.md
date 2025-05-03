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

### 🎨 Personalización de Temas
- Cambia entre temas claros y oscuros para una experiencia visual personalizada.

---

## 🛠️ Tecnologías Utilizadas

- **React Native**: Para la construcción de la interfaz de usuario.
- **Expo Router**: Para la navegación dentro de la aplicación.
- **Context API**: Para la gestión del estado global (temas y transacciones).
- **react-native-svg-charts**: Para la visualización de gráficos.

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
│   ├── Card.tsx               # Componente de tarjeta reutilizable
│   ├── TransactionCard.tsx    # Componente para mostrar transacciones
├── context/
│   ├── ThemeContext.tsx       # Contexto para la gestión de temas
│   ├── TransactionsContext.tsx # Contexto para la gestión de transacciones
├── utils/
│   ├── categories.ts          # Utilidades para categorías
│   ├── dateUtils.ts           # Utilidades para manejo de fechas
│   ├── formatters.ts          # Formateadores de datos
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

## 🖼️ Capturas de Pantalla

### Dashboard
![Dashboard](assets/images/WalletMate.png)

---

## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si deseas colaborar, por favor sigue estos pasos:
1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Envía un pull request.

---

## 📜 Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
[text](app/(tabs)/index.tsx)
---

## 📧 Contacto
Si tienes preguntas o sugerencias, no dudes en contactarnos:
- **Email**: support@walletmate.com
- **Sitio Web**: [www.walletmate.com](http://www.walletmate.com)

---

¡Gracias por usar WalletMate! 💰
