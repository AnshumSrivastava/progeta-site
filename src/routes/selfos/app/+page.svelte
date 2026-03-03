<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte';
  import Tag from '$lib/components/ui/Tag.svelte';

  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();
</script>

<div class="dashboard">
  <header class="dash-header">
    <div class="dash-header__top">
      <span class="dash-header__date">{currentDate}</span>
      <Tag label={auth.mode === 'cloud' ? 'CLOUD SYNC' : 'LOCAL MODE'} variant="active" live={auth.mode === 'cloud'} />
    </div>
    <h1 class="dash-header__greeting">{greeting}.</h1>
    <p class="dash-header__sub">Here is where you are today.</p>
  </header>

  <div class="dash-grid">
    <!-- Today's Tasks -->
    <div class="dash-card">
      <div class="dash-card__header">
        <span class="dash-card__title">Today's Tasks</span>
        <a href="/selfos/app/tasks" class="dash-card__link">View all →</a>
      </div>
      <div class="dash-card__empty">
        <p>No tasks yet. Start by adding one.</p>
        <a href="/selfos/app/tasks" class="dash-card__add">+ Add Task</a>
      </div>
    </div>

    <!-- Habit Streak -->
    <div class="dash-card">
      <div class="dash-card__header">
        <span class="dash-card__title">Habits</span>
        <a href="/selfos/app/habits" class="dash-card__link">View all →</a>
      </div>
      <div class="dash-card__empty">
        <p>No habits tracked. Build your first routine.</p>
        <a href="/selfos/app/habits" class="dash-card__add">+ Add Habit</a>
      </div>
    </div>

    <!-- Current Goals -->
    <div class="dash-card">
      <div class="dash-card__header">
        <span class="dash-card__title">Active Goals</span>
        <a href="/selfos/app/goals" class="dash-card__link">View all →</a>
      </div>
      <div class="dash-card__empty">
        <p>No goals set. Define what you are building towards.</p>
        <a href="/selfos/app/goals" class="dash-card__add">+ Add Goal</a>
      </div>
    </div>

    <!-- Quick Entry -->
    <div class="dash-card dash-card--accent">
      <div class="dash-card__header">
        <span class="dash-card__title">Quick Entry</span>
      </div>
      <div class="dash-card__quick">
        <a href="/selfos/app/tasks" class="quick-btn">+ Task</a>
        <a href="/selfos/app/notes" class="quick-btn">+ Note</a>
        <a href="/selfos/app/journal" class="quick-btn">+ Journal</a>
        <a href="/selfos/app/finance" class="quick-btn">+ Transaction</a>
      </div>
    </div>
  </div>
</div>

<style>
  .dashboard {
    max-width: 900px;
    margin: 0 auto;
  }
  .dash-header {
    padding-bottom: var(--sp-8);
    border-bottom: 1px solid var(--border-1);
    margin-bottom: var(--sp-7);
  }
  .dash-header__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--sp-5);
  }
  .dash-header__date {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--ink-4);
    letter-spacing: var(--tracking-widest);
  }
  .dash-header__greeting {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: var(--text-2xl);
    margin-bottom: var(--sp-3);
  }
  .dash-header__sub {
    color: var(--ink-3);
  }

  .dash-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--sp-6);
  }
  .dash-card {
    padding: var(--sp-6);
    border: 1px solid var(--border-1);
    display: flex;
    flex-direction: column;
  }
  .dash-card--accent {
    border-color: var(--border-2);
    background: var(--surface-1);
  }
  .dash-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--sp-5);
  }
  .dash-card__title {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--ink-2);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
  }
  .dash-card__link {
    font-size: var(--text-xs);
    color: var(--ink-3);
    text-decoration: none;
    transition: color 0.15s;
  }
  .dash-card__link:hover { color: var(--ink-1); }
  .dash-card__empty {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--sp-5) 0;
  }
  .dash-card__empty p {
    font-size: var(--text-sm);
    color: var(--ink-4);
    margin-bottom: var(--sp-3);
    max-width: none;
  }
  .dash-card__add {
    font-family: var(--font-body);
    font-size: var(--text-sm);
    color: var(--accent-blue);
    transition: color 0.15s;
    text-decoration: none;
  }
  .dash-card__add:hover { color: var(--ink-1); }
  .dash-card__quick {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp-3);
  }
  .quick-btn {
    flex: 1;
    min-width: 100px;
    text-align: center;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--ink-2);
    padding: var(--sp-3) var(--sp-4);
    border: 1px solid var(--border-2);
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s;
  }
  .quick-btn:hover {
    border-color: var(--accent-blue);
    color: var(--ink-1);
  }

  @media (max-width: 768px) {
    .dash-grid { grid-template-columns: 1fr; }
  }
</style>
