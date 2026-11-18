import { useEffect, useState } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT, telHref, waHref } from "@/lib/site-data";
import { cn } from "@/lib/utils";

/**
 * Trade buyers on phones overwhelmingly call rather than fill in a form, so the
 * three fastest routes stay within thumb reach. It appears once the hero has
 * scrolled away, to avoid competing with the hero's own calls to action.
 */
export function MobileActionBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const phone = CONTACT.phones[0] ?? "";

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur-xl transition-transform duration-500 lg:hidden",
        shown ? "translate-y-0" : "translate-y-full",
      )}
      // Hidden from assistive tech while off-screen: the same routes are in the
      // contact section and the footer.
      aria-hidden={!shown}
    >
      <div className="grid grid-cols-3 divide-x divide-white/10 pb-[env(safe-area-inset-bottom)]">
        <a
          href={telHref(phone)}
          className="flex flex-col items-center gap-1.5 py-3.5 text-white/80 transition-colors active:bg-white/5"
          tabIndex={shown ? 0 : -1}
        >
          <Phone className="size-5 text-brand-green" aria-hidden />
          <span className="text-[0.7rem] font-semibold">Call</span>
        </a>
        <a
          href={waHref(phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 py-3.5 text-white/80 transition-colors active:bg-white/5"
          tabIndex={shown ? 0 : -1}
        >
          <MessageCircle className="size-5 text-brand-green" aria-hidden />
          <span className="text-[0.7rem] font-semibold">WhatsApp</span>
        </a>
        <a
          href="#contact"
          className="flex flex-col items-center gap-1.5 bg-brand-green-deep py-3.5 text-white transition-colors active:bg-brand-green-deep/85"
          tabIndex={shown ? 0 : -1}
        >
          <Mail className="size-5" aria-hidden />
          <span className="text-[0.7rem] font-semibold">Inquiry</span>
        </a>
      </div>
    </div>
  );
}
