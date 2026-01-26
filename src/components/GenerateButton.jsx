import React from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';

const GenerateButton = ({ onGenerate, disabled, isGenerating, darkMode }) => {
    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={onGenerate}
            disabled={disabled || isGenerating}
            className={`
        w-full py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3
        transition-all duration-300 shadow-lg border
        ${disabled
                    ? (darkMode
                        ? 'bg-gray-800 text-gray-500 border-gray-700'
                        : 'bg-gray-200 text-gray-500 border-gray-300') + ' cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/25 border-indigo-500/50 hover:shadow-xl'
                }
      `}
        >
            {isGenerating ? (
                <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Generando...</span>
                </>
            ) : (
                <>
                    <Download className={disabled ? "opacity-50" : ""} size={20} />
                    <span className="hidden sm:inline">Generar Quiz HTML</span>
                    <span className="sm:hidden">Generar</span>
                </>
            )}
        </motion.button>
    );
};

export default GenerateButton;
