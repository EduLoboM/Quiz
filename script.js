const questions = [
    { text: "Para que uma expedição sobreviva, acredito que é essencial recrutar e interagir ativamente com usuários de diferentes categorias de Nen para formar uma 'party' perfeitamente equilibrada.", trait: "Manipulation", weight: 3 },
    { text: "Sinto um dever honroso em agir como um 'Mestre', guiando aprovados recentes no Exame Hunter para que despertem seu Nen com segurança e entendam as leis do submundo.", trait: "Transmutation", weight: 2 },
    { text: "Minha aura anseia pelo desconhecido: adoro inventar 'Condições e Juramentos' criativos, explorando ruínas ou testando aplicações de Nen que os Zodíacos sequer catalogaram.", trait: "Emission", weight: 3 },
    { text: "Quanto maior a ameaça, melhor. Faço questão de aceitar missões de Rank-A apenas pela satisfação de dominar um desafio que esmagaria Hunters comuns.", trait: "Conjuration", weight: 3 },
    { text: "Mais do que ter meu nome no mural de Caçadores de Recompensas, valorizo profundamente quando meus companheiros reconhecem que a minha tática de suporte foi o que manteve todo o esquadrão vivo.", trait: "Manipulation", weight: 3 },
    { text: "Sou implacável e focado: não descanso até que a minha caçada esteja 100% concluída, não importando quantos inimigos cruzem meu caminho.", trait: "Conjuration", weight: 3 },
    { text: "Sejamos honestos: o que me move a pegar o dirigível da Associação são os bilhões de Jennys na conta, os artefatos raros e o prestígio de conquistar Estrelas Hunter.", trait: "Enhancement", weight: 3 },
    { text: "Tenho o espírito indomável. Odeio a burocracia do Comitê de Avaliação; prefiro caçar e explorar o mundo com total liberdade, definindo minhas próprias regras e rotas no mapa.", trait: "Emission", weight: 3 },
    { text: "Se as leis da Associação Hunter parecem inúteis para a situação, crio minha própria lei, quebro protocolos e faço o que é necessário.", trait: "Specialization", weight: 6 },
    { text: "Minha aura brilha mais forte quando vejo o prêmio na mesa. Se a missão envolve o direito de ficar com uma relíquia ou uma fortuna, eu dou 200% de mim na linha de frente.", trait: "Enhancement", weight: 3 },
    { text: "Sinto que é minha obrigação compartilhar dados vitais sobre ecossistemas perigosos e ensinar princípios avançados para evitar que as próximas gerações caiam em armadilhas mortais.", trait: "Transmutation", weight: 2 },
    { text: "Minha bússola moral grita mais alto. Eu esgotaria minha aura para salvar a missão de um grupo aliado, mesmo que a Associação não me pague um Jenny a mais por isso.", trait: "Transmutation", weight: 2 }
];

