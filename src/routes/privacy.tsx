import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Prose } from "@/components/site/Prose";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Patonics International" },
      {
        name: "description",
        content:
          "How Patonics International Trading Co. handles information from this website and from export enquiries.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy"
        lead="What this website collects, what it does not, and what happens to an enquiry once you send one."
      />

      <Prose updated="18 November 2026">
        <h2>Who this covers</h2>
        <p>
          This policy covers {CONTACT.company}, {CONTACT.addressLines.join(", ")}, and this website.
          For any question about it, write to{" "}
          <a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a>.
        </p>

        <h2>What the website collects</h2>
        <p>
          Nothing automatically. This site sets no cookies, runs no analytics, and carries no
          advertising or tracking scripts. There is no account to create and nothing to log in to.
        </p>

        <h2>The enquiry form</h2>
        <p>
          The enquiry form runs entirely in your browser. Nothing you type is sent anywhere while
          you fill it in. When you press submit, the form opens your own email application with the
          details already written into a message addressed to our trade desk. That message is not
          sent until you send it yourself, and you can edit or discard it first.
        </p>
        <p>
          Once you do send it, we hold your message in our email system and use it only to answer
          your enquiry and to keep a record of the correspondence. We do not sell it, and we do not
          add you to a marketing list.
        </p>

        <h2>Things outside our control</h2>
        <ul>
          <li>
            <strong>Our hosting provider.</strong> Like any web host, it may keep standard server
            logs, which typically include your IP address, browser type and the pages requested.
            These are used to operate and secure the service.
          </li>
          <li>
            <strong>Google Fonts.</strong> This site loads its typeface from Google&rsquo;s font
            servers. Your browser therefore makes a request to Google, and Google receives your IP
            address as part of that request. If you would rather that did not happen, we can serve
            the font from our own domain instead.
          </li>
        </ul>

        <h2>How long we keep things</h2>
        <p>
          Enquiry correspondence is kept for as long as it is useful to the business relationship
          and for any period required by applicable tax and company law, then deleted.
        </p>

        <h2>Your rights</h2>
        <p>
          You may ask us what we hold about you, ask for it to be corrected, or ask for it to be
          deleted. Write to <a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a> and we
          will respond. If you are in a jurisdiction with specific data protection rights, such as
          the EU or UK, those rights apply to the information you have sent us.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the date at the top of this page changes with it. Material changes
          will be described here rather than made quietly.
        </p>
      </Prose>
    </main>
  );
}
