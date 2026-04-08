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
    "correct": "París",
    "explanation": "París es la capital y ciudad más grande de Francia."
  }
]`,
        'true-false': `[
  {
    "type": "true-false",
    "question": "JavaScript y Java son el mismo lenguaje de programación.",
    "correct": false,
    "explanation": "Son lenguajes completamente distintos. Java es compilado y tipado; JavaScript es interpretado y dinámico."
  }
]`,
        'multiple-select': `[
  {
    "type": "multiple-select",
    "question": "¿Cuáles de los siguientes son lenguajes de programación?",
    "options": ["Python", "HTML", "JavaScript", "CSS"],
    "correct": ["Python", "JavaScript"],
    "explanation": "Python y JavaScript son lenguajes de programación. HTML y CSS son lenguajes de marcado/estilos."
  }
]`,
        'matching': `[
  {
    "type": "matching",
    "question": "Relaciona cada tecnología web con su función:",
    "pairs": [
      {"term": "HTML", "definition": "Estructura del contenido"},
      {"term": "CSS", "definition": "Estilos y diseño visual"},
      {"term": "JavaScript", "definition": "Interactividad y lógica"}
    ],
    "explanation": "Cada tecnología cumple un rol distinto en el desarrollo web."
  }
]`,
        'fill-blank': `[
  {
    "type": "fill-blank",
    "question": "El lenguaje ___ se usa para estilos, mientras que ___ añade interactividad.",
    "correct": ["CSS", "JavaScript"],
    "explanation": "CSS controla la apariencia visual; JavaScript añade comportamiento dinámico."
  }
]`,
        'all-types': `[
  {
    "type": "multiple-choice",
    "question": "¿Cuál es la capital de Francia?",
    "options": ["Londres", "Berlín", "París", "Madrid"],
    "correct": "París",
    "explanation": "París es la capital de Francia desde el siglo X."
  },
  {
    "type": "true-false",
    "question": "JavaScript y Java son el mismo lenguaje.",
    "correct": false,
    "explanation": "Son lenguajes completamente distintos en sintaxis, uso y paradigma."
  },
  {
    "type": "multiple-select",
    "question": "¿Cuáles son navegadores web?",
    "options": ["Chrome", "Python", "Firefox", "Safari"],
    "correct": ["Chrome", "Firefox", "Safari"],
    "explanation": "Chrome, Firefox y Safari son navegadores. Python es un lenguaje de programación."
  },
  {
    "type": "matching",
    "question": "Relaciona cada tecnología con su propósito:",
    "pairs": [
      {"term": "HTML", "definition": "Estructura de páginas web"},
      {"term": "CSS", "definition": "Estilos y diseño"},
      {"term": "JavaScript", "definition": "Interactividad y lógica"}
    ],
    "explanation": "Las tres tecnologías son la base del desarrollo web frontend."
  },
  {
    "type": "fill-blank",
    "question": "La capital de ___ es París, y la de Italia es ___.",
    "correct": ["Francia", "Roma"],
    "explanation": "Francia tiene a París y Italia tiene a Roma como capitales."
  }
]`
    };

    const aiPrompt = `Genera un array JSON de preguntas para un quiz sobre [ESCRIBE TU TEMA AQUÍ].

REGLAS IMPORTANTES:
- Responde ÚNICAMENTE con el JSON válido, sin explicaciones ni texto extra.
- Mezcla los 5 tipos de preguntas disponibles.
- Genera entre 8 y 12 preguntas.
- En "correct" escribe el texto exacto de la respuesta (no el índice numérico).
- Todas las "explanation" deben ser claras, breves y educativas.

═══════════════════════════════════════
TIPOS DE PREGUNTAS
═══════════════════════════════════════

1. OPCIÓN MÚLTIPLE — una respuesta correcta
{
  "type": "multiple-choice",
  "question": "¿Cuál es la capital de Francia?",
  "options": ["Londres", "Berlín", "París", "Madrid"],
  "correct": "París",
  "explanation": "París es la capital de Francia desde el siglo X."
}

2. VERDADERO / FALSO
{
  "type": "true-false",
  "question": "JavaScript y Java son el mismo lenguaje.",
  "correct": false,
  "explanation": "Son lenguajes distintos: Java es compilado, JavaScript es interpretado."
}

3. SELECCIÓN MÚLTIPLE — varias respuestas correctas
{
  "type": "multiple-select",
  "question": "¿Cuáles son navegadores web?",
  "options": ["Chrome", "Python", "Firefox", "Safari"],
  "correct": ["Chrome", "Firefox", "Safari"],
  "explanation": "Chrome, Firefox y Safari son navegadores. Python es un lenguaje."
}

4. RELACIONAR — emparejar términos con definiciones
{
  "type": "matching",
  "question": "Relaciona cada tecnología con su función:",
  "pairs": [
    {"term": "HTML", "definition": "Estructura del contenido"},
    {"term": "CSS", "definition": "Estilos y diseño"},
    {"term": "JavaScript", "definition": "Interactividad"}
  ],
  "explanation": "Las tres son la base del desarrollo web frontend."
}

5. COMPLETAR ESPACIOS — usa ___ para cada espacio en blanco
{
  "type": "fill-blank",
  "question": "La capital de ___ es París, y la de Italia es ___.",
  "correct": ["Francia", "Roma"],
  "explanation": "Francia → París, Italia → Roma."
}

═══════════════════════════════════════
CONSEJO: Si tienes un documento, imagen o apuntes, adjúntalos y pide:
"Basándote en este material, genera el JSON del quiz."
═══════════════════════════════════════`;

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
                                <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
                                    Cosas útiles que saber:
                                </p>
                                <ul className={`text-xs space-y-1.5 ${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>
                                    <li>• En <code className="font-mono bg-black/20 px-1 rounded">correct</code> escribe el texto exacto de la opción, no el número</li>
                                    <li>• Para <strong>multiple-select</strong>, <code className="font-mono bg-black/20 px-1 rounded">correct</code> es un array con varios textos</li>
                                    <li>• Para <strong>fill-blank</strong>, <code className="font-mono bg-black/20 px-1 rounded">correct</code> es un array — un valor por cada ___</li>
                                    <li>• Las opciones se mezclan aleatoriamente en cada intento</li>
                                    <li>• El campo <code className="font-mono bg-black/20 px-1 rounded">type</code> es opcional (por defecto: multiple-choice)</li>
                                    <li>• El campo <code className="font-mono bg-black/20 px-1 rounded">explanation</code> es opcional pero recomendado</li>
                                </ul>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-semibold text-indigo-500">Prompt listo para copiar y pegar en una IA</h4>
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
