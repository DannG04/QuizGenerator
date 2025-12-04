import React from 'react';
import { Sun, Moon } from 'lucide-react';
import logo from '../assets/Gemini_Generated_Image_s250vrs250vrs250.png';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className={`flex items-center justify-between p-6 border-b backdrop-blur-md transition-colors duration-300 ${darkMode ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-white/80'}`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg shadow-indigo-500/20">
          <img src={logo} alt="QuizForge Logo" className="w-full h-full object-cover" />
        </div>
        <h1 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'}`}>
          QuizForge
        </h1>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
        title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};

export default Header;
