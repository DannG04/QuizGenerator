import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EditorPanel from './components/EditorPanel';
import ThemeSelector from './components/ThemeSelector';
import GenerateButton from './components/GenerateButton';
import PreviewModal from './components/PreviewModal';
import { generateQuizHtml } from './utils/generator';
import { Eye } from 'lucide-react';

function App() {
  const [title, setTitle] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [theme, setTheme] = useState('minimalist');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewHtml, setPreviewHtml] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePreview = () => {
    if (!isValid || !title) return;
    const html = generateQuizHtml(title, questions, theme);
    setPreviewHtml(html);
    setShowPreview(true);
  };

  const handleThemePreview = (themeId) => {
    const sampleQuestions = [
      {
        question: "¿Cuál es el planeta conocido como el Planeta Rojo?",
        options: ["Tierra", "Marte", "Júpiter", "Venus"],
        correct: 1,
        explanation: "Marte es llamado el 'Planeta Rojo' debido a su apariencia rojiza."
      },
      {
        question: "¿Cuál es la capital de Francia?",
        options: ["Londres", "Berlín", "Madrid", "París"],
        correct: 3,
        explanation: "París es la capital y ciudad más poblada de Francia."
      }
    ];
    const html = generateQuizHtml("Vista Previa del Tema", sampleQuestions, themeId);
    setPreviewHtml(html);
    setShowPreview(true);
  };

  const handleGenerate = async () => {
    if (!isValid || !title) return;

    setIsGenerating(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const html = generateQuizHtml(title, questions, theme);
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-quiz.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Generation failed:", err);
      alert("Error al generar el quiz. Por favor revisa la consola.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-indigo-500/30 transition-colors duration-300 ${darkMode ? 'bg-[#0f172a] text-white' : 'bg-gray-50 text-gray-900'}`}>
      {darkMode && (
        <>
          <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
          <div className="fixed inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 pointer-events-none"></div>
        </>
      )}

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="flex-1 container mx-auto p-6 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

            {/* Left Panel - Editor */}
            <div className="lg:col-span-8 h-full min-h-0">
              <EditorPanel
                title={title}
                setTitle={setTitle}
                jsonInput={jsonInput}
                setJsonInput={setJsonInput}
                setQuestions={setQuestions}
                setIsValid={setIsValid}
                darkMode={darkMode}
              />
            </div>

            {/* Right Panel - Customization */}
            <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-y-auto pb-6">
              <div className={`flex-1 rounded-3xl p-6 border backdrop-blur-sm shadow-xl transition-colors duration-300 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                <ThemeSelector
                  currentTheme={theme}
                  setTheme={setTheme}
                  onPreview={handleThemePreview}
                  darkMode={darkMode}
                />
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handlePreview}
                    disabled={!isValid || !title}
                    className={`
                      flex-1 py-4 px-6 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2
                      transition-all duration-300 border
                      ${!isValid || !title
                        ? (darkMode ? 'bg-gray-800 text-gray-500 border-gray-700' : 'bg-gray-200 text-gray-400 border-gray-300') + ' cursor-not-allowed'
                        : (darkMode ? 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:border-gray-400')
                      }
                    `}
                  >
                    <Eye size={20} />
                    <span className="hidden sm:inline">Vista Previa</span>
                    <span className="sm:hidden">Previa</span>
                  </button>
                  <div className="flex-1 sm:flex-[2]">
                    <GenerateButton
                      onGenerate={handleGenerate}
                      disabled={!isValid || !title}
                      isGenerating={isGenerating}
                      darkMode={darkMode}
                    />
                  </div>
                </div>
                <p className={`text-center text-xs mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Genera un archivo HTML independiente. No requiere servidor.
                </p>
              </div>
            </div>

          </div>
        </main>

        <PreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          htmlContent={previewHtml}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
