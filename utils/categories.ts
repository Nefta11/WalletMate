import { 
  ShoppingBag, 
  Utensils, 
  Home, 
  Car, 
  Plane, 
  Film, 
  Pill, 
  Shirt, 
  Smartphone, 
  Briefcase, 
  Gift, 
  DollarSign,
  ReceiptText,
  CreditCard,
  Wallet
} from 'lucide-react-native';

export const categoryOptions = [
  { label: 'Comida y Cena', value: 'comida' },
  { label: 'Compras', value: 'compras' },
  { label: 'Vivienda', value: 'vivienda' },
  { label: 'Transporte', value: 'transporte' },
  { label: 'Viajes', value: 'viajes' },
  { label: 'Entretenimiento', value: 'entretenimiento' },
  { label: 'Salud', value: 'salud' },
  { label: 'Ropa', value: 'ropa' },
  { label: 'Tecnología', value: 'tecnologia' },
  { label: 'Salario', value: 'salario' },
  { label: 'Regalos', value: 'regalos' },
  { label: 'Inversiones', value: 'inversiones' },
  { label: 'Facturas', value: 'facturas' },
  { label: 'Tarjeta de Crédito', value: 'credito' },
  { label: 'Otros', value: 'otros' },
];

export const getCategoryName = (value: string): string => {
  const category = categoryOptions.find(cat => cat.value === value);
  return category ? category.label : 'Otros';
};

export const getCategoryIcon = (categoria: string) => {
  switch (categoria) {
    case 'comida':
      return Utensils;
    case 'compras':
      return ShoppingBag;
    case 'vivienda':
      return Home;
    case 'transporte':
      return Car;
    case 'viajes':
      return Plane;
    case 'entretenimiento':
      return Film;
    case 'salud':
      return Pill;
    case 'ropa':
      return Shirt;
    case 'tecnologia':
      return Smartphone;
    case 'salario':
      return Briefcase;
    case 'regalos':
      return Gift;
    case 'inversiones':
      return DollarSign;
    case 'facturas':
      return ReceiptText;
    case 'credito':
      return CreditCard;
    default:
      return Wallet;
  }
};

export const getCategoryColor = (categoria: string): string => {
  switch (categoria) {
    case 'comida':
      return '#FF6B6B';
    case 'compras':
      return '#4ECDC4';
    case 'vivienda':
      return '#FFD166';
    case 'transporte':
      return '#06D6A0';
    case 'viajes':
      return '#118AB2';
    case 'entretenimiento':
      return '#9C89B8';
    case 'salud':
      return '#EF476F';
    case 'ropa':
      return '#F78C6B';
    case 'tecnologia':
      return '#073B4C';
    case 'salario':
      return '#06D6A0';
    case 'regalos':
      return '#9C89B8';
    case 'inversiones':
      return '#118AB2';
    case 'facturas':
      return '#FF6B6B';
    case 'credito':
      return '#4ECDC4';
    default:
      return '#B5BAC1';
  }
};