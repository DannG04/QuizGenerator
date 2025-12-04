import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, FileJson } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EditorPanel = ({ title, setTitle, jsonInput, setJsonInput, setQuestions, setIsValid, darkMode }) => {
    const [validationStatus, setValidationStatus] = useState({ valid: false, message: 'Esperando entrada...' });

    useEffect(() => {
        validateJson(jsonInput);
    }, [jsonInput]);

    const validateJson = (input) => {
        if (!input.trim()) {
            setValidationStatus({ valid: false, message: 'Esperando entrada...' });
            setIsValid(false);
            return;
        }

        try {
            const parsed = JSON.parse(input);
            if (!Array.isArray(parsed)) throw new Error('La raíz debe ser un array');

            const validQuestions = parsed.every(q =>
                q.question &&
                Array.isArray(q.options) &&
                q.options.length >= 2 &&
                typeof q.correct === 'number'
            );

            if (!validQuestions) throw new Error('Estructura de pregunta inválida');

            setValidationStatus({ valid: true, message: `JSON Válido: ${parsed.length} Preguntas` });
            setQuestions(parsed);
            setIsValid(true);
        } catch (e) {
            setValidationStatus({ valid: false, message: 'Formato Inválido' });
            setIsValid(false);
        }
    };

    return (
        <div className={`flex flex-col h-full gap-6 p-6 rounded-3xl border shadow-xl backdrop-blur-sm transition-colors duration-300 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
            <div className="space-y-2">
                <label className={`text-sm font-medium ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Título del Quiz</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ingresa el título del quiz..."
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode
                        ? 'bg-black/20 border-white/10 text-white placeholder-gray-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                        }`}
                />
            </div>

            <div className="flex-1 flex flex-col space-y-2 min-h-0">
                <div className="flex items-center justify-between ml-1">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Entrada JSON</label>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={validationStatus.valid ? 'valid' : 'invalid'}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${validationStatus.valid
                                ? (darkMode ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-100 text-green-700 border border-green-200')
                                : (darkMode ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-100 text-red-700 border border-red-200')
                                }`}
                        >
                            {validationStatus.valid ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                            {validationStatus.message}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="relative flex-1 group">
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder='[{"question": "...", "options": [...], "correct": 0}]'
                        className={`w-full h-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm resize-none transition-all ${darkMode
                            ? 'bg-black/20 border-white/10 text-gray-300 placeholder-gray-500 group-hover:bg-black/30'
                            : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500 group-hover:bg-gray-100'
                            }`}
                        spellCheck="false"
                    />
                    <div className="absolute bottom-4 right-4 pointer-events-none opacity-50">
                        <FileJson className={`w-6 h-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorPanel;
