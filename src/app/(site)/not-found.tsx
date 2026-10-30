import { Button } from "@/components/ui/Button";
import { buttons } from "@/content/microcopy";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-20">
      <h1 className="text-title">This page went up in smoke.</h1>
      <p className="mt-4 text-lead text-ink-muted">Let&apos;s get you back to the good stuff.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Go home</Button>
        <Button href="/menu" variant="secondary">
          {buttons.seeMenu}
        </Button>
      </div>
    </main>
  );
}
