<script lang="ts">
  type Size = "sm" | "md" | "lg" | "xl";
  let { size = "md", href = "/" }: { size?: Size; href?: string } = $props();

  const sizes: Record<Size, { main: string; sub: string }> = {
    sm: { main: "20px", sub: "7px" },
    md: { main: "28px", sub: "10px" },
    lg: { main: "42px", sub: "15px" },
    xl: { main: "64px", sub: "22px" },
  };
</script>

<a {href} class="brandmark" data-size={size}>
  <img
    src="/logo_icon.svg"
    alt="Progeta"
    class="brandmark__logo"
    style="height: calc({sizes[size].main} * 1.2);"
  />
  <div class="brandmark__text">
    <span class="brandmark__main" style="font-size: {sizes[size].main}"
      >PROGETA</span
    >
    <span class="brandmark__sub" style="font-size: {sizes[size].sub}"
      >Technologies</span
    >
  </div>
</a>

<style>
  .brandmark {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    height: fit-content;
  }
  .brandmark__logo {
    display: block;
    width: auto;
    object-fit: contain;
  }
  .brandmark__text {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    line-height: var(--leading-display);
  }
  .brandmark__main {
    font-family: var(--font-roboto);
    font-weight: 700;
    letter-spacing: var(--tracking-compressed);
    color: var(--ink-1);
    line-height: 1;
  }
  .brandmark__sub {
    font-family: var(--font-body);
    font-weight: 300;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-3);
    line-height: 1;
    text-transform: uppercase;
  }
  .brandmark:hover .brandmark__main {
    color: var(--ink-1);
  }
</style>
