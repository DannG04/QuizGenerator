
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

  function init() {
    els.totalQ.textContent = questions.length;
    loadQuestion();
  }

  function loadQuestion() {
    isAnswered = false;
    const q = questions[currentQuestionIndex];
    els.currentQ.textContent = currentQuestionIndex + 1;
    els.questionText.textContent = q.question;
    els.optionsContainer.innerHTML = '';
    els.feedbackArea.classList.add('hidden');
    els.nextBtn.classList.add('hidden');

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.onclick = () => handleAnswer(idx, btn);
      els.optionsContainer.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, btn) {
    if (isAnswered) return;
    isAnswered = true;

    const q = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === q.correct;
    const buttons = els.optionsContainer.querySelectorAll('.option-btn');

    if (isCorrect) {
      score++;
      btn.classList.add('correct');
      showFeedback(true, "¡Correcto! " + (q.explanation || ""));
      triggerConfetti();
    } else {
      btn.classList.add('incorrect');
      buttons[q.correct].classList.add('correct');
      showFeedback(false, "Incorrecto. " + (q.explanation || ""));
    }

    // Disable all buttons
    buttons.forEach(b => b.disabled = true);
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
