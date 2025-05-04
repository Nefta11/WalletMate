import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Animated,
    Modal,
    Dimensions
} from 'react-native';
import { ThemeContext } from '@/context/ThemeContext';
import Header from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Componente para las tarjetas de lecciones
const LessonCard = ({ title, emoji, description, onPress, colors, isCompleted }) => {
    const [scaleAnim] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.lessonCard, { backgroundColor: colors.card }]}
            >
                <View style={styles.lessonCardContent}>
                    <View style={styles.lessonHeader}>
                        <Text style={styles.lessonEmoji}>{emoji}</Text>
                        <View style={styles.lessonTextContainer}>
                            <Text style={[styles.lessonTitle, { color: colors.text }]}>{title}</Text>
                            <Text style={[styles.lessonDescription, { color: colors.textSecondary }]}>
                                {description}
                            </Text>
                        </View>
                    </View>
                    {isCompleted && (
                        <View style={[styles.completedBadge, { backgroundColor: colors.success }]}>
                            <Ionicons name="checkmark" size={16} color="#fff" />
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

// Componente para el glosario expandible
const GlossaryItem = ({ term, definition, colors }) => {
    const [expanded, setExpanded] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const toggleExpand = () => {
        const finalValue = expanded ? 0 : 1;
        setExpanded(!expanded);

        Animated.spring(animation, {
            toValue: finalValue,
            useNativeDriver: false,
        }).start();
    };

    const heightInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 80],
    });

    const rotateInterpolate = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <TouchableOpacity
            onPress={toggleExpand}
            style={[styles.glossaryItem, { backgroundColor: colors.card }]}
        >
            <View style={styles.glossaryHeader}>
                <Text style={[styles.glossaryTerm, { color: colors.text }]}>{term}</Text>
                <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
                    <Ionicons name="chevron-down" size={24} color={colors.primary} />
                </Animated.View>
            </View>
            <Animated.View style={{ height: heightInterpolate, overflow: 'hidden' }}>
                <Text style={[styles.glossaryDefinition, { color: colors.textSecondary }]}>
                    {definition}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default function Education() {
    const { colors } = useContext(ThemeContext);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);

    const lessons = [
        {
            id: 1,
            title: "¿Qué es el presupuesto personal?",
            emoji: "📊",
            description: "Aprende a organizar tus finanzas",
            content: "Un presupuesto personal es una herramienta financiera que te ayuda a planificar cómo vas a gastar tu dinero. Consiste en listar todos tus ingresos y gastos para tener un control sobre tu economía personal.\n\n¿Por qué es importante?\n• Te ayuda a vivir dentro de tus posibilidades\n• Identifica gastos innecesarios\n• Facilita el ahorro\n• Reduce el estrés financiero\n• Mejora tu relación con el dinero\n\nPasos detallados para crear tu presupuesto:\n\n1. Lista todos tus ingresos mensuales\n   • Salario neto (después de impuestos)\n   • Ingresos adicionales\n   • Comisiones o bonos\n   • Otros ingresos pasivos\n\n2. Registra todos tus gastos fijos\n   • Renta o hipoteca\n   • Servicios (luz, agua, gas)\n   • Internet y teléfono\n   • Seguros\n   • Deudas fijas\n\n3. Anota tus gastos variables\n   • Alimentación\n   • Transporte\n   • Entretenimiento\n   • Ropa\n   • Gastos médicos\n\n4. Categoriza tus gastos\n   • Necesarios: 50% de tus ingresos\n   • Deseos: 30% de tus ingresos\n   • Ahorro/Inversión: 20% de tus ingresos\n\n5. Ajusta según tus metas\n   • Identifica áreas de recorte\n   • Prioriza tus objetivos financieros\n   • Revisa y ajusta mensualmente\n\nHerramientas útiles:\n• Apps de presupuesto\n• Hojas de cálculo\n• Método de sobres\n• Registro manual\n\nErrores comunes a evitar:\n• No incluir todos los gastos\n• No tener un fondo de emergencia\n• Ser demasiado restrictivo\n• No revisar regularmente"
        },
        {
            id: 2,
            title: "Gasto necesario vs. impulsivo",
            emoji: "🛒",
            description: "Toma mejores decisiones de compra",
            content: "Entender la diferencia entre gastos necesarios e impulsivos es fundamental para mantener finanzas saludables.\n\nGastos necesarios:\n• Son esenciales para vivir dignamente\n• Incluyen: vivienda, alimentación básica, salud\n• Servicios básicos: agua, luz, gas\n• Transporte para trabajar\n• Educación y desarrollo profesional\n• Seguros básicos\n\nGastos impulsivos:\n• Compras no planificadas\n• Motivadas por emociones momentáneas\n• Responden a deseos, no necesidades\n• Pueden desequilibrar tu presupuesto\n• Generan arrepentimiento posterior\n\nSeñales de compra impulsiva:\n• Sensación de urgencia\n• \"Es una oferta que no puedo perder\"\n• Comprar para sentirse mejor\n• No estaba en tu lista\n• Usar tarjeta de crédito sin pensar\n\nEstrategias para controlar impulsos:\n\n1. Regla de las 24-48 horas\n   • Espera antes de comprar\n   • Reflexiona sobre la necesidad real\n   • Consulta tu presupuesto\n\n2. Lista de compras\n   • Planifica antes de salir\n   • Apégate estrictamente a ella\n   • Evita pasillos innecesarios\n\n3. Método HALT\n   No compres si estás:\n   • Hungry (Hambriento)\n   • Angry (Enojado)\n   • Lonely (Solo)\n   • Tired (Cansado)\n\n4. Presupuesto para gustos\n   • Asigna un monto mensual\n   • Disfruta sin culpa dentro del límite\n   • Ahorra para compras grandes\n\n5. Alternativas saludables\n   • Sal a caminar en vez de al mall\n   • Practica hobbies gratuitos\n   • Reúnete con amigos en casa\n\n6. Técnicas de mindfulness\n   • Respira profundo antes de comprar\n   • Pregúntate: ¿Esto mejora mi vida?\n   • Visualiza tu meta financiera\n\nBeneficios de controlar impulsos:\n• Mayor ahorro mensual\n• Menos estrés financiero\n• Mejor calidad de vida\n• Logro de metas financieras"
        },
        {
            id: 3,
            title: "Fondo de emergencia",
            emoji: "🏦",
            description: "Tu red de seguridad financiera",
            content: "Un fondo de emergencia es tu escudo financiero contra imprevistos. Es dinero reservado exclusivamente para situaciones inesperadas que requieren recursos inmediatos.\n\n¿Qué ES una emergencia?\n• Gastos médicos urgentes no cubiertos\n• Reparaciones críticas del hogar\n• Reparación del auto (si es tu medio de trabajo)\n• Pérdida repentina de empleo\n• Emergencias familiares graves\n• Gastos funerarios inesperados\n\n¿Qué NO es una emergencia?\n• Vacaciones\n• Ropa nueva\n• Última tecnología\n• Ofertas \"imperdibles\"\n• Remodelaciones no urgentes\n• Celebraciones\n\n¿Cuánto debo ahorrar?\n\nNivel básico:\n• $1,000 USD o equivalente\n• Meta inicial alcanzable\n• Cubre emergencias menores\n\nNivel intermedio:\n• 3 meses de gastos esenciales\n• Protección contra desempleo corto\n• Mayor tranquilidad\n\nNivel ideal:\n• 6 meses de gastos totales\n• Protección robusta\n• Libertad para cambios laborales\n\nSituaciones especiales:\n• Freelancers: 9-12 meses\n• Familia monoparental: 9 meses\n• Condiciones médicas: 12 meses\n• Trabajo inestable: 9-12 meses\n\n¿Cómo construirlo?\n\n1. Calcula tu meta:\n   • Suma gastos mensuales esenciales\n   • Multiplica por meses objetivo\n   • Establece meta realista\n\n2. Plan de ahorro:\n   • Automatiza transferencias\n   • Comienza con montos pequeños\n   • Aumenta gradualmente\n   • Usa bonos/ingresos extra\n\n3. Estrategias rápidas:\n   • Vende artículos no usados\n   • Trabajo temporal extra\n   • Reduce gastos temporalmente\n   • Redirige reembolsos de impuestos\n\n¿Dónde guardarlo?\n\nCaracterísticas ideales:\n• Liquidez inmediata\n• Separado de cuenta principal\n• Genera algún interés\n• Sin penalizaciones por retiro\n• Acceso 24/7\n\nOpciones recomendadas:\n• Cuenta de ahorro de alta rentabilidad\n• Cuenta de mercado monetario\n• CETES de corto plazo (28 días)\n• Fondos de inversión líquidos\n\nEvita:\n• Efectivo en casa (inseguro)\n• Inversiones de largo plazo\n• Criptomonedas (muy volátiles)\n• Cuenta corriente principal\n\nReglas de uso:\n\n1. Solo para verdaderas emergencias\n2. Reponer inmediatamente después de usar\n3. Revisar monto cada 6 meses\n4. Ajustar según cambios de vida\n5. No mezclar con otros ahorros\n\nBeneficios psicológicos:\n• Reduce estrés financiero\n• Mejora calidad del sueño\n• Mayor confianza en decisiones\n• Libertad para tomar riesgos calculados\n• Evita deudas por emergencias\n\nRecuerda: Un fondo de emergencia no es un lujo, es una necesidad. Comienza hoy mismo, aunque sea con $100."
        },
        {
            id: 4,
            title: "La regla del 10% de ahorro",
            emoji: "💰",
            description: "Construye tu futuro financiero",
            content: "La regla del 10% es un principio fundamental de finanzas personales que sugiere ahorrar al menos el 10% de todos tus ingresos. Es el primer paso hacia la libertad financiera.\n\n¿Por qué el 10%?\n• Porcentaje manejable para la mayoría\n• Crea disciplina financiera\n• Se acumula significativamente\n• Base para aumentar gradualmente\n• Equilibrio entre presente y futuro\n\nLa matemática del 10%:\n\nEjemplo con ingreso de $10,000:\n• Ahorro mensual: $1,000\n• Ahorro anual: $12,000\n• En 5 años: $60,000\n• En 10 años: $120,000\n• Con interés compuesto (7%): $173,000\n\nCómo implementar la regla:\n\n1. Págate primero a ti mismo\n   • Aparta el 10% inmediatamente\n   • Antes de pagar cualquier gasto\n   • Trátalo como obligación\n\n2. Automatización bancaria\n   • Configura transferencia automática\n   • El día que recibes tu ingreso\n   • A cuenta separada de ahorros\n   • No toques ese dinero\n\n3. Estrategia progresiva\n   • Mes 1-3: 5% si el 10% es difícil\n   • Mes 4-6: 7%\n   • Mes 7+: 10%\n   • Meta futura: 15-20%\n\n4. Manejo de ingresos variables\n   • Freelancers: 10% de cada pago\n   • Comisiones: 10% de cada bono\n   • Siempre el 10%, sin excusas\n\n¿Qué hacer con ese 10%?\n\n1. Primeros 6 meses:\n   • Construye fondo de emergencia\n   • Cuenta de ahorro segura\n   • Liquidez inmediata\n\n2. Siguientes 6 meses:\n   • 50% fondo de emergencia\n   • 50% inversiones básicas\n\n3. Año 2 en adelante:\n   • 30% fondo emergencia (hasta completar)\n   • 40% inversiones mediano plazo\n   • 30% inversiones largo plazo\n\nOpciones de inversión:\n\nBajo riesgo:\n• CETES\n• Pagarés bancarios\n• Fondos de deuda\n\nMedio riesgo:\n• Fondos indexados\n• ETFs diversificados\n• Bonos corporativos\n\nLargo plazo:\n• Acciones\n• Bienes raíces\n• Fondos de retiro\n\nObstáculos comunes:\n\n\"No me alcanza para ahorrar 10%\"\n• Revisa gastos hormiga\n• Elimina suscripciones no usadas\n• Cocina más en casa\n• Busca ingresos adicionales\n\n\"Tengo deudas que pagar\"\n• Destina 5% a deudas, 5% a ahorro\n• Prioriza deudas de alto interés\n• No dejes de ahorrar completamente\n\n\"Prefiero disfrutar ahora\"\n• El ahorro también es para disfrutar\n• Planea metas específicas\n• Recompénsate al alcanzar hitos\n\nBeneficios comprobados:\n\nCorto plazo (1-2 años):\n• Colchón financiero\n• Menos estrés por dinero\n• Mejor manejo de emergencias\n\nMediano plazo (3-5 años):\n• Capital para oportunidades\n• Posibilidad de inversiones mayores\n• Inicio de patrimonio\n\nLargo plazo (10+ años):\n• Libertad financiera\n• Retiro digno\n• Legado familiar\n• Opciones de vida\n\nEl poder del incremento:\n• Año 1: 10%\n• Año 2: 12%\n• Año 3: 15%\n• Meta ideal: 20-30%\n\nRecuerda: El mejor momento para empezar fue ayer, el segundo mejor momento es HOY. Comienza con lo que puedas, aunque sea 5%, y aumenta gradualmente."
        },
        {
            id: 5,
            title: "Interés simple vs. compuesto",
            emoji: "📈",
            description: "El poder del crecimiento exponencial",
            content: "Comprender la diferencia entre interés simple y compuesto puede transformar tu futuro financiero. Einstein llamó al interés compuesto \"la octava maravilla del mundo\".\n\nInterés Simple:\n• Se calcula SOLO sobre el capital inicial\n• No se reinvierten las ganancias\n• Crecimiento lineal y predecible\n• Fórmula: I = Capital × Tasa × Tiempo\n\nEjemplo interés simple:\nCapital: $10,000\nTasa: 10% anual\nTiempo: 5 años\n\nAño 1: $10,000 × 10% = $1,000\nAño 2: $10,000 × 10% = $1,000\nAño 3: $10,000 × 10% = $1,000\nAño 4: $10,000 × 10% = $1,000\nAño 5: $10,000 × 10% = $1,000\nTotal: $15,000\n\nInterés Compuesto:\n• Se calcula sobre capital + intereses previos\n• Reinversión automática de ganancias\n• Crecimiento exponencial\n• Fórmula: VF = Capital × (1 + tasa)^tiempo\n\nEjemplo interés compuesto:\nCapital: $10,000\nTasa: 10% anual\nTiempo: 5 años\n\nAño 1: $10,000 × 10% = $11,000\nAño 2: $11,000 × 10% = $12,100\nAño 3: $12,100 × 10% = $13,310\nAño 4: $13,310 × 10% = $14,641\nAño 5: $14,641 × 10% = $16,105\nTotal: $16,105\n\nDiferencia: $1,105 extra con interés compuesto\n\nEl factor tiempo - Ejemplos impactantes:\n\n$1,000 mensuales al 8% anual:\n• 10 años: $184,166\n• 20 años: $592,947\n• 30 años: $1,500,295\n• 40 años: $3,554,567\n\nRegla del 72:\nPara saber cuándo se duplica tu dinero:\n72 ÷ tasa de interés = años para duplicar\n\nEjemplos:\n• 6% anual: 72÷6 = 12 años\n• 8% anual: 72÷8 = 9 años\n• 10% anual: 72÷10 = 7.2 años\n• 12% anual: 72÷12 = 6 años\n\nAplicaciones prácticas:\n\nInversiones que aprovechan interés compuesto:\n• Fondos indexados\n• ETFs con reinversión\n• Acciones con dividendos reinvertidos\n• Cuentas de retiro\n• Seguros con valor en efectivo\n\nDeudas que sufren interés compuesto:\n• Tarjetas de crédito\n• Préstamos estudiantiles\n• Hipotecas (parcialmente)\n• Préstamos personales\n\nEstrategias para maximizar:\n\n1. Comienza temprano\n   • A los 20 vs 30 años = ENORME diferencia\n   • Ejemplo: $200/mes desde los 20\n   • A los 65: $1,075,000 (8% anual)\n   • Empezando a los 30: solo $450,000\n\n2. Sé consistente\n   • Aportes regulares\n   • No interrumpas el proceso\n   • Automatiza inversiones\n\n3. Reinvierte TODO\n   • Dividendos\n   • Intereses\n   • Ganancias de capital\n\n4. Aumenta aportes\n   • Incrementa con inflación\n   • Destina aumentos salariales\n   • Invierte bonos anuales\n\n5. Minimiza comisiones\n   • Busca costos bajos\n   • Evita intermediarios excesivos\n   • Compara opciones\n\nEjemplo real inspirador:\nUna persona que invierte $300 mensuales desde los 25 años con un retorno del 8% anual, tendrá:\n• A los 35: $57,000\n• A los 45: $184,000\n• A los 55: $472,000\n• A los 65: $1,050,000\n\n¡El tiempo es tu mejor aliado! Cada día que esperas es dinero que pierdes. Comienza HOY, aunque sea con poco."
        },
        {
            id: 6,
            title: "Cómo salir de deudas",
            emoji: "🎯",
            description: "Plan estratégico para liberarte",
            content: "Un plan estructurado para eliminar tus deudas y recuperar tu libertad financiera.\n\nPaso 1: Evalúa tu situación actual\n• Lista TODAS tus deudas:\n  - Tarjetas de crédito\n  - Préstamos personales\n  - Hipoteca\n  - Préstamos estudiantiles\n  - Deudas con familiares\n• Anota para cada deuda:\n  - Saldo total\n  - Tasa de interés\n  - Pago mínimo mensual\n  - Fecha de vencimiento\n\nPaso 2: Elige tu estrategia\n\nMétodo Bola de Nieve:\n• Ordena deudas de menor a mayor saldo\n• Paga mínimos en todas\n• Ataca agresivamente la más pequeña\n• Ventaja: victorias rápidas, motivación\n\nMétodo Avalancha:\n• Ordena por tasa de interés (mayor a menor)\n• Paga mínimos en todas\n• Ataca la de mayor interés\n• Ventaja: ahorras más en intereses\n\nPaso 3: Crea tu plan de ataque\n• Elabora un presupuesto estricto\n• Identifica gastos eliminables:\n  - Suscripciones no usadas\n  - Comidas fuera de casa\n  - Compras impulsivas\n• Genera ingresos extra:\n  - Trabajo freelance\n  - Venta de artículos no usados\n  - Horas extras\n• Destina TODO excedente a deudas\n\nPaso 4: Estrategias avanzadas\n• Negocia con acreedores:\n  - Reducción de tasas\n  - Planes de pago\n  - Quitas (en casos extremos)\n• Consolida deudas (con cuidado)\n• Evita nuevos créditos\n• Construye fondo de emergencia básico\n\nPaso 5: Mantén el rumbo\n• Revisa progreso mensualmente\n• Celebra cada deuda pagada\n• Visualiza tu meta\n• Busca apoyo (amigos, familia)\n• Mantén un diario financiero\n\nErrores comunes a evitar:\n• Pagar solo mínimos\n• Usar ahorros sin plan\n• Adquirir nuevas deudas\n• Rendirse ante contratiempos\n• No tener fondo de emergencia\n\nSeñales de progreso:\n• Reducción de estrés\n• Mayor control financiero\n• Mejora en score crediticio\n• Capacidad de ahorro\n\nRecuerda: Salir de deudas es un maratón, no una carrera de velocidad. ¡Cada pago cuenta!"
        },
        {
            id: 7,
            title: "El SAT y tus finanzas",
            emoji: "🏛️",
            description: "Todo sobre RFC, e.firma y facturación",
            content: "Guía completa sobre el Servicio de Administración Tributaria (SAT) y su importancia en tus finanzas personales.\n\n¿Qué es el RFC?\nEl Registro Federal de Contribuyentes (RFC) es tu identificación fiscal ante el SAT:\n• Personas físicas: 13 caracteres\n• Personas morales: 12 caracteres\n• Se compone de: iniciales, fecha de nacimiento y homoclave\n• Obligatorio para actividades económicas\n\n¿Para qué sirve el RFC?\n• Realizar declaraciones fiscales\n• Emitir y recibir facturas\n• Abrir cuentas bancarias\n• Realizar trámites gubernamentales\n• Acceder a créditos formales\n• Deducir gastos personales\n\n¿Qué es la e.firma?\n• Firma electrónica avanzada\n• Equivalente a tu firma autógrafa\n• Mayor seguridad que la contraseña\n• Vigencia de 4 años\n• Permite realizar todos los trámites en línea\n\nUsos de la e.firma:\n• Presentar declaraciones anuales\n• Emitir facturas electrónicas\n• Realizar trámites fiscales\n• Firmar contratos digitales\n• Acceder a servicios gubernamentales\n\nVentajas de facturar:\n\n1. Para personas físicas:\n• Deducir gastos médicos\n• Deducir colegiaturas\n• Deducir intereses hipotecarios\n• Recuperar saldo a favor de ISR\n• Acceso a créditos formales\n• Crear historial fiscal\n\n2. Para emprendedores:\n• Formalizar tu negocio\n• Acceder a proveedores formales\n• Participar en licitaciones\n• Deducir gastos del negocio\n• Acceder a financiamiento\n• Credibilidad comercial\n\nRégimenes fiscales más comunes:\n\n1. Asalariados:\n• Ingresos por salario\n• Retención automática de ISR\n• Declaración anual (opcional/obligatoria)\n\n2. RIF (Régimen de Incorporación Fiscal):\n• Para pequeños negocios\n• Ingresos hasta 2 millones anuales\n• Beneficios fiscales por 10 años\n• Declaraciones bimestrales\n\n3. Actividad Empresarial:\n• Para negocios establecidos\n• Sin límite de ingresos\n• Declaraciones mensuales\n• Contabilidad formal\n\n4. Servicios Profesionales:\n• Honorarios profesionales\n• Freelancers y consultores\n• Declaraciones mensuales\n\nDeducciones personales permitidas:\n• Gastos médicos y dentales\n• Gastos hospitalarios\n• Primas de seguros de gastos médicos\n• Lentes ópticos (hasta $2,500)\n• Gastos funerarios\n• Intereses por créditos hipotecarios\n• Donativos\n• Colegiaturas (con límites)\n• Aportaciones complementarias de retiro\n\nConsejos importantes:\n• Guarda todas tus facturas\n• Revisa tu situación fiscal regularmente\n• Cumple con tus declaraciones a tiempo\n• Mantén actualizados tus datos\n• Consulta a un contador para casos complejos\n\nBeneficios de estar al corriente con el SAT:\n• Evitas multas y recargos\n• Accedes a devoluciones de impuestos\n• Mejoras tu historial crediticio\n• Puedes realizar transacciones formales\n• Accedes a programas gubernamentales\n\n¡Recuerda! El cumplimiento fiscal es parte fundamental de una vida financiera saludable."
        }
    ];

    const glossary = [
        { term: "Activo", definition: "Cualquier cosa que posees y tiene valor económico. Ejemplos: casa, auto, inversiones, dinero en el banco." },
        { term: "Pasivo", definition: "Deudas u obligaciones financieras que debes pagar. Ejemplos: préstamos, hipotecas, tarjetas de crédito." },
        { term: "Ingreso", definition: "Dinero que recibes regularmente. Puede ser activo (salario, honorarios) o pasivo (rentas, dividendos)." },
        { term: "Egreso", definition: "Todo el dinero que sale de tu bolsillo. Incluye gastos fijos (renta) y variables (entretenimiento)." },
        { term: "Tasa de interés", definition: "Porcentaje que se cobra por un préstamo o se paga por un ahorro. Puede ser fija o variable." },
        { term: "Crédito", definition: "Dinero prestado que debes devolver con intereses. También se refiere a tu historial de pagos." },
        { term: "Débito", definition: "Pago directo con tu propio dinero. Las tarjetas de débito usan fondos de tu cuenta bancaria." },
        { term: "Score crediticio", definition: "Calificación numérica que indica qué tan confiable eres para pagar deudas. Afecta tu acceso a préstamos." }
    ];

    const dailyTips = [
        "💡 Antes de comprar algo, pregúntate: ¿lo necesito o solo lo deseo?",
        "💡 Revisa tus suscripciones mensuales, podrías estar pagando por servicios que no usas.",
        "💡 Usa la regla 50/30/20: 50% necesidades, 30% deseos, 20% ahorro.",
        "💡 Compara precios antes de hacer compras importantes.",
        "💡 Establece metas financieras específicas y con fecha límite.",
        "💡 Aprende a cocinar en casa, ahorrarás significativamente en comidas.",
        "💡 Revisa tu estado de cuenta bancario semanalmente.",
    ];

    const [currentTip] = useState(dailyTips[Math.floor(Math.random() * dailyTips.length)]);

    const handleLessonComplete = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
        }
        setSelectedLesson(null);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header title="Educación Financiera" colors={colors} />

            <ScrollView style={styles.scrollView}>
                {/* Progreso del usuario */}
                <View style={[styles.progressCard, { backgroundColor: colors.card }]}>
                    <Text style={[styles.progressTitle, { color: colors.text }]}>Tu Progreso</Text>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    backgroundColor: colors.primary,
                                    width: `${(completedLessons.length / lessons.length) * 100}%`
                                }
                            ]}
                        />
                    </View>
                    <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                        {completedLessons.length} de {lessons.length} lecciones completadas
                    </Text>
                </View>

                {/* Consejo del día */}
                <View style={[styles.tipCard, { backgroundColor: colors.primary }]}>
                    <Text style={styles.tipTitle}>Consejo del Día</Text>
                    <Text style={styles.tipText}>{currentTip}</Text>
                </View>

                {/* Lecciones Financieras */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>📚 Lecciones Financieras</Text>
                {lessons.slice(0, 6).map((lesson) => (
                    <LessonCard
                        key={lesson.id}
                        title={lesson.title}
                        emoji={lesson.emoji}
                        description={lesson.description}
                        onPress={() => setSelectedLesson(lesson)}
                        colors={colors}
                        isCompleted={completedLessons.includes(lesson.id)}
                    />
                ))}

                {/* Sección SAT */}
                <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
                    🏛️ Información SAT
                </Text>
                {lessons.slice(6).map((lesson) => (
                    <LessonCard
                        key={lesson.id}
                        title={lesson.title}
                        emoji={lesson.emoji}
                        description={lesson.description}
                        onPress={() => setSelectedLesson(lesson)}
                        colors={colors}
                        isCompleted={completedLessons.includes(lesson.id)}
                    />
                ))}

                {/* Glosario */}
                <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 20 }]}>
                    📖 Glosario Financiero
                </Text>
                {glossary.map((item, index) => (
                    <GlossaryItem
                        key={index}
                        term={item.term}
                        definition={item.definition}
                        colors={colors}
                    />
                ))}
            </ScrollView>

            {/* Modal de lección */}
            <Modal
                visible={!!selectedLesson}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedLesson(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
                        <ScrollView>
                            <View style={styles.modalHeader}>
                                <Text style={[styles.modalTitle, { color: colors.text }]}>
                                    {selectedLesson?.emoji} {selectedLesson?.title}
                                </Text>
                                <TouchableOpacity onPress={() => setSelectedLesson(null)}>
                                    <Ionicons name="close" size={24} color={colors.text} />
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.modalText, { color: colors.text }]}>
                                {selectedLesson?.content}
                            </Text>

                            <TouchableOpacity
                                style={[styles.completeButton, { backgroundColor: colors.primary }]}
                                onPress={() => handleLessonComplete(selectedLesson?.id)}
                            >
                                <Text style={styles.completeButtonText}>
                                    {completedLessons.includes(selectedLesson?.id) ? 'Lección Completada ✓' : 'Marcar como Completada'}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    progressCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    progressTitle: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 8,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        marginBottom: 8,
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    tipCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
    },
    tipTitle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 8,
    },
    tipText: {
        color: '#fff',
        fontSize: 15,
        fontFamily: 'Inter-Regular',
        lineHeight: 22,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 16,
    },
    lessonCard: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    lessonCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lessonHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    lessonEmoji: {
        fontSize: 32,
        marginRight: 12,
    },
    lessonTextContainer: {
        flex: 1,
    },
    lessonTitle: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        marginBottom: 4,
    },
    lessonDescription: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
    },
    completedBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    glossaryItem: {
        borderRadius: 12,
        marginBottom: 8,
        overflow: 'hidden',
    },
    glossaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    glossaryTerm: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
    },
    glossaryDefinition: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        paddingHorizontal: 16,
        paddingBottom: 16,
        lineHeight: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Inter-SemiBold',
        flex: 1,
        marginRight: 16,
    },
    modalText: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        lineHeight: 24,
        marginBottom: 20,
    },
    completeButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    completeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
    },
});