'use client';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="flex justify-center gap-4 mb-4">
        <a href="https://x.com/TheAl_Mo" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="X / Twitter">
          &#x1D54F;
        </a>
        <a href="https://github.com/Nostem" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="GitHub">
          &#9881;
        </a>
        <a href="https://nostem.substack.com" className="footer-social-link" target="_blank" rel="noopener noreferrer" title="Substack">
          &#9993;
        </a>
      </div>
      <div className="font-special-elite italic text-[var(--color-text-muted)] text-[0.9rem] mb-1">
        Built with curiosity.
      </div>
      <div className="text-[0.8rem] text-[var(--color-text-muted)] opacity-70">
        &copy; {new Date().getFullYear()} Nostem Koempassu
      </div>
    </footer>
  );
}
