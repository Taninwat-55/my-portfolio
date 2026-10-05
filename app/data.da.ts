import type { EnquiryMessages } from "./lib/services-enquiry";

/**
 * Danish copy for /da.
 *
 * PROOFREAD AND PUBLISHED. Drafted by Claude, read line by line by a native Danish
 * speaker (item 28 in PLAN.md), and live since 2026-08-22. Ice speaks Danish at
 * beginner level, so he cannot review changes here himself: any new or edited
 * string needs a native speaker again before it ships.
 *
 * To hand it to a proofreader: `npm run copy da` prints every string as plain
 * readable text. Nobody proofreads TypeScript.
 *
 * NOTHING NUMERIC LIVES HERE, same rule as the Thai and Swedish files. Prices,
 * timelines and metrics are read from `services` / `cases` / `servicesProcess` at
 * render time. If you find yourself typing a number into this file, that is the bug.
 *
 * NO PRICE TRANSFORM NEEDED, unlike /sv. The prices in data.ts are already in
 * Danish kroner written the Danish way — "6.500" with a dot for thousands — so
 * they render correctly as-is. svPrice() exists only because Swedish uses a space
 * for thousands and a Swedish reader can parse "6.500" as six and a half.
 */

/**
 * Translates the unit WORD in a scope or duration without copying its numbers.
 *
 * "1–3 pages" → "1–3 sider". The numerals keep coming from `services` /
 * `servicesProcess`, so a page count or timeline that changes there changes here.
 *
 * Longest keys first: "weeks" must match before "week", "days" before "day".
 */
const UNIT_WORDS: [string, string][] = [
  ["Add-ons", "Tilvalg"],
  ["pages", "sider"],
  ["weeks", "uger"],
  ["week", "uge"],
  ["days", "dage"],
  ["day", "dag"],
  ["each", "pr. stk."],
  ["min", "min."],
  // Item 44. These three only ever appear in the aftercare price and unit —
  // "650 DKK / hour" and "5 hours · valid 12 months". Safe to add because daUnits
  // is applied to exactly two other values on the page, a price-ladder scope and a
  // process duration, and neither contains any of these words.
  ["hours", "timer"],
  ["hour", "time"],
  ["months", "måneder"],
  ["valid", "gælder"],
];

export function daUnits(value: string): string {
  return UNIT_WORDS.reduce((out, [en, da]) => out.replace(en, da), value);
}

