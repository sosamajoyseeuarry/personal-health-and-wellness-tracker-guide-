(() => {
  const dateKey = new Date().toLocaleDateString('en-CA');
  const storageKey = `daywell-${dateKey}`;
  const defaults = { water: 0, sleep: 8, habits: { water: false, move: false, rest: false, eating: false, hygiene: false, mental: false }, reminders: false };
  let state;
  let reminderTimer = null;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    state = { ...defaults, ...saved, habits: { ...defaults.habits, ...(saved?.habits || {}) } };
  } catch {
    state = { ...defaults, habits: { ...defaults.habits } };
  }
  const $ = (selector) => document.querySelector(selector);
  const toast = $('#toast');
  let toastTimer;

  function save() { localStorage.setItem(storageKey, JSON.stringify(state)); }
  function announce(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }
  function render() {
    const water = Math.max(0, state.water);
    const done = Object.values(state.habits).filter(Boolean).length;
    $('#water-total').textContent = water.toLocaleString();
    $('#water-fill').style.width = `${Math.min(100, water / 2000 * 100)}%`;
    $('#water-fill').parentElement.setAttribute('aria-valuenow', water);
    $('#score-text').textContent = `${done} of 6 done`;
    $('#score-fill').style.width = `${done / 6 * 100}%`;
    $('#score-fill').parentElement.setAttribute('aria-valuenow', done);
    $('#sleep-value').textContent = Number(state.sleep).toLocaleString(undefined, { maximumFractionDigits: 1 });
    $('#sleep-range').value = state.sleep;
    $('#reminder-toggle').checked = state.reminders;
    document.querySelectorAll('[data-habit]').forEach((input) => { input.checked = Boolean(state.habits[input.dataset.habit]); });
    $('#sleep-note').textContent = state.sleep >= 7 && state.sleep <= 9
      ? 'A steady sleep routine can support your energy and focus.'
      : state.sleep < 7
        ? 'A little more rest may help you feel refreshed. See what fits your schedule.'
        : 'You may need extra rest today. Pay attention to how your body feels.';
  }

  $('#today-date').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  render();
  document.querySelectorAll('[data-habit]').forEach((input) => input.addEventListener('change', () => {
    state.habits[input.dataset.habit] = input.checked;
    save();
    render();
  }));
  $('#add-water').addEventListener('click', () => {
    state.water += 250;
    state.habits.water = true;
    save(); render();
    announce(state.water >= 2000 ? 'Water goal reached. Nice work staying hydrated.' : '250 ml added. Keep going at your own pace.');
  });
  $('#remove-water').addEventListener('click', () => {
    state.water = Math.max(0, state.water - 250);
    if (state.water === 0) state.habits.water = false;
    save(); render();
  });
  $('#sleep-range').addEventListener('input', (event) => {
    state.sleep = Number(event.target.value);
    save(); render();
  });
  $('#reminder-toggle').addEventListener('change', async (event) => {
    if (event.target.checked && 'Notification' in window && Notification.permission === 'default') {
      try { await Notification.requestPermission(); } catch {}
    }
    state.reminders = event.target.checked;
    clearInterval(reminderTimer);
    reminderTimer = state.reminders ? setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      announce('Time for a sip of water?');
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Daywell water break', { body: 'Time for a sip of water?' });
      }
    }, 60 * 60 * 1000) : null;
    save();
    announce(state.reminders ? 'Hourly water nudges are on while this page is open.' : 'Water nudges are off.');
  });

  const tips = [
    { category: 'Gentle reset', text: 'Take a 10-minute walk outside. A little daylight and fresh air can shift your whole afternoon.', meta: 'Easy · 10 minutes' },
    { category: 'Desk break', text: 'Roll your shoulders, reach overhead, and take a few slow breaths between tasks.', meta: 'Easy · 3 minutes' },
    { category: 'Make it social', text: 'Invite a friend for a walk or try a movement class in your community.', meta: 'Steady · 20 minutes' },
    { category: 'Build a little strength', text: 'Try a few chair squats or wall push-ups, moving at a pace that feels comfortable.', meta: 'Steady · 5 minutes' },
    { category: 'Wind down', text: 'Put on one favorite song and stretch gently until it ends.', meta: 'Easy · 4 minutes' }
  ];
  let tipIndex = 0;
  $('#next-tip').addEventListener('click', () => {
    tipIndex = (tipIndex + 1) % tips.length;
    const tip = tips[tipIndex];
    $('#tip-category').textContent = tip.category;
    $('#tip-text').textContent = tip.text;
    $('#tip-meta').textContent = tip.meta;
  });

  if (state.reminders) {
    reminderTimer = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      announce('Time for a sip of water?');
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Daywell water break', { body: 'Time for a sip of water?' });
      }
    }, 60 * 60 * 1000);
  }
})();