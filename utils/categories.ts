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
  { label: 'Food & Dining', value: 'food' },
  { label: 'Shopping', value: 'shopping' },
  { label: 'Housing', value: 'housing' },
  { label: 'Transportation', value: 'transportation' },
  { label: 'Travel', value: 'travel' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Technology', value: 'technology' },
  { label: 'Salary', value: 'salary' },
  { label: 'Gifts', value: 'gifts' },
  { label: 'Investments', value: 'investments' },
  { label: 'Bills', value: 'bills' },
  { label: 'Credit Card', value: 'credit' },
  { label: 'Other', value: 'other' },
];

export const getCategoryName = (value: string): string => {
  const category = categoryOptions.find(cat => cat.value === value);
  return category ? category.label : 'Other';
};

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'food':
      return Utensils;
    case 'shopping':
      return ShoppingBag;
    case 'housing':
      return Home;
    case 'transportation':
      return Car;
    case 'travel':
      return Plane;
    case 'entertainment':
      return Film;
    case 'healthcare':
      return Pill;
    case 'clothing':
      return Shirt;
    case 'technology':
      return Smartphone;
    case 'salary':
      return Briefcase;
    case 'gifts':
      return Gift;
    case 'investments':
      return DollarSign;
    case 'bills':
      return ReceiptText;
    case 'credit':
      return CreditCard;
    default:
      return Wallet;
  }
};

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'food':
      return '#FF6B6B';
    case 'shopping':
      return '#4ECDC4';
    case 'housing':
      return '#FFD166';
    case 'transportation':
      return '#06D6A0';
    case 'travel':
      return '#118AB2';
    case 'entertainment':
      return '#9C89B8';
    case 'healthcare':
      return '#EF476F';
    case 'clothing':
      return '#F78C6B';
    case 'technology':
      return '#073B4C';
    case 'salary':
      return '#06D6A0';
    case 'gifts':
      return '#9C89B8';
    case 'investments':
      return '#118AB2';
    case 'bills':
      return '#FF6B6B';
    case 'credit':
      return '#4ECDC4';
    default:
      return '#B5BAC1';
  }
};