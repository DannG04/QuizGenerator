import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, FileJson, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HelpModal from './HelpModal';

const EditorPanel = ({ title, setTitle, jsonInput, setJsonInput, setQuestions, setIsValid, darkMode }) => {
    const [validationStatus, setValidationStatus] = useState({ valid: false, message: 'Esperando entrada...' });
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        validateJson(jsonInput);
    }, [jsonInput]);

    const normalizeQuestion = (q) => {
        const type = q.type || 'multiple-choice';
        const n = { ...q, type };

        switch (type) {
            case 'multiple-choice':
                if (typeof q.correct === 'string') {
                    n.correct = q.options.indexOf(q.correct);
                }
                break;
            case 'multiple-select':
                if (Array.isArray(q.correct) && q.correct.length > 0 && typeof q.correct[0] === 'string') {
                    n.correct = q.correct.map(c => q.options.indexOf(c));
                }
                break;
            case 'fill-blank':
                if (!n.answers && Array.isArray(q.correct)) {
                    n.answers = q.correct;
                    delete n.correct;
                }
                break;
        }

        return n;
    };

    const validateJson = (input) => {
        if (!input.trim()) {
            setValidationStatus({ valid: false, message: 'Esperando entrada...' });
            setIsValid(false);
            return;
        }

        try {
            const parsed = JSON.parse(input);
            if (!Array.isArray(parsed)) throw new Error('La raíz debe ser un array [ ]');
            if (parsed.length === 0) throw new Error('El array no puede estar vacío');

            const normalized = parsed.map((q, index) => {
                if (!q.question || typeof q.question !== 'string') {
                    throw new Error(`Pregunta ${index + 1}: falta el campo "question"`);
                }

                const type = q.type || 'multiple-choice';

                switch (type) {
                    case 'multiple-choice': {
                        if (!Array.isArray(q.options) || q.options.length < 2)
                            throw new Error(`Pregunta ${index + 1}: "options" debe tener al menos 2 opciones`);
                        if (typeof q.correct === 'string') {
                            if (!q.options.includes(q.correct))
                                throw new Error(`Pregunta ${index + 1}: "${q.correct}" no existe en "options"`);
                        } else if (typeof q.correct === 'number') {
                            if (q.correct < 0 || q.correct >= q.options.length)
                                throw new Error(`Pregunta ${index + 1}: índice "correct" fuera de rango`);
                        } else {
                            throw new Error(`Pregunta ${index + 1}: "correct" debe ser el texto de la respuesta correcta`);
                        }
                        break;
                    }
                    case 'true-false':
                        if (typeof q.correct !== 'boolean')
                            throw new Error(`Pregunta ${index + 1}: "correct" debe ser true o false`);
                        break;

                    case 'multiple-select': {
                        if (!Array.isArray(q.options) || q.options.length < 2)
                            throw new Error(`Pregunta ${index + 1}: "options" debe tener al menos 2 opciones`);
                        if (!Array.isArray(q.correct) || q.correct.length === 0)
                            throw new Error(`Pregunta ${index + 1}: "correct" debe ser un array con las respuestas correctas`);
                        if (typeof q.correct[0] === 'string') {
                            q.correct.forEach(c => {
                                if (!q.options.includes(c))
                                    throw new Error(`Pregunta ${index + 1}: "${c}" no existe en "options"`);
                            });
                        } else {
                            q.correct.forEach(idx => {
                                if (typeof idx !== 'number' || idx < 0 || idx >= q.options.length)
                                    throw new Error(`Pregunta ${index + 1}: índice ${idx} en "correct" fuera de rango`);
                            });
                        }
                        break;
                    }
                    case 'matching':
                        if (!Array.isArray(q.pairs) || q.pairs.length < 2)
                            throw new Error(`Pregunta ${index + 1}: "pairs" debe tener al menos 2 pares`);
                        if (!q.pairs.every(p => p.term && p.definition))
                            throw new Error(`Pregunta ${index + 1}: cada par necesita "term" y "definition"`);
                        break;

                    case 'fill-blank': {
                        if (!q.question.includes('___'))
                            throw new Error(`Pregunta ${index + 1}: usa ___ para marcar los espacios en blanco`);
                        const blanks = (q.question.match(/___/g) || []).length;
                        const ans = q.answers || q.correct;
                        if (!Array.isArray(ans) || ans.length === 0)
                            throw new Error(`Pregunta ${index + 1}: "correct" debe ser un array con las respuestas`);
                        if (ans.length !== blanks)
                            throw new Error(`Pregunta ${index + 1}: tienes ${blanks} espacio(s) pero ${ans.length} respuesta(s)`);
                        break;
                    }
                    default:
                        throw new Error(`Pregunta ${index + 1}: tipo "${type}" no reconocido`);
                }

                return normalizeQuestion(q);
            });

            setValidationStatus({ valid: true, message: `${normalized.length} pregunta${normalized.length !== 1 ? 's' : ''} lista${normalized.length !== 1 ? 's' : ''}` });
            setQuestions(normalized);
            setIsValid(true);
        } catch (e) {
            setValidationStatus({ valid: false, message: e.message || 'JSON inválido' });
            setIsValid(false);
        }
    };

    return (
        <>
            <div className={`flex flex-col h-full gap-6 p-6 rounded-3xl border shadow-xl backdrop-blur-sm transition-colors duration-300 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                <div className="space-y-2">
                    <label className={`text-sm font-medium ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Título del Quiz</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ingresa el título del quiz..."
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${darkMode
                                ? 'bg-black/20 border-white/10 text-white placeholder-gray-400'
                                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                            }`}
                    />
                </div>

                <div className="flex-1 flex flex-col space-y-2 min-h-0">
                    <div className="flex items-center justify-between ml-1">
                        <div className="flex items-center gap-2">
                            <label className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Entrada JSON</label>
                            <button
                                onClick={() => setShowHelp(true)}
                                className={`p-1 rounded-full transition-colors ${darkMode ? 'text-indigo-400 hover:bg-indigo-500/20' : 'text-indigo-600 hover:bg-indigo-50'}`}
                                title="Ver formato y ayuda"
                            >
                                <HelpCircle size={16} />
                            </button>
                        </div>
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
                                    ? 'bg-black/20 border-white/10 text-gray-100 placeholder-gray-500 group-hover:bg-black/30'
                                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 group-hover:bg-gray-50'
                                }`}
                            spellCheck="false"
                        />
                        <div className="absolute bottom-4 right-4 pointer-events-none opacity-50">
                            <FileJson className={`w-6 h-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        </div>
                    </div>
                </div>
            </div>

            <HelpModal
                isOpen={showHelp}
                onClose={() => setShowHelp(false)}
                darkMode={darkMode}
            />
        </>
    );
};

export default EditorPanel;
