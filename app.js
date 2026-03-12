import { curriculum, links, hoursUntilFade, scheduleReview } from './lib.js';

const state = {
  topics: structuredClone(curriculum),
  mistakes: [],
  activeTopicId: 'stats'
};

const byId = () => new Map(state.topics.map((t) => [t.id, t]));

function nodeColor(topic) {
  if (topic.progress === 0) return '#ffffff';
  const hue = Math.min(140 + topic.progress, 310);
  return `hsl(${hue} 70% 62%)`;
}

function metrics() {
  const mastered = state.topics.filter((t) => t.progress >= 100).length;
  const active = state.topics.filter((t) => t.progress > 0 && t.progress < 100).length;
  const avg = Math.round(state.topics.reduce((sum, t) => sum + t.progress, 0) / state.topics.length);
  return { mastered, active, avg, backlog: state.mistakes.length };
}

function renderCards() {
  const m = metrics();
  const cards = [
    ['Mastered Nodes', m.mastered],
    ['Active Nodes', m.active],
    ['Average Saturation', `${m.avg}%`],
    ['Backlog Items', m.backlog]
  ];
  document.getElementById('cards').innerHTML = cards
    .map(([label, value]) => `<article class="card"><p class="label">${label}</p><p class="value">${value}</p></article>`)
    .join('');
}

function renderWeb() {
  const svg = document.getElementById('knowledge-web');
  const map = byId();
  svg.innerHTML = '';

  links.forEach(([a, b]) => {
    const s = map.get(a), t = map.get(b);
    if (!s || !t) return;
    svg.insertAdjacentHTML('beforeend', `<line x1="${s.x}" y1="${s.y}" x2="${t.x}" y2="${t.y}" stroke="rgba(148,163,184,.35)" stroke-width="2"/>`);
  });

  state.topics.forEach((topic) => {
    const active = topic.id === state.activeTopicId;
    const opacity = topic.status === 'locked' ? 0.2 : topic.status === 'fading' ? 0.55 : topic.status === 'learning' ? 0.8 : 1;
    svg.insertAdjacentHTML(
      'beforeend',
      `<g class="node" data-id="${topic.id}" opacity="${opacity}">
        <circle cx="${topic.x}" cy="${topic.y}" r="${18 + topic.progress / 8}" fill="${nodeColor(topic)}" stroke="${active ? '#f8fafc' : 'rgba(255,255,255,.45)'}" stroke-width="${active ? 4 : 1}" />
        <text x="${topic.x + 24}" y="${topic.y + 4}" fill="white" font-size="12">${topic.name}</text>
      </g>`
    );
  });

  svg.querySelectorAll('.node').forEach((el) => el.addEventListener('click', () => {
    state.activeTopicId = el.dataset.id;
    render();
  }));
}

function submitAnswer(event, topic, question) {
  event.preventDefault();
  const selected = Number(new FormData(event.target).get('choice'));
  if (Number.isNaN(selected)) return;
  const correct = selected === question.answer;

  topic.progress = Math.max(0, Math.min(100, topic.progress + (correct ? 8 : -3)));
  topic.status = topic.progress === 100 ? 'mastered' : topic.progress > 0 ? 'learning' : 'locked';

  const key = `${topic.id}:${question.id}`;
  const existing = state.mistakes.find((m) => m.key === key);

  if (correct) {
    state.mistakes = state.mistakes.filter((m) => m.key !== key);
    topic.dueReviewAt = scheduleReview(new Date(), (existing?.attempts ?? 1), true).toISOString();
  } else {
    const attempts = (existing?.attempts ?? 0) + 1;
    topic.status = 'fading';
    topic.dueReviewAt = scheduleReview(new Date(), attempts, false).toISOString();
    state.mistakes = [...state.mistakes.filter((m) => m.key !== key), { key, attempts }];
  }

  render();
}

function renderLesson() {
  const topic = state.topics.find((t) => t.id === state.activeTopicId);
  if (!topic) return;
  const question = topic.questions[0];
  const backlogCount = state.mistakes.filter((m) => m.key.startsWith(`${topic.id}:`)).length;

  const root = document.getElementById('lesson-panel');
  root.innerHTML = `
    <p class="eyebrow">Mission</p>
    <h3>${topic.name}</h3>
    <p class="meta">Vocabulary: ${topic.vocabulary.join(' • ')}</p>
    <p class="meta">Concept: ${topic.concepts[0]}</p>
    <div class="quiz">
      <p class="meta">Mistakes backlog: ${backlogCount}</p>
      ${topic.dueReviewAt ? `<p class="small">Node fades in ~${hoursUntilFade(topic.dueReviewAt)}h if not reviewed.</p>` : ''}
      <form id="quiz-form">
        <p>${question.prompt}</p>
        ${question.choices.map((c, i) => `<label class="choice"><input name="choice" type="radio" value="${i}" />${c}</label>`).join('')}
        <button>Submit checkpoint</button>
      </form>
    </div>
  `;

  root.querySelector('#quiz-form').addEventListener('submit', (e) => submitAnswer(e, topic, question));
}

function render() {
  renderCards();
  renderWeb();
  renderLesson();
}

render();
