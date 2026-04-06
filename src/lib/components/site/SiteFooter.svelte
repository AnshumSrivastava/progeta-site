<script lang="ts">
  import BrandMark from "./BrandMark.svelte";
</script>

<footer class="footer">
  <div class="footer__inner">
    <!-- ── TOP: Brand + Link Columns in one grid ── -->
    <div class="footer__grid">
      <!-- Brand column -->
      <div class="footer__brand-col">
        <BrandMark size="sm" />
        <p class="footer__mission">
          To help people realise and achieve their dreams and goals.
        </p>
        <div class="footer__socials">
          <a
            href="https://linkedin.com/company/progeta"
            target="_blank"
            rel="noopener">LinkedIn</a
          >
          <span class="footer__dot">·</span>
          <a
            href="https://instagram.com/progeta.tech"
            target="_blank"
            rel="noopener">Instagram</a
          >
          <span class="footer__dot">·</span>
          <a href="https://discord.gg/progeta" target="_blank" rel="noopener"
            >Discord</a
          >
          <span class="footer__dot">·</span>
          <a href="https://github.com/progeta" target="_blank" rel="noopener"
            >GitHub</a
          >
        </div>
      </div>

      <!-- Col 1: LaunchPad -->
      <div class="footer__col">
        <span class="footer__label">LaunchPad</span>
        <a href="/launchpad/programmes">Programmes</a>
        <a href="/tracks">Tracks</a>
        <a href="/launchpad/workshops">Workshops</a>
        <a href="/launchpad/chapters">Chapters</a>
        <a href="/launchpad/certifications">Certifications</a>
        <a href="/launchpad/events">Events</a>
      </div>

      <!-- Col 2: Initiatives -->
      <div class="footer__col">
        <span class="footer__label">Initiatives</span>
        <a href="/selfos">SelfOS</a>
        <a href="/innercircle">InnerCircle</a>
        <span class="footer__ghost">More coming.</span>
      </div>

      <!-- Col 3: Resources -->
      <div class="footer__col">
        <span class="footer__label">Resources</span>
        <a href="/resources/articles">Articles</a>
        <a href="/resources/simulations">Simulations</a>
        <a href="/resources/glossary">Glossary</a>
        <a href="/verify">Verify Certificate</a>
      </div>

      <!-- Col 4: For You -->
      <div class="footer__col">
        <span class="footer__label">For You</span>
        <a href="/launchpad/students">Students</a>
        <a href="/launchpad/colleges">Colleges</a>
        <a href="/contact">Contact</a>
        <a href="/download">Download</a>
      </div>

      <!-- Col 5: Company -->
      <div class="footer__col">
        <span class="footer__label">Company</span>
        <a href="/about">About</a>
        <a href="/pricing">Pricing</a>
      </div>

      <!-- Col 6: Legal -->
      <div class="footer__col">
        <span class="footer__label">Legal & Trust</span>
        <a href="/legal/privacy-policy">Privacy Policy</a>
        <a href="/legal/terms-of-service">Terms of Service</a>
        <a href="/legal/cookie-policy">Cookie Policy</a>
        <a href="/legal/disclaimer">Disclaimer</a>
      </div>
    </div>

    <!-- ── BOTTOM BAR ── -->
    <div class="footer__bottom">
      <div class="footer__copyright">
        &copy; {new Date().getFullYear()} Progeta Technologies. All rights reserved.
      </div>
      <div class="footer__beliefs">
        <span>Equality</span>
        <span class="footer__dot">·</span>
        <span>Safe Spaces</span>
        <span class="footer__dot">·</span>
        <span>Individual Duty</span>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: var(--ground);
    border-top: 1px solid var(--border-1);
    padding: var(--sp-10) 0 var(--sp-6);
    position: relative;
    z-index: 1;
  }

  .footer__inner {
    max-width: var(--w-full);
    margin: 0 auto;
    padding: 0 var(--sp-8);
  }

  /* ── GRID: brand + 6 link columns ── */
  .footer__grid {
    display: grid;
    grid-template-columns: 240px repeat(6, 1fr);
    gap: var(--sp-8);
    padding-bottom: var(--sp-9);
    align-items: start;
  }

  .footer__brand-col {
    padding-right: var(--sp-4);
  }

  .footer__mission {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 300;
    color: var(--ink-3);
    line-height: var(--leading-relaxed);
    margin: var(--sp-5) 0 var(--sp-6);
  }

  .footer__socials {
    display: flex;
    align-items: center;
    gap: var(--sp-2);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--ink-4);
    flex-wrap: wrap;
  }

  .footer__socials a {
    color: var(--ink-3);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer__socials a:hover {
    color: var(--ink-1);
  }

  .footer__dot {
    color: var(--ink-4);
    opacity: 0.5;
  }

  /* ── LINK COLUMNS ── */
  .footer__col {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer__label {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-4);
    margin-bottom: 4px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-1);
  }

  .footer__col a {
    font-family: var(--font-body);
    font-size: 13px;
    color: var(--ink-3);
    text-decoration: none;
    transition: color 0.2s;
  }
  .footer__col a:hover {
    color: var(--ink-1);
  }

  .footer__ghost {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--ink-4);
    font-style: italic;
    margin-top: var(--sp-1);
  }

  /* ── BOTTOM BAR ── */
  .footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--sp-6);
    border-top: 1px solid var(--border-1);
  }

  .footer__copyright,
  .footer__beliefs {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink-4);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
  }

  .footer__beliefs {
    display: flex;
    gap: var(--sp-2);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .footer__grid {
      grid-template-columns: 1fr 1fr 1fr;
      gap: var(--sp-8) var(--sp-6);
    }
    .footer__brand-col {
      grid-column: 1 / -1;
      max-width: 320px;
      padding-bottom: var(--sp-4);
      border-bottom: 1px solid var(--border-1);
    }
  }

  @media (max-width: 640px) {
    .footer__grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--sp-7) var(--sp-5);
    }
    .footer__bottom {
      flex-direction: column;
      gap: var(--sp-4);
      text-align: center;
    }
  }

  @media (max-width: 400px) {
    .footer__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