const nenTypes = {
    "Enhancement": {
        name: "Reforço",
        kanji: "強化系",
        profile: "Jogador",
        color: "#f57c00",
        desc: "Os indivíduos de Reforço são focados e movidos por recompensas e conquistas claras. Assim como Gon ou Uvogin, você tem uma determinação inabalável quando o prêmio está à vista. Você tende a ser honesto, direto e dá 200% de si quando a motivação é certa."
    },
    "Transmutation": {
        name: "Transformação",
        kanji: "変化系",
        profile: "Filantropo",
        color: "#dc2626",
        desc: "Apesar da Transformação ser associada a inconstância, no seu caso reflete a capacidade de adaptar sua energia para proteger e ensinar os outros. Como Biscuit ou Killua, você tem uma forte bússola moral interna e dedica seus talentos para o bem maior."
    },
    "Conjuration": {
        name: "Materialização",
        kanji: "具現化系",
        profile: "Realizador",
        color: "#0ea5e9",
        desc: "Os indivíduos de Materialização são focados, analíticos e muitas vezes obcecados com seus objetivos. Assim como Kurapika, quando você define um alvo, você é implacável. Você prospera sob pressão e adora dominar desafios altamente complexos que esmagariam os outros."
    },
    "Specialization": {
        name: "Especialização",
        kanji: "特質系",
        profile: "Disruptor",
        color: "#8b5cf6",
        desc: "Os indivíduos de Especialização são carismáticos, únicos e não se prendem a regras convencionais. Assim como Chrollo ou Pariston, você não tem medo de quebrar protocolos, ignorar processos ineficientes e criar seu próprio caminho para alcançar resultados."
    },
    "Manipulation": {
        name: "Manipulação",
        kanji: "操作系",
        profile: "Socializador",
        color: "#ec4899",
        desc: "Os indivíduos de Manipulação valorizam o trabalho em equipe, conexões e o equilíbrio. Assim como Shalnark, você pensa estrategicamente sobre as dinâmicas de grupo. Você gosta de estruturar 'parties' eficientes e se sente realizado quando é reconhecido por seu papel de suporte."
    },
    "Emission": {
        name: "Emissão",
        kanji: "放出系",
        profile: "Espírito Livre",
        color: "#10753d",
        desc: "Os indivíduos de Emissão são independentes e anseiam pela liberdade. Assim como Leorio ou Knuckle, você odeia burocracias e limitações estritas. Você busca explorar o desconhecido, definir suas próprias regras e deixar sua aura fluir livremente pelo mundo."
    }
};

let userAnswers = new Array(questions.length).fill(null);

const screens = {
    intro: document.getElementById('intro-screen'),
    questions: document.getElementById('questions-screen'),
    result: document.getElementById('result-screen')
};

const UI = {
    startBtn: document.getElementById('start-btn'),
    submitBtn: document.getElementById('submit-btn'),
    allQuestionsContainer: document.getElementById('all-questions-container'),
    restartBtn: document.getElementById('restart-btn'),
    nenTitle: document.getElementById('nen-type'),
    nenKanji: document.getElementById('nen-kanji'),
    nenProfile: document.getElementById('nen-profile'),
    nenDesc: document.getElementById('nen-description'),
    errorMsg: document.getElementById('error-message')
};

function init() {
    UI.startBtn.addEventListener('click', startQuiz);
    UI.submitBtn.addEventListener('click', submitQuiz);
    UI.restartBtn.addEventListener('click', resetQuiz);
}

function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
    window.scrollTo(0, 0);
}

function startQuiz() {
    userAnswers.fill(null);
    UI.errorMsg.style.display = 'none';
    renderQuestions();
    showScreen('questions');
}

function renderQuestions() {
    UI.allQuestionsContainer.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionHtml = `
            <div class="question-card" id="q-${index}">
                <div class="question-number">${index + 1}</div>
                <h2>${q.text}</h2>
                <div class="likert-scale">
                    <label class="likert-option">
                        <input type="radio" name="q${index}" class="likert-radio" value="-4">
                        <span class="likert-label">Discordo<br>Totalmente</span>
                    </label>
                    <label class="likert-option">
                        <input type="radio" name="q${index}" class="likert-radio" value="-2">
                        <span class="likert-label">Discordo</span>
                    </label>
                    <label class="likert-option">
                        <input type="radio" name="q${index}" class="likert-radio" value="1">
                        <span class="likert-label">Neutro</span>
                    </label>
                    <label class="likert-option">
                        <input type="radio" name="q${index}" class="likert-radio" value="2">
                        <span class="likert-label">Concordo</span>
                    </label>
                    <label class="likert-option">
                        <input type="radio" name="q${index}" class="likert-radio" value="4">
                        <span class="likert-label">Concordo<br>Totalmente</span>
                    </label>
                </div>
            </div>
        `;
        UI.allQuestionsContainer.insertAdjacentHTML('beforeend', questionHtml);
    });

    document.querySelectorAll('.likert-radio').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const questionIndex = parseInt(e.target.name.substring(1));
            userAnswers[questionIndex] = parseInt(e.target.value);
            
            if (!userAnswers.includes(null)) {
                UI.errorMsg.style.display = 'none';
            }
        });
    });
}

