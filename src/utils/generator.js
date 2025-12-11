
export const generateQuizHtml = (title, questions, theme) => {
  const themeStyles = getThemeStyles(theme);

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
  <style>
    :root {
      --bg-color: ${themeStyles.bgColor};
      --text-color: ${themeStyles.textColor};
      --card-bg: ${themeStyles.cardBg};
      --accent-color: ${themeStyles.accentColor};
      --secondary-text: ${themeStyles.secondaryText};
      --border-color: ${themeStyles.borderColor};
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      transition: background-color 0.3s, color 0.3s;
    }

    .container {
      width: 100%;
      max-width: 600px;
      padding: 20px;
    }

    .card {
      background-color: var(--card-bg);
      border-radius: 16px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border: 1px solid var(--border-color);
      transition: transform 0.3s ease;
    }

    h1 { text-align: center; margin-bottom: 20px; color: var(--accent-color); }
    
    .question-count {
      text-align: center;
      margin-bottom: 20px;
      color: var(--secondary-text);
      font-size: 0.9rem;
    }

    .question-text {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 25px;
      line-height: 1.5;
    }

    .options-grid {
      display: grid;
      gap: 12px;
    }

    .option-btn {
      background: transparent;
      border: 2px solid var(--border-color);
      color: var(--text-color);
      padding: 15px;
      border-radius: 12px;
      cursor: pointer;
      text-align: left;
      font-size: 1rem;
      transition: all 0.2s;
    }

    .option-btn:hover:not(:disabled) {
      border-color: var(--accent-color);
      background-color: rgba(var(--accent-rgb), 0.05);
    }

    .option-btn.selected {
      border-color: var(--accent-color);
      background-color: var(--accent-color);
      color: white;
    }

    .option-btn.correct {
      border-color: #22c55e;
      background-color: #22c55e;
      color: white;
    }

    .option-btn.incorrect {
      border-color: #ef4444;
      background-color: #ef4444;
      color: white;
    }

    .feedback {
      margin-top: 20px;
      padding: 15px;
      border-radius: 8px;
      background-color: rgba(0,0,0,0.05);
    }
    
    .feedback.visible { display: block; }
    .feedback.success { border-left: 4px solid #22c55e; }
    .feedback.error { border-left: 4px solid #ef4444; }

    .next-btn, .restart-btn {
      display: block;
      width: 100%;
      margin-top: 20px;
      padding: 15px;
      background-color: var(--accent-color);
      color: white;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .next-btn:hover, .restart-btn:hover { opacity: 0.9; }
    .hidden { display: none; }

    /* Theme Specific Overrides */
    ${theme === 'cyberpunk' ? `
      .card { box-shadow: 0 0 20px var(--accent-color); border: 1px solid var(--accent-color); }
      .option-btn { font-family: 'Courier New', monospace; }
    ` : ''}

    ${theme === 'neon-blue' ? `
      .card { 
        box-shadow: 0 0 25px rgba(var(--accent-rgb), 0.3); 
        border: 1px solid rgba(var(--accent-rgb), 0.5);
        background: linear-gradient(145deg, var(--card-bg) 0%, #0f172a 100%);
      }
      .options-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
      .option-btn {
        border-radius: 8px;
        border: 1px solid rgba(var(--accent-rgb), 0.3);
        background: rgba(15, 23, 42, 0.6);
        backdrop-filter: blur(4px);
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 80px;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      .option-btn:hover:not(:disabled) {
        box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.4);
        transform: translateY(-2px);
      }
      h1 { text-shadow: 0 0 10px rgba(var(--accent-rgb), 0.5); }
    ` : ''}

    ${theme === 'pink-dream' ? `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      @keyframes shimmer {
        0% { background-position: -1000px 0; }
        100% { background-position: 1000px 0; }
      }
      
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 20px rgba(236, 72, 153, 0.3), 0 0 40px rgba(236, 72, 153, 0.1); }
        50% { box-shadow: 0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(236, 72, 153, 0.2); }
      }
      
      body {
        background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%);
        background-size: 400% 400%;
        animation: gradient-shift 15s ease infinite;
      }
      
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      
      .card {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px);
        border: 2px solid rgba(236, 72, 153, 0.2);
        box-shadow: 0 8px 32px rgba(236, 72, 153, 0.15), 
                    0 20px 60px rgba(236, 72, 153, 0.1),
                    inset 0 0 0 1px rgba(255, 255, 255, 0.8);
        animation: float 6s ease-in-out infinite, pulse-glow 4s ease-in-out infinite;
        position: relative;
        overflow: hidden;
      }
      
      .card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          45deg,
          transparent 30%,
          rgba(236, 72, 153, 0.05) 50%,
          transparent 70%
        );
        transform: rotate(45deg);
        animation: shimmer 8s linear infinite;
      }
      
      h1 {
        background: linear-gradient(135deg, #ec4899, #f472b6, #fb7185);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 20px rgba(236, 72, 153, 0.3);
        animation: float 4s ease-in-out infinite;
      }
      
      .question-text {
        animation: float 5s ease-in-out infinite;
        animation-delay: 0.2s;
      }
      
      .option-btn {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(252, 231, 243, 0.9));
        border: 2px solid rgba(236, 72, 153, 0.3);
        border-radius: 16px;
        box-shadow: 0 4px 15px rgba(236, 72, 153, 0.1);
        font-weight: 500;
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .option-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.15), transparent);
        transition: left 0.5s;
      }
      
      .option-btn:hover:not(:disabled)::before {
        left: 100%;
      }
      
      .option-btn:hover:not(:disabled) {
        transform: translateY(-4px) scale(1.02);
        border-color: rgba(236, 72, 153, 0.6);
        box-shadow: 0 8px 25px rgba(236, 72, 153, 0.25), 0 0 0 3px rgba(236, 72, 153, 0.1);
        background: linear-gradient(135deg, #fce7f3, #fbcfe8);
      }
      
      .option-btn.selected {
        background: linear-gradient(135deg, #ec4899, #f472b6);
        border-color: #ec4899;
        transform: scale(1.05);
        box-shadow: 0 10px 30px rgba(236, 72, 153, 0.4);
      }
      
      .option-btn.correct {
        background: linear-gradient(135deg, #ec4899, #f472b6);
        border-color: #ec4899;
        animation: success-pulse 0.6s ease;
      }
      
      @keyframes success-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }
      
      .option-btn.incorrect {
        background: linear-gradient(135deg, #f87171, #fb923c);
        border-color: #ef4444;
        animation: shake 0.5s ease;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
      
      .feedback {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(252, 231, 243, 0.9));
        backdrop-filter: blur(10px);
        border: 2px solid rgba(236, 72, 153, 0.2);
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(236, 72, 153, 0.15);
        animation: slide-in 0.4s ease;
      }
      
      @keyframes slide-in {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .feedback.success {
        border-left: 4px solid #ec4899;
        background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 114, 182, 0.1));
      }
      
      .feedback.error {
        border-left: 4px solid #f87171;
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.1), rgba(251, 146, 60, 0.1));
      }
      
      .next-btn, .restart-btn {
        background: linear-gradient(135deg, #ec4899, #f472b6);
        border: none;
        border-radius: 16px;
        font-weight: 600;
        box-shadow: 0 6px 20px rgba(236, 72, 153, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }
      
      .next-btn::before, .restart-btn::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }
      
      .next-btn:hover::before, .restart-btn:hover::before {
        width: 300px;
        height: 300px;
      }
      
      .next-btn:hover, .restart-btn:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow: 0 10px 30px rgba(236, 72, 153, 0.4);
      }
      
      .next-btn:active, .restart-btn:active {
        transform: translateY(0) scale(0.98);
      }
      
      .question-count {
        background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 114, 182, 0.1));
        padding: 8px 16px;
        border-radius: 20px;
        display: inline-block;
        border: 1px solid rgba(236, 72, 153, 0.2);
      }
      
      #final-score {
        background: linear-gradient(135deg, #ec4899, #f472b6, #fb7185);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: float 3s ease-in-out infinite;
      }
      
      #results-screen {
        animation: slide-in 0.6s ease;
      }
    ` : ''}

    ${theme === 'formal-legal' ? `
      body {
        font-family: 'Georgia', 'Times New Roman', serif;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      }
      
      .card {
        border: 2px solid var(--border-color);
        box-shadow: 0 8px 24px rgba(30, 58, 95, 0.12);
        background: var(--card-bg);
      }
      
      h1 {
        font-family: 'Georgia', 'Times New Roman', serif;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-size: 1.75rem;
        border-bottom: 3px solid var(--border-color);
        padding-bottom: 15px;
        margin-bottom: 25px;
      }
      
      .question-count {
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(212, 175, 55, 0.05));
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 8px;
        padding: 8px 16px;
        display: inline-block;
        font-family: 'Georgia', serif;
        font-weight: 600;
        letter-spacing: 0.5px;
      }
      
      .question-text {
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 1.15rem;
        line-height: 1.7;
        font-weight: 500;
        margin-bottom: 30px;
        color: var(--text-color);
        text-align: justify;
      }
      
      .option-btn {
        background: linear-gradient(135deg, #ffffff, #f8f9fa);
        border: 2px solid rgba(212, 175, 55, 0.3);
        border-radius: 8px;
        padding: 18px 20px;
        font-family: 'Georgia', 'Times New Roman', serif;
        font-size: 1rem;
        line-height: 1.6;
        font-weight: 400;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(30, 58, 95, 0.08);
      }
      
      .option-btn:hover:not(:disabled) {
        border-color: var(--border-color);
        background: linear-gradient(135deg, #fff, #fefefe);
        box-shadow: 0 4px 12px rgba(30, 58, 95, 0.15);
        transform: translateY(-2px);
      }
      
      .option-btn.selected {
        background: linear-gradient(135deg, var(--accent-color), #2c5282);
        border-color: var(--accent-color);
        box-shadow: 0 4px 16px rgba(30, 58, 95, 0.3);
      }
      
      .option-btn.correct {
        background: linear-gradient(135deg, #1e3a5f, #2c5282);
        border-color: var(--border-color);
        box-shadow: 0 4px 16px rgba(212, 175, 55, 0.4);
      }
      
      .option-btn.incorrect {
        background: linear-gradient(135deg, #8b0000, #a52a2a);
        border-color: #8b0000;
      }
      
      .feedback {
        background: linear-gradient(135deg, #ffffff, #f8f9fa);
        border: 2px solid rgba(212, 175, 55, 0.3);
        border-radius: 8px;
        padding: 18px;
        font-family: 'Georgia', 'Times New Roman', serif;
        line-height: 1.6;
        box-shadow: 0 2px 12px rgba(30, 58, 95, 0.1);
      }
      
      .feedback.success {
        border-left: 4px solid var(--border-color);
        background: linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(212, 175, 55, 0.03));
      }
      
      .feedback.error {
        border-left: 4px solid #8b0000;
        background: linear-gradient(135deg, rgba(139, 0, 0, 0.08), rgba(139, 0, 0, 0.03));
      }
      
      .next-btn, .restart-btn {
        background: linear-gradient(135deg, var(--accent-color), #2c5282);
        border: 2px solid var(--border-color);
        border-radius: 8px;
        font-family: 'Georgia', 'Times New Roman', serif;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        box-shadow: 0 4px 12px rgba(30, 58, 95, 0.2);
        transition: all 0.3s ease;
      }
      
      .next-btn:hover, .restart-btn:hover {
        background: linear-gradient(135deg, #2c5282, var(--accent-color));
        box-shadow: 0 6px 16px rgba(30, 58, 95, 0.3);
        transform: translateY(-2px);
      }
      
      #final-score {
        font-family: 'Georgia', 'Times New Roman', serif;
        font-weight: 700;
        color: var(--accent-color);
        text-shadow: 0 2px 8px rgba(30, 58, 95, 0.2);
      }
      
      .footer {
        font-family: 'Georgia', 'Times New Roman', serif;
        border-top: 1px solid rgba(212, 175, 55, 0.3);
        padding-top: 20px;
        margin-top: 40px;
      }
    ` : ''}

    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 0.9rem;
      color: var(--secondary-text);
      padding-bottom: 20px;
    }
    .footer a {
      color: var(--accent-color);
      text-decoration: none;
      margin: 0 10px;
      transition: opacity 0.2s;
    }
    .footer a:hover { opacity: 0.8; }
  </style>
</head>
<body>

<div class="container">
  <div id="quiz-screen" class="card">
    <h1 id="quiz-title">${title}</h1>
    <div class="question-count">Pregunta <span id="current-q">1</span> de <span id="total-q">0</span></div>
    
    <div id="question-container">
      <div class="question-text" id="question-text">Cargando...</div>
      <div class="options-grid" id="options-container"></div>
    </div>

    <div id="feedback-area" class="feedback hidden">
      <p id="feedback-text"></p>
    </div>

    <button id="next-btn" class="next-btn hidden">Siguiente Pregunta</button>
  </div>

  <div id="results-screen" class="card hidden" style="text-align: center;">
    <h1>¡Quiz Completado!</h1>
    <div style="font-size: 4rem; margin: 20px 0; color: var(--accent-color);" id="final-score">0%</div>
    <p style="color: var(--secondary-text); margin-bottom: 30px;">Tu puntuación: <span id="score-fraction">0/0</span></p>
    <button class="restart-btn" onclick="location.reload()">Jugar de Nuevo</button>
  </div>

  <div class="footer">
    <p>Creado por Daniel Gonzalez Ruiz</p>
    <div style="margin-top: 8px;">
      <a href="https://github.com/DannG04" target="_blank">GitHub</a> • 
      <a href="https://www.instagram.com/danny_gz4/" target="_blank">Instagram</a>
    </div>
  </div>
</div>

<script>
  const questions = ${JSON.stringify(questions)};
  let currentQuestionIndex = 0;
  let score = 0;
  let isAnswered = false;
  let selectedMatches = {};
  let selectedMultiple = new Set();

  const els = {
    quizScreen: document.getElementById('quiz-screen'),
    resultsScreen: document.getElementById('results-screen'),
    currentQ: document.getElementById('current-q'),
    totalQ: document.getElementById('total-q'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    feedbackArea: document.getElementById('feedback-area'),
    feedbackText: document.getElementById('feedback-text'),
    nextBtn: document.getElementById('next-btn'),
    finalScore: document.getElementById('final-score'),
    scoreFraction: document.getElementById('score-fraction')
  };

  // Función para mezclar arrays
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function init() {
    els.totalQ.textContent = questions.length;
    loadQuestion();
  }

  function loadQuestion() {
    isAnswered = false;
    selectedMatches = {};
    selectedMultiple = new Set();
    const q = questions[currentQuestionIndex];
    const type = q.type || 'multiple-choice';
    
    els.currentQ.textContent = currentQuestionIndex + 1;
    els.questionText.textContent = q.question;
    els.optionsContainer.innerHTML = '';
    els.feedbackArea.classList.add('hidden');
    els.nextBtn.classList.add('hidden');

    // Renderizar según el tipo de pregunta
    switch(type) {
      case 'true-false':
        renderTrueFalse(q);
        break;
      case 'multiple-select':
        renderMultipleSelect(q);
        break;
      case 'matching':
        renderMatching(q);
        break;
      case 'fill-blank':
        renderFillBlank(q);
        break;
      default: // 'multiple-choice'
        renderMultipleChoice(q);
    }
  }

  function renderMultipleChoice(q) {
    // Crear array de opciones con índices originales
    const optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
    // Mezclar opciones
    const shuffledOptions = shuffleArray(optionsWithIndex);
    
    shuffledOptions.forEach(({ text, originalIndex }) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = text;
      btn.onclick = () => handleMultipleChoice(originalIndex, btn, q);
      els.optionsContainer.appendChild(btn);
    });
  }

  function renderTrueFalse(q) {
    const options = shuffleArray([
      { text: 'Verdadero', value: true },
      { text: 'Falso', value: false }
    ]);
    
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt.text;
      btn.onclick = () => handleTrueFalse(opt.value, btn, q);
      els.optionsContainer.appendChild(btn);
    });
  }

  function renderMultipleSelect(q) {
    const optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
    const shuffledOptions = shuffleArray(optionsWithIndex);
    
    shuffledOptions.forEach(({ text, originalIndex }) => {
      const label = document.createElement('label');
      label.className = 'option-btn';
      label.style.cursor = 'pointer';
      label.style.display = 'flex';
      label.style.alignItems = 'center';
      label.style.gap = '10px';
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.width = '20px';
      checkbox.style.height = '20px';
      checkbox.style.cursor = 'pointer';
      checkbox.onchange = () => {
        if (checkbox.checked) {
          selectedMultiple.add(originalIndex);
          label.classList.add('selected');
        } else {
          selectedMultiple.delete(originalIndex);
          label.classList.remove('selected');
        }
      };
      
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(text));
      els.optionsContainer.appendChild(label);
    });
    
    const submitBtn = document.createElement('button');
    submitBtn.className = 'next-btn';
    submitBtn.style.marginTop = '20px';
    submitBtn.textContent = 'Confirmar Selección';
    submitBtn.onclick = () => handleMultipleSelect(q);
    els.optionsContainer.appendChild(submitBtn);
  }

  function renderMatching(q) {
    const container = document.createElement('div');
    container.style.display = 'grid';
    container.style.gap = '15px';
    
    const pairs = q.pairs || [];
    const definitions = shuffleArray(pairs.map(p => p.definition));
    
    pairs.forEach((pair, idx) => {
      const pairDiv = document.createElement('div');
      pairDiv.style.display = 'grid';
      pairDiv.style.gridTemplateColumns = '1fr 1fr';
      pairDiv.style.gap = '10px';
      pairDiv.style.alignItems = 'center';
      
      const termDiv = document.createElement('div');
      termDiv.className = 'option-btn';
      termDiv.style.cursor = 'default';
      termDiv.style.fontWeight = 'bold';
      termDiv.textContent = pair.term;
      
      const select = document.createElement('select');
      select.className = 'option-btn';
      select.style.cursor = 'pointer';
      select.innerHTML = '<option value="">-- Selecciona --</option>';
      
      definitions.forEach((def, defIdx) => {
        const option = document.createElement('option');
        option.value = def;
        option.textContent = def;
        select.appendChild(option);
      });
      
      select.onchange = () => {
        selectedMatches[idx] = select.value;
      };
      
      pairDiv.appendChild(termDiv);
      pairDiv.appendChild(select);
      container.appendChild(pairDiv);
    });
    
    els.optionsContainer.appendChild(container);
    
    const submitBtn = document.createElement('button');
    submitBtn.className = 'next-btn';
    submitBtn.style.marginTop = '20px';
    submitBtn.textContent = 'Confirmar Respuestas';
    submitBtn.onclick = () => handleMatching(q);
    els.optionsContainer.appendChild(submitBtn);
  }

  function renderFillBlank(q) {
    const parts = q.question.split('___');
    const container = document.createElement('div');
    container.style.fontSize = '1.1rem';
    container.style.lineHeight = '2';
    
    parts.forEach((part, idx) => {
      const span = document.createElement('span');
      span.textContent = part;
      container.appendChild(span);
      
      if (idx < parts.length - 1) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'option-btn';
        input.style.display = 'inline-block';
        input.style.width = '200px';
        input.style.margin = '0 5px';
        input.style.textAlign = 'center';
        input.dataset.index = idx;
        container.appendChild(input);
      }
    });
    
    els.questionText.innerHTML = '';
    els.questionText.appendChild(container);
    
    const submitBtn = document.createElement('button');
    submitBtn.className = 'next-btn';
    submitBtn.style.marginTop = '20px';
    submitBtn.textContent = 'Confirmar Respuesta';
    submitBtn.onclick = () => handleFillBlank(q);
    els.optionsContainer.appendChild(submitBtn);
  }

  function handleMultipleChoice(selectedIndex, btn, q) {
    if (isAnswered) return;
    isAnswered = true;

    const isCorrect = selectedIndex === q.correct;
    const buttons = els.optionsContainer.querySelectorAll('.option-btn');

    if (isCorrect) {
      score++;
      btn.classList.add('correct');
      showFeedback(true, "¡Correcto! " + (q.explanation || ""));
      triggerConfetti();
    } else {
      btn.classList.add('incorrect');
      // Encontrar y marcar la respuesta correcta
      buttons.forEach(b => {
        if (b.textContent === q.options[q.correct]) {
          b.classList.add('correct');
        }
      });
      showFeedback(false, "Incorrecto. " + (q.explanation || ""));
    }

    buttons.forEach(b => b.disabled = true);
    els.nextBtn.classList.remove('hidden');
    
    if (currentQuestionIndex === questions.length - 1) {
      els.nextBtn.textContent = "Ver Resultados";
    }
  }

  function handleTrueFalse(selectedValue, btn, q) {
    if (isAnswered) return;
    isAnswered = true;

    const isCorrect = selectedValue === q.correct;
    const buttons = els.optionsContainer.querySelectorAll('.option-btn');

    if (isCorrect) {
      score++;
      btn.classList.add('correct');
      showFeedback(true, "¡Correcto! " + (q.explanation || ""));
      triggerConfetti();
    } else {
      btn.classList.add('incorrect');
      buttons.forEach(b => {
        if ((b.textContent === 'Verdadero' && q.correct === true) ||
            (b.textContent === 'Falso' && q.correct === false)) {
          b.classList.add('correct');
        }
      });
      showFeedback(false, "Incorrecto. " + (q.explanation || ""));
    }

    buttons.forEach(b => b.disabled = true);
    els.nextBtn.classList.remove('hidden');
    
    if (currentQuestionIndex === questions.length - 1) {
      els.nextBtn.textContent = "Ver Resultados";
    }
  }

  function handleMultipleSelect(q) {
    if (isAnswered) return;
    isAnswered = true;

    const correctSet = new Set(q.correct);
    const isCorrect = correctSet.size === selectedMultiple.size && 
                      [...correctSet].every(x => selectedMultiple.has(x));

    const labels = els.optionsContainer.querySelectorAll('label.option-btn');
    
    labels.forEach((label, idx) => {
      const checkbox = label.querySelector('input[type="checkbox"]');
      checkbox.disabled = true;
      
      const optionText = label.textContent.trim();
      const originalIndex = q.options.findIndex(opt => optionText.includes(opt));
      
      if (correctSet.has(originalIndex)) {
        label.classList.add('correct');
      } else if (selectedMultiple.has(originalIndex)) {
        label.classList.add('incorrect');
      }
    });

    if (isCorrect) {
      score++;
      showFeedback(true, "¡Correcto! " + (q.explanation || ""));
      triggerConfetti();
    } else {
      showFeedback(false, "Incorrecto. " + (q.explanation || ""));
    }

    els.nextBtn.classList.remove('hidden');
    
    if (currentQuestionIndex === questions.length - 1) {
      els.nextBtn.textContent = "Ver Resultados";
    }
  }

  function handleMatching(q) {
    if (isAnswered) return;
    isAnswered = true;

    const pairs = q.pairs || [];
    let correctCount = 0;

    pairs.forEach((pair, idx) => {
      if (selectedMatches[idx] === pair.definition) {
        correctCount++;
      }
    });

    const isCorrect = correctCount === pairs.length;
    const selects = els.optionsContainer.querySelectorAll('select');
    
    selects.forEach((select, idx) => {
      select.disabled = true;
      const parentDiv = select.parentElement;
      
      if (selectedMatches[idx] === pairs[idx].definition) {
        parentDiv.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
        parentDiv.style.border = '2px solid #22c55e';
      } else {
        parentDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        parentDiv.style.border = '2px solid #ef4444';
      }
    });

    if (isCorrect) {
      score++;
      showFeedback(true, "¡Correcto! Todas las coincidencias son correctas. " + (q.explanation || ""));
      triggerConfetti();
    } else {
      showFeedback(false, \`Parcialmente correcto: \${correctCount}/\${pairs.length} correctas. \` + (q.explanation || ""));
    }

    els.nextBtn.classList.remove('hidden');
    
    if (currentQuestionIndex === questions.length - 1) {
      els.nextBtn.textContent = "Ver Resultados";
    }
  }

  function handleFillBlank(q) {
    if (isAnswered) return;
    isAnswered = true;

    const inputs = els.questionText.querySelectorAll('input[type="text"]');
    const answers = q.answers || [];
    let correctCount = 0;

    inputs.forEach((input, idx) => {
      input.disabled = true;
      const userAnswer = input.value.trim().toLowerCase();
      const correctAnswer = answers[idx].toLowerCase();
      
      if (userAnswer === correctAnswer) {
        correctCount++;
        input.style.backgroundColor = '#22c55e';
        input.style.color = 'white';
        input.style.borderColor = '#22c55e';
      } else {
        input.style.backgroundColor = '#ef4444';
        input.style.color = 'white';
        input.style.borderColor = '#ef4444';
        input.value = userAnswer + ' ❌ (' + answers[idx] + ')';
      }
    });

    const isCorrect = correctCount === answers.length;

    if (isCorrect) {
      score++;
      showFeedback(true, "¡Correcto! " + (q.explanation || ""));
      triggerConfetti();
    } else {
      showFeedback(false, \`Parcialmente correcto: \${correctCount}/\${answers.length} correctas. \` + (q.explanation || ""));
    }

    els.nextBtn.classList.remove('hidden');
    
    if (currentQuestionIndex === questions.length - 1) {
      els.nextBtn.textContent = "Ver Resultados";
    }
  }

  function showFeedback(isSuccess, text) {
    els.feedbackArea.classList.remove('hidden');
    els.feedbackArea.className = \`feedback \${isSuccess ? 'success' : 'error'}\`;
    els.feedbackText.textContent = text;
  }

  els.nextBtn.onclick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showResults();
    }
  };

  function showResults() {
    els.quizScreen.classList.add('hidden');
    els.resultsScreen.classList.remove('hidden');
    
    const percentage = Math.round((score / questions.length) * 100);
    els.finalScore.textContent = percentage + '%';
    els.scoreFraction.textContent = \`\${score} / \${questions.length}\`;

    if (percentage > 70) {
      triggerBigConfetti();
    }
  }

  function triggerConfetti() {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  }

  function triggerBigConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  init();
</script>
</body>
</html>
  `;

  return htmlContent;
};

const getThemeStyles = (theme) => {
  if (theme === 'cyberpunk') {
    return {
      bgColor: '#09090b',
      textColor: '#e4e4e7',
      cardBg: '#18181b',
      accentColor: '#22c55e', // Green neon
      secondaryText: '#a1a1aa',
      borderColor: '#27272a',
      accentRgb: '34, 197, 94'
    };
  }
  if (theme === 'neon-blue') {
    return {
      bgColor: '#020617', // Very dark blue
      textColor: '#e2e8f0',
      cardBg: '#1e293b',
      accentColor: '#06b6d4', // Cyan
      secondaryText: '#94a3b8',
      borderColor: '#334155',
      accentRgb: '6, 182, 212'
    };
  }
  if (theme === 'pink-dream') {
    return {
      bgColor: '#fdf2f8', // Light pink
      textColor: '#831843', // Dark pink for text
      cardBg: '#ffffff',
      accentColor: '#ec4899', // Pink
      secondaryText: '#9d174d', // Medium pink
      borderColor: '#f9a8d4',
      accentRgb: '236, 72, 153'
    };
  }
  if (theme === 'formal-legal') {
    return {
      bgColor: '#f8f9fa', // Very light gray
      textColor: '#1e3a5f', // Dark blue
      cardBg: '#ffffff',
      accentColor: '#1e3a5f', // Dark blue for formal appearance
      secondaryText: '#6c757d', // Gray
      borderColor: '#d4af37', // Gold border
      accentRgb: '30, 58, 95'
    };
  }
  // Default: Zen Minimalist
  return {
    bgColor: '#f8fafc',
    textColor: '#1e293b',
    cardBg: '#ffffff',
    accentColor: '#3b82f6', // Blue
    secondaryText: '#64748b',
    borderColor: '#e2e8f0',
    accentRgb: '59, 130, 246'
  };
};
