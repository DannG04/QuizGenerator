import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const HelpModal = ({ isOpen, onClose, darkMode }) => {
    const [copied, setCopied] = useState(false);
    const [selectedType, setSelectedType] = useState('multiple-choice');

    const examplesByType = {
        'multiple-choice': `[
  {
    "type": "multiple-choice",
    "question": "¿Cuál es la capital de Francia?",
    "options": ["Londres", "Berlín", "París", "Madrid"],
    "correct": 2,
    "explanation": "París es la capital de Francia."
  }
]`,
        'true-false': `[
  {
    "type": "true-false",
    "question": "La Tierra es plana",
    "correct": false,
    "explanation": "La Tierra es esférica, no plana."
  }
]`,
        'multiple-select': `[
  {
    "type": "multiple-select",
    "question": "¿Cuáles son lenguajes de programación?",
    "options": ["Python", "HTML", "JavaScript", "CSS"],
    "correct": [0, 2],
    "explanation": "Python y JavaScript son lenguajes. HTML y CSS son de marcado."
  }
]`,
        'matching': `[
  {
    "type": "matching",
    "question": "Relaciona cada país con su capital:",
    "pairs": [
      {"term": "España", "definition": "Madrid"},
      {"term": "Francia", "definition": "París"},
      {"term": "Italia", "definition": "Roma"}
    ],
    "explanation": "Cada país tiene su propia capital."
  }
]`,
        'fill-blank': `[
  {
    "type": "fill-blank",
    "question": "La capital de ___ es París, y la de España es ___.",
    "answers": ["Francia", "Madrid"],
    "explanation": "Francia-París y España-Madrid son las capitales."
  }
]`,
        'all-types': `[
  {
    "type": "multiple-choice",
    "question": "¿Cuál es la capital de Francia?",
    "options": ["Londres", "Berlín", "París", "Madrid"],
    "correct": 2,
    "explanation": "París es la capital de Francia."
  },
  {
    "type": "true-false",
    "question": "JavaScript y Java son el mismo lenguaje",
    "correct": false,
    "explanation": "JavaScript y Java son lenguajes completamente diferentes."
  },
  {
    "type": "multiple-select",
    "question": "¿Cuáles son navegadores web?",
    "options": ["Chrome", "Python", "Firefox", "Safari"],
    "correct": [0, 2, 3],
    "explanation": "Chrome, Firefox y Safari son navegadores. Python es un lenguaje."
  },
  {
    "type": "matching",
    "question": "Relaciona cada tecnología con su propósito:",
    "pairs": [
      {"term": "HTML", "definition": "Estructura de páginas web"},
      {"term": "CSS", "definition": "Estilos y diseño"},
      {"term": "JavaScript", "definition": "Interactividad y lógica"}
    ],
    "explanation": "Cada tecnología web tiene un propósito específico."
  },
  {
    "type": "fill-blank",
    "question": "El lenguaje ___ se usa para estilos, mientras que ___ añade interactividad.",
    "answers": ["CSS", "JavaScript"],
    "explanation": "CSS para estilos, JavaScript para interactividad."
  }
]`
    };

    const aiPrompt = `EJEMPLO DE USO:
"Basándote en las fuentes adjuntas, genérame preguntas en formato JSON de diferentes tipos sobre [TU_TEMA]"

Genera un array de objetos JSON para un quiz sobre [TU_TEMA].

TIPOS DE PREGUNTAS DISPONIBLES:

1. OPCIÓN MÚLTIPLE (multiple-choice):
{
  "type": "multiple-choice",
  "question": "Texto de la pregunta",
  "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
  "correct": 2,
  "explanation": "Explicación"
}

2. VERDADERO/FALSO (true-false):
{
  "type": "true-false",
  "question": "Afirmación a evaluar",
  "correct": true,
  "explanation": "Explicación"
}

3. SELECCIÓN MÚLTIPLE (multiple-select):
{
  "type": "multiple-select",
  "question": "Pregunta con varias respuestas correctas",
  "options": ["A", "B", "C", "D"],
  "correct": [0, 2],
  "explanation": "Explicación"
}

4. RELACIONAR (matching):
{
  "type": "matching",
  "question": "Relaciona los términos:",
  "pairs": [
    {"term": "Término 1", "definition": "Definición 1"},
    {"term": "Término 2", "definition": "Definición 2"}
  ],
  "explanation": "Explicación"
}

5. COMPLETAR ESPACIOS (fill-blank):
{
  "type": "fill-blank",
  "question": "El ___ es el rey de la selva y vive en ___.",
  "answers": ["león", "África"],
  "explanation": "Explicación"
}

IMPORTANTE: Las respuestas se mostrarán en orden ALEATORIO cada vez.

INSTRUCCIÓN: Genera 5-10 preguntas mezclando diferentes tipos de pregunta. Responde SOLO con el JSON válido, sin texto adicional.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(aiPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyExample = () => {
        navigator.clipboard.writeText(examplesByType[selectedType]);
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
                                <h4 className="font-semibold mb-3 text-indigo-500">Tipos de Preguntas Disponibles</h4>
                                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                                    {[
                                        { id: 'multiple-choice', name: 'Opción Múltiple' },
                                        { id: 'true-false', name: 'Verdadero/Falso' },
                                        { id: 'multiple-select', name: 'Selección Múltiple' },
                                        { id: 'matching', name: 'Relacionar' },
                                        { id: 'fill-blank', name: 'Completar Espacios' },
                                        { id: 'all-types', name: '🎯 Todos Juntos' }
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setSelectedType(type.id)}
                                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                                                selectedType === type.id
                                                    ? 'bg-indigo-500 text-white shadow-lg'
                                                    : (darkMode ? 'bg-white/10 hover:bg-white/15 text-gray-200 border border-white/10' : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200')
                                            }`}
                                        >
                                            {type.name}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                    <h5 className="text-sm font-semibold text-indigo-400">
                                        {selectedType === 'all-types' ? 'Ejemplo Completo (5 tipos mezclados)' : `Ejemplo: ${selectedType}`}
                                    </h5>
                                    <button
                                        onClick={handleCopyExample}
                                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                                            copied
                                                ? 'bg-green-500/10 text-green-500'
                                                : (darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200')
                                        }`}
                                    >
                                        {copied ? <Check size={12} /> : <Copy size={12} />}
                                        {copied ? '¡Copiado!' : 'Copiar'}
                                    </button>
                                </div>
                                <pre className={`p-4 rounded-xl text-sm font-mono overflow-x-auto ${
                                    selectedType === 'all-types' ? 'max-h-96' : ''
                                } ${darkMode ? 'bg-black/40 text-gray-100 border border-white/10' : 'bg-gray-50 text-gray-900 border border-gray-200'
                                }`}>
                                    {examplesByType[selectedType]}
                                </pre>
                            </div>

                            <div className={`p-4 rounded-xl ${darkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200'}`}>
                                <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                                    ⚡ Características importantes:
                                </p>
                                <ul className={`text-xs space-y-1 ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                                    <li>• Las respuestas se mezclan aleatoriamente en cada intento</li>
                                    <li>• Puedes combinar diferentes tipos de preguntas en un mismo quiz</li>
                                    <li>• El campo "type" es opcional (por defecto: "multiple-choice")</li>
                                    <li>• Usa "___" para espacios en blanco en fill-blank</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-indigo-500">Prompt Completo para IA</h4>
                                    <button
                                        onClick={handleCopy}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                            copied
                                                ? 'bg-green-500/10 text-green-500'
                                                : (darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200')
                                        }`}
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? '¡Copiado!' : 'Copiar Prompt'}
                                    </button>
                                </div>
                                <div className={`p-4 rounded-xl text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto ${
                                    darkMode ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-100' : 'bg-indigo-50 border border-indigo-200 text-indigo-900'
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
