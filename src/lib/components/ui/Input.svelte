<script lang="ts">
  let {
    label,
    type = 'text',
    name,
    value = $bindable(''),
    placeholder = '',
    required = false,
    rows = 4,
    accent,
  }: {
    label: string;
    type?: 'text' | 'email' | 'password' | 'url' | 'textarea';
    name: string;
    value?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    accent?: string;
  } = $props();

  let focused = $state(false);
  let filled = $derived(value.length > 0);
</script>

<div class="input-group" class:input-group--focused={focused} class:input-group--filled={filled} style={accent ? `--input-accent: ${accent}` : ''}>
  <label for={name} class="input-group__label">{label}</label>
  {#if type === 'textarea'}
    <textarea
      id={name}
      {name}
      {placeholder}
      {required}
      {rows}
      bind:value
      onfocus={() => focused = true}
      onblur={() => focused = false}
      class="input-group__field"
    ></textarea>
  {:else}
    <input
      id={name}
      {name}
      {type}
      {placeholder}
      {required}
      bind:value
      onfocus={() => focused = true}
      onblur={() => focused = false}
      class="input-group__field"
    />
  {/if}
</div>

<style>
  .input-group {
    position: relative;
    margin-bottom: var(--sp-6);
  }
  .input-group__label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--text-sm);
    font-weight: 400;
    color: var(--ink-3);
    margin-bottom: var(--sp-2);
    transition: color 0.2s;
  }
  .input-group--focused .input-group__label {
    color: var(--input-accent, var(--ink-2));
  }
  .input-group__field {
    display: block;
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border-3);
    color: var(--ink-1);
    font-family: var(--font-body);
    font-size: var(--text-base);
    padding: var(--sp-3) 0;
    outline: none;
    transition: border-color 0.2s;
    border-radius: 0;
    -webkit-appearance: none;
    resize: vertical;
  }
  .input-group__field::placeholder {
    color: var(--ink-4);
  }
  .input-group--focused .input-group__field {
    border-bottom-color: var(--input-accent, var(--ink-2));
  }
</style>
