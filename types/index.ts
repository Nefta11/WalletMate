export interface Transaction {
  id: string;
  amount: number; // Positive for income, negative for expense
  category: string;
  note: string;
  date: string; // ISO string
}

export interface CategoryTotal {
  name: string;
  amount: number;
}

export interface MonthlyTotal {
  month: number;
  income: number;
  expenses: number;
}