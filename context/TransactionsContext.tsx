import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startOfMonth, endOfMonth, isSameMonth, isSameYear, addMonths } from 'date-fns';
import { Transaction, MonthlyTotal, CategoryTotal } from '@/types';

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  clearAllTransactions: () => void;
  getMonthlyTotals: (date: Date) => { income: number; expenses: number; balance: number };
  getCategoryTotals: (date: Date) => CategoryTotal[];
  getMonthlyData: (year: number) => MonthlyTotal[];
}

export const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
  clearAllTransactions: () => {},
  getMonthlyTotals: () => ({ income: 0, expenses: 0, balance: 0 }),
  getCategoryTotals: () => [],
  getMonthlyData: () => [],
});

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const STORAGE_KEY = '@walletmate_transactions';

  // Load transactions from storage
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error('Error loading transactions', error);
      }
    };

    loadTransactions();
  }, []);

  // Save transactions to storage
  const saveTransactions = async (updatedTransactions: Transaction[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    } catch (error) {
      console.error('Error saving transactions', error);
    }
  };

  // Add a transaction
  const addTransaction = (transaction: Transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  // Clear all transactions
  const clearAllTransactions = () => {
    setTransactions([]);
    saveTransactions([]);
  };

  // Get monthly totals
  const getMonthlyTotals = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    let income = 0;
    let expenses = 0;
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      if (transactionDate >= start && transactionDate <= end) {
        if (transaction.amount > 0) {
          income += transaction.amount;
        } else {
          expenses += transaction.amount;
        }
      }
    });
    
    return {
      income,
      expenses,
      balance: income + expenses
    };
  };

  // Get category totals for a month
  const getCategoryTotals = (date: Date): CategoryTotal[] => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    const categoryMap = new Map<string, number>();
    
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      if (
        transactionDate >= start && 
        transactionDate <= end && 
        transaction.amount < 0 // Only expenses
      ) {
        const currentAmount = categoryMap.get(transaction.category) || 0;
        categoryMap.set(transaction.category, currentAmount + transaction.amount);
      }
    });
    
    // Convert map to array and sort by amount (largest expense first)
    return Array.from(categoryMap.entries())
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => a.amount - b.amount);
  };

  // Get monthly data for bar chart
  const getMonthlyData = (year: number): MonthlyTotal[] => {
    const monthlyData: MonthlyTotal[] = [];
    
    // Initialize data for all 12 months
    for (let i = 0; i < 12; i++) {
      monthlyData.push({
        month: i,
        income: 0,
        expenses: 0
      });
    }
    
    // Calculate totals for each month
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      
      if (isSameYear(transactionDate, new Date(year, 0, 1))) {
        const month = transactionDate.getMonth();
        
        if (transaction.amount > 0) {
          monthlyData[month].income += transaction.amount;
        } else {
          monthlyData[month].expenses += transaction.amount;
        }
      }
    });
    
    return monthlyData;
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        clearAllTransactions,
        getMonthlyTotals,
        getCategoryTotals,
        getMonthlyData,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};