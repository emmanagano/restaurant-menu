import { PageIntro } from "@/components/sections/PageIntro";
import { JsonLd } from "@/components/ui/JsonLd";
import { footer } from "@/content/microcopy";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { pageMetadata } from "@/lib/seo/metadata";

// TODO(content): the deck has no privacy copy, title or description. Everything on this page except the
// "About this concept" lines (from the deck's footer and FAQ) is a first draft written for review.
export const metadata = pageMetadata({
  title: "Privacy and This Concept | Uling",
  description:
    "How the Uling concept site handles what you type into its demo booking, enquiry and newsletter forms. No real bookings, payments or emails are made.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-page px-4 py-12">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />
      <PageIntro title="Privacy" />

      <div className="mt-12 max-w-prose space-y-10 text-lead">
        <section aria-labelledby="concept-heading" className="space-y-3">
          <h2 id="concept-heading" className="text-h2">
            About this concept
          </h2>
          <p>{footer.disclaimer}</p>
          <p>Not yet! Uling is a design and development concept by Emma Nagano.</p>
        </section>

        <section aria-labelledby="forms-heading" className="space-y-3">
          <h2 id="forms-heading" className="text-h2">
            What the forms do
          </h2>
          <p>
            The booking, enquiry, contact and newsletter forms save what you type (such as your name, email and
            phone number) so the demo works. Nothing is sent to a real restaurant, no confirmation is emailed, and
            no table is held.
          </p>
          <p>The gift card form takes no payment and stores nothing.</p>
          <p>Please don&apos;t enter details you wouldn&apos;t want saved on a demo site.</p>
        </section>

        <section aria-labelledby="analytics-heading" className="space-y-3">
          <h2 id="analytics-heading" className="text-h2">
            Analytics
          </h2>
          <p>
            The site records simple events, like a click on &ldquo;Book a table&rdquo;. They never include your name,
            email, phone number or anything else that identifies you.
          </p>
        </section>

        <section aria-labelledby="questions-heading" className="space-y-3">
          <h2 id="questions-heading" className="text-h2">
            Questions
          </h2>
          <p>
            Write to{" "}
            <a href={`mailto:${footer.email}`} className="inline-flex min-h-tap items-center font-semibold underline">
              {footer.email}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