export const daContent = {
  /** Used on the page wrapper and for hreflang (published 2026-08-22). */
  locale: "da",

  meta: {
    title: "Hjemmeside til små virksomheder — fast pris, du ejer det hele",
    description:
      "Jeg bygger hjemmesider til små virksomheder i Danmark. Fast pris aftalt skriftligt, før vi begynder, og du ejer domæne, hosting og kode.",
  },

  hero: {
    eyebrow: "For små virksomheder i Danmark",
    title: "Hjemmeside til din virksomhed",
    lead: "Fast pris. Du ejer det hele. Ingen månedlige gebyrer, du ikke har bedt om.",
    body: "Jeg hedder Ice. Jeg bygger hjemmesider til små virksomheder — selv, fra den første samtale til overleveringen. Intet bureau og ingen projektleder imellem: du taler med den, der faktisk bygger siden, og det er mig, der svarer, hvis noget går galt.",
    /**
     * ITEM 29, AND THE MOST IMPORTANT PARAGRAPH ON THE PAGE.
     *
     * The line already existed in servicesFaq — "the language of the meetings and
     * the language of the website are two different things" — buried in an FAQ.
     * On a Danish page it belongs at the top, because it is the single thing a
     * Danish reader will otherwise discover at the worst possible moment.
     *
     * Stated as a strength rather than an apology, which it can be: the site
     * genuinely will be in Danish, and there is a live Danish site to prove it.
     * What is not on offer is a phone call in Danish, so the page does not
     * promise one — see contact.writtenFirst.
     */
    languageNote:
      "Siden bliver på dansk — det er dine kunder, der skal læse den, ikke mig. Selve samtalerne tager vi på engelsk, eller skriftligt på dansk, hvis du foretrækker det. Sproget i møderne og sproget på siden er to forskellige ting, og jeg vil hellere sige det på forhånd end lade dig opdage det undervejs.",
  },

  /** Why a Danish owner should pick him over a bureau or a template. */
  why: {
    heading: "Hvorfor mig",
    items: [
      "Fast pris aftalt skriftligt, før vi begynder. Der kommer ikke noget oveni bagefter.",
      "Du ejer domæne, hosting og kode. Vil du skifte udvikler næste år, kan du gøre det med det samme — uden at spørge mig først.",
      "Du taler med den, der bygger siden. Ingen sælger, ingen projektleder, ingen der giver opgaven videre til en anden.",
      // Deliberately the narrowest true claim available. He has built one Danish
      // site for one Danish client; the sentence says exactly that and no more.
      "Jeg har bygget en hjemmeside på dansk til en dansk virksomhed før. Den kører stadig, og jeg har ikke været inde i den siden.",
    ],
  },

  pricing: {
    heading: "Priser",
    lead: "Samme pris, uanset hvordan siden bygges. Det, der afgør prisen, er hvor mange sider du har brug for.",
    /**
     * Danish renderings of services.termsShort. Same three claims, same order.
     *
     * ⚠️ The moms line is hand-written Danish and therefore does NOT follow `vat`
     * in app/data.ts. It is phrased as "prices exclude moms", which is true
     * whether or not Ice is registered, so it survives registration untouched —
     * but if the English wording changes substantively, change this too. The
     * other non-interpolating sites are public/llms.txt, app/data.th.ts and
     * app/data.sv.ts.
     */
    terms: [
      "Fast pris aftalt skriftligt, før arbejdet begynder",
      "Alle priser er ekskl. moms",
      "Domæne, hosting og kode står i dit navn",
    ],
  },

  /**
   * ITEM 44. What changes cost after launch.
   *
   * This section was missing, and its absence left a hole in the page's own
   * argument rather than merely omitting a detail: hero.lead promises "ingen
   * månedlige gebyrer, du ikke har bedt om", which raises the retainer question in
   * the third sentence and then never answers it. What changes cost is the second
   * thing an owner asks, straight after the price.
   *
   * Sits directly after Priser for that reason — price, then "and if I want
   * something changed later?".
   *
   * NUMBERS COME FROM `aftercareRates` VIA PLACEHOLDERS, same rule as the rest of
   * this file. `{effective}` and `{hourly}` are filled at render time, exactly like
   * `{max}` and `{email}` in errors below. Do not type a rate in here.
   */
  aftercare: {
    heading: "Hvis du vil have noget ændret senere",
    lead: "Der er ingen plugins, der skal opdateres, og intet, der forfalder af sig selv — det er hele pointen med at bygge siden på den måde, og derfor er der ingen månedlig aftale, jeg skal sælge dig. Det, folk faktisk vil have bagefter, er ændringer, og her er hvad de koster.",
    free: {
      label: "Gratis — bare spørg",
      body: "En pris, et telefonnummer, en åbningstid, en stavefejl. Tager det mig et par minutter, er det ikke værd at sende en faktura for, så det gør jeg ikke.",
    },
    hourly: {
      label: "Efter timen",
      body: "Afregnet i halve timer, når det er noget større — nye billeder, en side skrevet om, et menukort til sæsonen. Du får overslaget, før jeg begynder, ikke bagefter.",
    },
    block: {
      label: "En klump timer",
      body: "De fleste af mine kunder får aldrig brug for det, og det siger jeg hellere end at sælge dig et abonnement. Men vil du helst ikke tænke over det, hver gang du vil have noget rettet, kan du købe timerne på forhånd og trække på dem. Brug dem på hvad som helst: tekst, billeder, priser, en ny side, et spørgsmål. Jeg skriver ned, hvad hver ændring tog, og siger, hvor meget der er tilbage.",
      terms: [
        "Det svarer til {effective} kr. i timen i stedet for {hourly}",
        "Ubrugte timer går videre til endnu et år — én gang",
        "Ingen månedlig regning, og intet fornyes af sig selv",
        "Når de er brugt op, køber du nye eller lader det være — der sker ikke noget automatisk",
      ],
    },
  },

  proof: {
    heading: "Et rigtigt eksempel",
    /** Every metric and screenshot comes from cases[racha]; this is framing only. */
    body: "Racha Beauty & Wellness er en massageklinik i Næstved. Før havde de kun en Facebookside. Jeg byggede hele hjemmesiden på dansk — behandlinger, priser, billeder og kontaktformular. Ejeren havde ikke plads i budgettet til et månedligt gebyr for vedligeholdelse, så jeg byggede siden, så den kan køre selv. Det har den gjort siden, uden at jeg har været inde i den.",
    quoteLabel: "Hvad ejeren siger",
    /** Not decorative: these screenshots are the evidence the section rests on. */
    altHome: "Forsiden",
    altTreatments: "Siden med behandlinger og priser",
    /**
     * Racha approved these words in ENGLISH. The Danish is labelled as a
     * translation rather than presented as her wording — the same rule /th and
     * /sv follow. She is a Danish business, so if she ever sends her own Danish
     * sentence it replaces this and the label comes off; her own phrasing on a
     * Danish page would be worth considerably more than a translation of it.
     */
    quoteTranslationLabel:
      "(oversat fra det engelske original, som ejeren har godkendt)",
    quoteDa:
      "Ice byggede vores første hjemmeside. Den er hurtig, den virker, og den er på dansk — og siden den gik i luften, har vi ikke skullet ændre noget eller betale ekstra.",
    /**
     * Racha's three figures in this language, keyed by the English label in
     * cases (data.ts). The values come from there too; only the words change.
     * Added 2026-10-05: until then they showed in English on this page.
     * Not read by the Danish proofreader (item 28), unlike the rest: Ice
     * accepted them on 2026-10-05 after a second read by Claude.
     */
    metrics: {
      "Lighthouse score": { v: "95+", k: "Googles hastighedsscore fra første dag" },
      "Paid client project": { v: "Første", k: "betalende kunde" },
      "Contact form fallback": { v: "2 veje", k: "reserveveje, så ingen henvendelse går tabt" },
    },
  },

  process: {
    heading: "Sådan foregår det",
    /**
     * Titles and the "you get" line per step, in the same order as
     * servicesProcess. Durations are read from that array, not retyped.
     */
    steps: [
      {
        title: "Vi taler sammen",
        youGet: "Et ærligt svar med det samme om, hvorvidt jeg er den rigtige til opgaven",
      },
      { title: "Tilbud", youGet: "Omfang og fast pris, skriftligt" },
      { title: "Jeg bygger", youGet: "Et link, hvor du kan følge arbejdet, opdateret løbende" },
      {
        title: "Overlevering",
        youGet: "Alt står i dit navn, og jeg viser dig, hvordan du selv retter teksten",
      },
    ],
  },

  contact: {
    heading: "Skriv til mig",
    body: "Fortæl kort, hvad virksomheden laver, og hvad du gerne vil have. Det er nok til at komme i gang. Er jeg ikke den rigtige til opgaven, siger jeg det direkte og henviser dig videre.",
    emailLabel: "E-mail",
    /**
     * ITEM 29's second half: written-first contact, and NO promise of a Danish
     * phone call. A contact flow that implies one sets up the exact discovery the
     * hero note exists to prevent.
     */
    writtenFirst:
      "Skriv gerne først — på dansk eller engelsk, alt efter hvad du har lyst til. Så kan jeg læse ordentligt, hvad du har brug for, inden vi taler sammen.",
    orForm: "Eller udfyld formularen nedenfor. Jeg ser begge.",
  },

  backToEnglish: "English",

  /**
   * Form chrome, passed into ServicesEnquiryForm as its `copy` prop.
   *
   * 🔒 Only labels. The option VALUES stay exactly as servicesEnquiryOptions
   * defines them, because app/lib/services-enquiry.ts builds its server-side
   * allowlist from those values — a translated value would 400 every Danish
   * enquiry. Labels are safe, values are the API contract.
   */
  form: {
    labels: {
      name: "Navn",
      email: "E-mail",
      company: "Virksomhed",
      projectType: "Hvad har du brug for?",
      budget: "Cirka budget",
      timeline: "Hvornår har du brug for det?",
      message: "Fortæl om virksomheden og hvad du gerne vil have",
    },
    optionLabels: {
      projectType: {
        "small-business-site": "Hjemmeside til virksomheden",
        "web-app-frontend": "Frontend til en webapp",
        "redesign-rescue": "Lave en eksisterende side om eller gøre den hurtigere",
        "something-else": "Noget andet",
      },
      budget: {
        "under-10k": "Under 10.000 kr.",
        "10k-25k": "10.000 – 25.000 kr.",
        "25k-50k": "25.000 – 50.000 kr.",
        "50k-plus": "50.000 kr. og op",
        "not-sure": "Ved det ikke endnu",
      },
      timeline: {
        asap: "Så hurtigt som muligt",
        "1-3-months": "Inden for 1–3 måneder",
        later: "Senere i år",
        exploring: "Ser mig bare omkring",
      },
    },
    chooseOne: "Vælg én…",
    // Not read by the Danish proofreader (item 28): accepted by Ice, 2026-10-05.
    optional: "valgfrit",
    messagePlaceholder: "Hvad laver virksomheden, og hvad vil du gerne have på siden?",
    budgetHint: "Cirka er fint. Jeg skal bare vide, hvad der er muligt.",
    messageHint:
      "To eller tre sætninger er nok. Har du en eksisterende side eller en Facebookside, hjælper et link meget.",
    submit: "Send",
    submitting: "Sender…",
    submittingSr: "Sender beskeden",
    sentTitle: "Tak, jeg har modtaget den",
    sentBody:
      "Jeg læser alt selv og svarer på alle — også på opgaver, jeg ikke er den rigtige til.",
    sentUrgentPrefix: "Er det hastende, så skriv til mig på",
    fixOne: "Én ting skal rettes:",
    fixMany: "{n} ting skal rettes:",
    sendFailed: "Beskeden kunne ikke sendes. Skriv til mig på {email} i stedet.",
    honeypotLabel: "Hjemmeside",
  },

  /** Danish versions of the eight validator messages. */
  errors: {
    nameShort: "Skriv dit navn",
    tooLong: "Lidt for langt",
    email: "Jeg har brug for en e-mail, jeg kan svare på",
    projectType: "Vælg det, der passer bedst",
    budget: "Et cirka-tal er nok",
    timeline: "Hvornår har du brug for det?",
    messageShort: "En eller to sætninger er nok",
    messageLong: "Højst {max} tegn",
  } satisfies EnquiryMessages,
} as const;
