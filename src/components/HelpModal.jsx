import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const HelpModal = ({ isOpen, onClose, darkMode }) => {
    const [copied, setCopied] = useState(false);

    const aiPrompt = `Genera un array de objetos JSON para un quiz sobre [TU_TEMA]. 
Usa estrictamente este formato:
[
  {
    "question": "Pregunta aquí",
    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
    "correct": 0, // Índice de la respuesta correcta (0-3)
    "explanation": "Breve explicación de por qué es correcta"
  }
]
Genera 5 preguntas. Responde SOLO con el código JSON, sin texto adicional.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(aiPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className={`relative w-full max-w-2xl p-6 rounded-2xl shadow-2xl border ${darkMode ? 'bg-[#18181b] border-white/10 text-gray-200' : 'bg-white border-gray-200 text-gray-800'
                            }`}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Ayuda de Formato JSON</h3>
                            <button onClick={onClose} className="p-2 hover:bg-gray-500/10 rounded-lg transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold mb-2 text-indigo-500">Estructura Requerida</h4>
                                <pre className={`p-4 rounded-xl text-sm font-mono overflow-x-auto ${darkMode ? 'bg-black/30 text-gray-300' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {`[
  {
    "question": "¿Cuál es la capital de Francia?",
    "options": ["Londres", "Berlín", "París", "Madrid"],
    "correct": 2,
    "explanation": "París es la capital de Francia."
  }
]`}
                                </pre>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-indigo-500">Prompt para IA (ChatGPT, Gemini, Claude)</h4>
                                    <button
                                        onClick={handleCopy}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${copied
                                                ? 'bg-green-500/10 text-green-500'
                                                : (darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200')
                                            }`}
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? '¡Copiado!' : 'Copiar Prompt'}
                                    </button>
                                </div>
                                <div className={`p-4 rounded-xl text-sm font-mono whitespace-pre-wrap ${darkMode ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-200' : 'bg-indigo-50 border border-indigo-100 text-indigo-800'
                                    }`}>
                                    {aiPrompt}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default HelpModal;
