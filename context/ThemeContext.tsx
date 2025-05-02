import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark';

interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  success: string;
  error: string;
}

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: ThemeColors;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
  colors: {
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    primary: '#06B6D4', // teal
    success: '#10B981', // green
    error: '#EF4444', // red
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme as ThemeType || 'light');
  const STORAGE_KEY = '@walletmate_theme';
  
  // Light theme colors
  const lightColors: ThemeColors = {
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
    border: '#E0E0E0',
    primary: '#06B6D4', // teal
    success: '#10B981', // green
    error: '#EF4444', // red
  };
  
  // Dark theme colors
  const darkColors: ThemeColors = {
    background: '#121212',
    card: '#1E1E1E',
    text: '#F5F5F5',
    textSecondary: '#BBBBBB',
    border: '#333333',
    primary: '#22D3EE', // lighter teal
    success: '#34D399', // lighter green
    error: '#F87171', // lighter red
  };
  
  // Load theme from storage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTheme) {
          setTheme(storedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Error loading theme', error);
      }
    };
    
    loadTheme();
  }, []);
  
  // Toggle theme
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme', error);
    }
  };
  
  // Get colors based on current theme
  const colors = theme === 'light' ? lightColors : darkColors;
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};