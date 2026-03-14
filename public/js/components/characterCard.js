const avatarColors = [
  ['#a5b4fc', '#6366f1'],
  ['#86efac', '#22c55e'],
  ['#fca5a5', '#ef4444'],
  ['#fdba74', '#f97316'],
  ['#93c5fd', '#3b82f6'],
  ['#c4b5fd', '#8b5cf6'],
  ['#fde68a', '#eab308'],
  ['#a5f3fc', '#06b6d4'],
];

function getAvatarGradient(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const idx = Math.abs(hash) % avatarColors.length;
  return avatarColors[idx];
}

const toneLabels = {
  formal: 'Resmi / Formal',
  casual: 'Samimi / Casual',
  humorous: 'Esprili / Humorous',
  dramatic: 'Dramatik / Dramatic',
  poetic: 'Şiirsel / Poetic'
};
