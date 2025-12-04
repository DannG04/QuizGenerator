import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Tablet, Monitor } from 'lucide-react';

const PreviewModal = ({ isOpen, onClose, htmlContent, darkMode }) => {
    const [viewMode, setViewMode] = useState('desktop'); // desktop, tablet, mobile

    const getWidth = () => {
        switch (viewMode) {
            case 'mobile': return '375px';
            case 'tablet': return '768px';
            default: return '100%';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className={`relative w-full h-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col border transition-colors duration-300 ${darkMode ? 'bg-[#18181b] border-white/10' : 'bg-white border-gray-200'
                            }`}
                    >
                        {/* Header */}
                        <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${darkMode ? 'border-white/10 bg-[#09090b]' : 'border-gray-200 bg-gray-50'
                            }`}>
                            <div className="flex items-center gap-4">
                                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Vista Previa</h3>
                                <div className={`flex gap-2 rounded-lg p-1 ${darkMode ? 'bg-white/5' : 'bg-gray-200'}`}>
                                    <button
                                        onClick={() => setViewMode('desktop')}
                                        className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${viewMode === 'desktop'
                                            ? 'bg-indigo-500 text-white'
                                            : (darkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300')
                                            }`}
                                    >
                                        <Monitor size={14} /> Escritorio
                                    </button>
                                    <button
                                        onClick={() => setViewMode('tablet')}
                                        className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${viewMode === 'tablet'
                                            ? 'bg-indigo-500 text-white'
                                            : (darkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300')
                                            }`}
                                    >
                                        <Tablet size={14} /> Tablet
                                    </button>
                                    <button
                                        onClick={() => setViewMode('mobile')}
                                        className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${viewMode === 'mobile'
                                            ? 'bg-indigo-500 text-white'
                                            : (darkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300')
                                            }`}
                                    >
                                        <Smartphone size={14} /> Móvil
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-white/10 text-gray-400 hover:text-white' : 'hover:bg-gray-200 text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className={`flex-1 relative flex justify-center overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                            <motion.div
                                className={`h-full bg-white shadow-2xl transition-all duration-500 ease-in-out border-x ${darkMode ? 'border-white/10' : 'border-gray-200'}`}
                                animate={{ width: getWidth() }}
                            >
                                <iframe
                                    title="Quiz Preview"
                                    srcDoc={htmlContent}
                                    className="w-full h-full border-0"
                                    sandbox="allow-scripts allow-same-origin allow-modals"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PreviewModal;
