import React from 'react';
import { motion } from 'framer-motion';
import { Check, Eye } from 'lucide-react';
import clsx from 'clsx';

const ThemeCard = ({ id, name, description, active, onClick, onPreview, previewColors, darkMode }) => (
    <div className="relative group">
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(id)}
            className={clsx(
                "relative w-full p-4 rounded-2xl border text-left transition-all duration-300 overflow-hidden",
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

        <button
            onClick={(e) => {
                e.stopPropagation();
                onPreview(id);
            }}
            className={`absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 ${active
                ? 'text-indigo-500 hover:bg-indigo-500/10'
                : (darkMode ? 'text-gray-400 hover:bg-white/10 hover:text-white' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900')
                }`}
            title="Vista previa del tema"
        >
            <Eye size={18} />
        </button>
    </div>
);

const ThemeSelector = ({ currentTheme, setTheme, onPreview, darkMode }) => {
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
                    onPreview={onPreview}
                    previewColors={['#f8fafc', '#3b82f6', '#1e293b']}
                    darkMode={darkMode}
                />
                <ThemeCard
                    id="cyberpunk"
                    name="Neón Cyberpunk"
                    description="Modo oscuro con acentos verdes vibrantes y estilo terminal."
                    active={currentTheme === 'cyberpunk'}
                    onClick={setTheme}
                    onPreview={onPreview}
                    previewColors={['#09090b', '#22c55e', '#e4e4e7']}
                    darkMode={darkMode}
                />
                <ThemeCard
                    id="neon-blue"
                    name="Neon Blue"
                    description="Estilo futurista con tonos azules brillantes y diseño en cuadrícula."
                    active={currentTheme === 'neon-blue'}
                    onClick={setTheme}
                    onPreview={onPreview}
                    previewColors={['#0f172a', '#06b6d4', '#f8fafc']}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
};

export default ThemeSelector;
