import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { Home, PieChart, Settings, BarChart3, Book } from 'lucide-react-native';
import { ThemeContext } from '@/context/ThemeContext';

export default function TabLayout() {
  const { theme, colors } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
          marginBottom: 5,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'WalletMate',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transacciones',
          tabBarIcon: ({ color, size }) => <BarChart3 size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({ color, size }) => <PieChart size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: 'Educación F.',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}