function submitQuiz() {
    if (userAnswers.includes(null)) {
        UI.errorMsg.style.display = 'block';
        const firstUnanswered = userAnswers.indexOf(null);
        document.getElementById(`q-${firstUnanswered}`).scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        const card = document.getElementById(`q-${firstUnanswered}`);
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'shake 0.5s';
        return;
    }
    calculateResults();
}

function calculateResults() {
    let scores = {
        "Enhancement": 0,
        "Transmutation": 0,
        "Conjuration": 0,
        "Specialization": 0,
        "Manipulation": 0,
        "Emission": 0
    };

    userAnswers.forEach((answerValue, index) => {
        const q = questions[index];
        scores[q.trait] += (answerValue * q.weight);
    });

    let maxScore = -Infinity;
    let resultTrait = "Enhancement";
    
    for (let trait in scores) {
        if (scores[trait] > maxScore) {
            maxScore = scores[trait];
            resultTrait = trait;
        }
    }
    
    const resultInfo = nenTypes[resultTrait];
    
    UI.nenTitle.textContent = resultInfo.name;
    UI.nenTitle.style.color = resultInfo.color;
    
    UI.nenKanji.textContent = resultInfo.kanji;
    UI.nenProfile.textContent = `Perfil: ${resultInfo.profile}`;
    UI.nenProfile.style.color = resultInfo.color;
    UI.nenProfile.style.borderColor = resultInfo.color;
    UI.nenDesc.textContent = resultInfo.desc;
    
    drawRadar(scores, resultInfo.color);
    
    showScreen('result');
}

function drawRadar(scores, mainColor) {
    const traitsOrder = ['Enhancement', 'Transmutation', 'Conjuration', 'Specialization', 'Manipulation', 'Emission'];
    
    const minRawScore = Math.min(...Object.values(scores));
    const maxRawScore = Math.max(...Object.values(scores));
    const range = (maxRawScore - minRawScore) || 1;
    
    const canvas = document.getElementById('radar-canvas');
    const ctx = canvas.getContext('2d');
    const size = canvas.width; // 800
    const center = size / 2;
    const maxRadius = (size / 2) - 80; // Space for labels at 2x resolution
    
    ctx.clearRect(0, 0, size, size);
    
    // Draw background grid (Hexagons)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    for(let i = 1; i <= 4; i++) {
        const r = maxRadius * (i / 4);
        ctx.beginPath();
        for(let j = 0; j < 6; j++) {
            const angle = (Math.PI / 3) * j - (Math.PI / 2);
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            if(j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    
    // Draw axes & labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 28px Nunito';
    
    traitsOrder.forEach((trait, i) => {
        const angle = (Math.PI / 3) * i - (Math.PI / 2);
        
        ctx.beginPath();
        ctx.moveTo(center, center);
        ctx.lineTo(center + maxRadius * Math.cos(angle), center + maxRadius * Math.sin(angle));
        ctx.strokeStyle = '#e2e8f0';
        ctx.stroke();
        
        const labelR = maxRadius + 45;
        const x = center + labelR * Math.cos(angle);
        const y = center + labelR * Math.sin(angle);
        ctx.fillStyle = nenTypes[trait].color;
        ctx.fillText(nenTypes[trait].name, x, y);
    });
    
    // Draw data polygon
    ctx.beginPath();
    ctx.fillStyle = mainColor + '66'; // 40% opacity hex
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 6;
    
    traitsOrder.forEach((trait, i) => {
        const angle = (Math.PI / 3) * i - (Math.PI / 2);
        const rawScore = scores[trait];
        const normalized = 0.1 + 0.9 * ((rawScore - minRawScore) / range);
        const r = maxRadius * normalized;
        
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        
        if(i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw points
    traitsOrder.forEach((trait, i) => {
        const angle = (Math.PI / 3) * i - (Math.PI / 2);
        const rawScore = scores[trait];
        const normalized = 0.1 + 0.9 * ((rawScore - minRawScore) / range);
        const r = maxRadius * normalized;
        
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();
    });
}

function resetQuiz() {
    showScreen('intro');
}

const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', init);
