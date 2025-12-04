import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import clsx from 'clsx';

const ThemeCard = ({ id, name, description, active, onClick, previewColors, darkMode }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onClick(id)}
        className={clsx(
            "relative w-full p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden group",
            active
                ? (darkMode ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10" : "bg-indigo-50 border-indigo-500 shadow-md shadow-indigo-500/20")
                : (darkMode ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20" : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300")
        )}
    >
        <div className="flex items-start justify-between mb-3">
            <div className="flex gap-2">
                {previewColors.map((color, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full border ${darkMode ? 'border-white/10' : 'border-gray-300'}`} style={{ backgroundColor: color }} />
                ))}
            </div>
            {active && (
                <div className="bg-indigo-500 rounded-full p-1">
                    <Check size={12} className="text-white" />
                </div>
            )}
        </div>

        <h3 className={clsx("font-semibold mb-1", active ? (darkMode ? "text-white" : "text-indigo-700") : (darkMode ? "text-gray-200" : "text-gray-800"))}>{name}</h3>
        <p className={clsx("text-xs", darkMode ? "text-gray-400" : "text-gray-600")}>{description}</p>

        {/* Glow effect */}
        <div className={clsx(
            "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"
        )} />
    </motion.button>
);

const ThemeSelector = ({ currentTheme, setTheme, darkMode }) => {
    return (
        <div className="space-y-4">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Seleccionar Tema</h2>
            <div className="grid grid-cols-1 gap-4">
                <ThemeCard
                    id="minimalist"
                    name="Zen Minimalista"
                    description="Estética limpia y blanca con sombras suaves y tipografía elegante."
                    active={currentTheme === 'minimalist'}
                    onClick={setTheme}
                    previewColors={['#f8fafc', '#3b82f6', '#1e293b']}
                    darkMode={darkMode}
                />
                <ThemeCard
                    id="cyberpunk"
                    name="Neón Cyberpunk"
                    description="Modo oscuro con acentos verdes vibrantes y estilo terminal."
                    active={currentTheme === 'cyberpunk'}
                    onClick={setTheme}
                    previewColors={['#09090b', '#22c55e', '#e4e4e7']}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
};

export default ThemeSelector;
