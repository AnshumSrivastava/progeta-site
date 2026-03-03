<script lang="ts">
  import BrandMark from './BrandMark.svelte';
</script>

<footer class="footer">
  <div class="footer__inner">
    <div class="footer__grid">
      <!-- Brand column -->
      <div class="footer__brand-col">
        <BrandMark size="sm" />
        <p class="footer__mission">
          To help people realise and achieve their dreams and goals.
        </p>
        <div class="footer__socials">
          <a href="https://linkedin.com/company/progeta" target="_blank" rel="noopener">LinkedIn</a>
          <span class="footer__dot">·</span>
          <a href="https://instagram.com/progeta.tech" target="_blank" rel="noopener">Instagram</a>
          <span class="footer__dot">·</span>
          <a href="https://discord.gg/progeta" target="_blank" rel="noopener">Discord</a>
          <span class="footer__dot">·</span>
          <a href="https://github.com/progeta" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>

      <!-- 5-column links -->
      <div class="footer__links">
        <!-- Col 1: LaunchPad -->
        <div class="footer__col">
          <span class="footer__label">LaunchPad</span>
          <a href="/launchpad/programmes">Programmes</a>
          <a href="/launchpad/tracks">Tracks</a>
          <a href="/launchpad/workshops">Workshops</a>
          <a href="/launchpad/chapters">Chapters</a>
          <a href="/launchpad/certifications">Certifications</a>
          <a href="/launchpad/events">Events</a>
        </div>

        <!-- Col 2: Products & Community -->
        <div class="footer__col">
          <span class="footer__label">Products & Community</span>
          <a href="/selfos">SelfOS</a>
          <a href="/innercircle">InnerCircle</a>
          <span class="footer__ghost">More coming.</span>
        </div>

        <!-- Col 3: Resources -->
        <div class="footer__col">
          <span class="footer__label">Resources</span>
          <a href="/resources/articles">Articles</a>
          <a href="/resources/games">Games</a>
          <a href="/resources/gallery">Gallery</a>
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
          <a href="/about">Mission</a>
          <a href="/about">About</a>
          <a href="/pricing">Pricing</a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="footer__copyright">
        &copy; {new Date().getFullYear()} Progeta Technologies. All rights reserved.
      </div>
      <div class="footer__beliefs">
        <span>Equality</span>
        <span>·</span>
        <span>Safe Spaces</span>
        <span>·</span>
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

  .footer__grid {
    display: flex;
    justify-content: space-between;
    gap: var(--sp-10);
    padding-bottom: var(--sp-9);
  }

  .footer__brand-col {
    max-width: 240px;
    flex-shrink: 0;
  }

  .footer__mission {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 300;
    color: var(--ink-3);
    line-height: var(--leading-relaxed);
    margin: var(--sp-5) 0 var(--sp-6);
    max-width: none;
  }

  .footer__socials {
    display: flex;
    align-items: center;
    gap: var(--sp-3);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--ink-3);
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

  .footer__links {
    display: flex;
    gap: var(--sp-9);
    flex-wrap: wrap;
  }

  .footer__col {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    min-width: 110px;
  }

  .footer__label {
    font-family: var(--font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: var(--tracking-widest);
    color: var(--ink-4);
    margin-bottom: var(--sp-2);
  }

  .footer__col a {
    font-family: var(--font-body);
    font-size: 14px;
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
    margin-top: var(--sp-2);
  }

  .footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--sp-6);
    border-top: 1px solid var(--border-1);
  }

  .footer__copyright, .footer__beliefs {
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--ink-4);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
  }

  .footer__beliefs {
    display: flex;
    gap: var(--sp-2);
  }

  @media (max-width: 1024px) {
    .footer__grid {
      flex-direction: column;
      gap: var(--sp-9);
    }
    .footer__links {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--sp-7);
    }
    .footer__bottom {
      flex-direction: column;
      gap: var(--sp-4);
      text-align: center;
    }
  }

  @media (max-width: 768px) {
    .footer__links {
      grid-template-columns: 1fr;
    }
  }
</style>
