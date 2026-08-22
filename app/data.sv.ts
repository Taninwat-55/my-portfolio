import type { EnquiryMessages } from "./lib/services-enquiry";

/**
 * Swedish copy for /sv.
 *
 * Unlike data.th.ts, this is NOT waiting on a proofreader — Ice writes fluent
 * Swedish, so he is the native speaker and can correct it directly. That is the
 * whole reason item 32 was cheap enough to do ahead of /da: no external
 * dependency, and no risk of publishing a language he cannot check himself.
 *
 * WHO THIS PAGE IS FOR: small businesses in Skåne — Malmö, Lund, Helsingborg.
 * A different market from /th, and reached in a different way. /th is written to
 * be pasted into a Facebook group; this one is written for search, because a
 * Skåne shop owner looking for a website types "hemsida småföretag Malmö" into
 * Google rather than asking a community.
 *
 * THE ARGUMENT IS GEOGRAPHY PLUS LANGUAGE, AND BOTH ARE REAL. Copenhagen to
 * Malmö is about 35 minutes by train, so he can take a meeting in person without
 * being a Malmö agency with Malmö overheads. And he is a Swedish citizen educated
 * in Sweden — Uppsala University, then a two-year frontend programme in Malmö —
 * so Swedish is not something this page is translated into.
 *
 * NOTHING NUMERIC LIVES HERE, same rule as data.th.ts. Prices, timelines and
 * metrics are read from `services` / `cases` / `servicesProcess` at render time,
 * so /sv cannot quote a figure that /services has changed. If you find yourself
 * typing a number into this file, that is the bug.
 */

/**
 * Translates the unit WORD in a scope or duration without copying its numbers.
 *
 * "1–3 pages" → "1–3 sidor". The numerals keep coming from `services` /
 * `servicesProcess`, so a page count or timeline that changes there changes here.
 *
 * Longest keys first: "weeks" must match before "week", "days" before "day".
 */
const UNIT_WORDS: [string, string][] = [
  ["Add-ons", "Tillägg"],
  ["pages", "sidor"],
  ["weeks", "veckor"],
  ["week", "vecka"],
  ["days", "dagar"],
  ["day", "dag"],
  ["each", "per styck"],
  // "min" is already the Swedish abbreviation for minutes, so it is left alone
  // deliberately rather than omitted by accident.
  // Item 44. These appear only in the aftercare price and unit strings.
  ["hours", "timmar"],
  ["hour", "timme"],
  ["months", "månader"],
  ["valid", "gäller"],
];

export function svUnits(value: string): string {
  return UNIT_WORDS.reduce((out, [en, sv]) => out.replace(en, sv), value);
}

/**
 * Reformats a Danish thousands separator into the Swedish one.
 *
 * "6.500 – 9.500 DKK" → "6 500 – 9 500 DKK".
 *
 * This is not cosmetic. Swedish uses a space for thousands and a comma for
 * decimals, so a Swedish reader can genuinely parse "6.500" as six and a half —
 * three orders of magnitude wrong, on the one number this page has to get right.
 *
 * It is a transform over the value from `services`, not a retyped copy of it, so
 * the "nothing numeric in this file" rule still holds: change the price in
 * data.ts and this follows.
 *
 * The inserted space is a non-breaking space, so a price can never wrap into two
 * lines mid-number.
 */
export function svPrice(value: string): string {
  return value.replace(/(\d)\.(?=\d{3}\b)/g, "$1 ");
}

export const svContent = {
  /** Used in hreflang and on the page wrapper. */
  locale: "sv",

  meta: {
    title: "Hemsida till småföretag i Skåne — fast pris, du äger allt",
    description:
      "Jag bygger hemsidor åt små företag i Skåne — Malmö, Lund, Helsingborg. Fast pris skriftligt innan vi börjar, och du äger domän, hosting och kod. Bor i Köpenhamn, 35 minuter från Malmö.",
  },

  hero: {
    eyebrow: "För småföretag i Skåne",
    title: "Hemsida till ditt företag",
    lead: "Fast pris. Du äger allt. Inga månadsavgifter du inte har bett om.",
    body: "Jag heter Ice. Jag bygger hemsidor åt små företag — själv, från första samtalet till överlämningen. Ingen byrå och ingen projektledare emellan: du pratar med den som faktiskt bygger sidan, och det är jag som svarar om något går fel.",
    /**
     * The geography claim, which is the page's real differentiator. Kept in a
     * highlighted block for the same reason /th highlights its language note:
     * it is the one sentence that decides whether the rest is worth reading.
     */
    locationNote:
      "Jag bor i Köpenhamn, 35 minuter från Malmö med tåget. Vi kan ses på plats i Skåne om du vill träffas, eller sköta allt på distans — det som passar dig bäst. Svenska hela vägen, både i mötena och på sidan.",
  },

  /** Why a Skåne owner should pick him over a local agency or a template. */
  why: {
    heading: "Varför jag",
    items: [
      "Fast pris skriftligt innan vi börjar. Inget tillkommer efteråt.",
      "Du äger domän, hosting och kod. Vill du byta utvecklare senare går det direkt, utan att fråga mig.",
      "Du pratar med den som bygger sidan. Ingen säljare, ingen projektledare, ingen som lämnar över till någon annan.",
      "Svensk medborgare och utbildad i Sverige — Uppsala universitet och en tvåårig frontendutbildning i Malmö. Svenska är inte något jag översätter till.",
    ],
  },

  pricing: {
    heading: "Priser",
    lead: "Samma pris oavsett hur sidan byggs. Det som styr priset är hur många sidor du behöver.",
    /**
     * Prices in data.ts are in DKK because that is the market Ice invoices in.
     * No conversion rate is printed on purpose: it would be wrong within a month,
     * and this page's whole argument is that the numbers are honest.
     */
    currencyNote:
      "Priserna nedan är i danska kronor (DKK). Är företaget svenskt lämnar jag offert i svenska kronor (SEK) enligt kursen den dagen vi pratar.",
    /**
     * Swedish renderings of services.termsShort. Same three claims, same order.
     *
     * ⚠️ The moms line is hand-written Swedish and therefore does NOT follow `vat`
     * in app/data.ts. It is phrased as "prices exclude moms", which is true
     * whether or not Ice is registered, so it survives registration untouched —
     * but if the English wording changes substantively, change this too. The other
     * non-interpolating sites are public/llms.txt and app/data.th.ts.
     */
    terms: [
      "Fast pris skriftligt innan arbetet börjar",
      "Alla priser är exkl. moms",
      "Domän, hosting och kod står på dig",
    ],
  },

  /**
   * ITEM 44. What changes cost after launch. Mirrors the Danish and Thai sections.
   *
   * Placed after Priser for the same reason as on /da: the price is answered, and
   * "what if I want something changed later" is the next question rather than a
   * detail. Swedish is the one language here Ice reviews himself, so this is the
   * version to correct first if the phrasing is off.
   *
   * NOTHING NUMERIC IN THIS FILE. `{effective}` and `{hourly}` are filled from
   * `aftercareRates` at render time, and the figures themselves pass through
   * svPrice() so a Swedish reader cannot read "2.400" as two and a half.
   */
  aftercare: {
    heading: "Om du vill ändra något senare",
    lead: "Det finns inga plugins att uppdatera och inget som förfaller av sig självt — det är hela poängen med att bygga sidan så här, och därför finns ingen månadsplan att sälja dig. Vad folk faktiskt vill ha efteråt är ändringar, så det här är vad de kostar.",
    free: {
      label: "Gratis — bara fråga",
      body: "Ett pris, ett telefonnummer, en öppettid, ett stavfel. Tar det mig ett par minuter är det inte värt en faktura för någon av oss, så jag skickar ingen.",
    },
    hourly: {
      label: "Per timme",
      body: "Debiteras i halvtimmar, när det är något större — nya bilder, en omskriven sida, en meny för säsongen. Du får uppskattningen innan jag börjar, inte efteråt.",
    },
    block: {
      label: "Ett block timmar",
      body: "De flesta av mina kunder behöver aldrig det här, och det säger jag hellre än att sälja dig en prenumeration. Men vill du slippa tänka på det varje gång du vill ändra något kan du köpa timmarna i förväg och dra på dem. Använd dem till vad som helst: text, bilder, priser, en ny sida, en fråga. Jag antecknar vad varje ändring tog och säger vad som är kvar.",
      terms: [
        "Det blir {effective} DKK i timmen i stället för {hourly}",
        "Oanvända timmar följer med till ett andra år — en gång",
        "Ingen månadsfaktura, och ingenting förnyas automatiskt",
        "När de är slut köper du nya eller inte — ingenting händer av sig självt",
      ],
    },
  },

  proof: {
    heading: "Ett riktigt exempel",
    /** Every metric and screenshot comes from cases[racha]; this is framing only. */
    body: "Racha Beauty & Wellness är en massagesalong i Næstved i Danmark. Innan hade de bara en Facebooksida. Jag byggde hela hemsidan på danska — behandlingar, priser, bilder och kontaktformulär. Ägaren hade inte utrymme för en månadsavgift för underhåll, så jag byggde den så att den klarar sig själv, och den har rullat sedan dess utan att jag behövt gå in i den.",
    quoteLabel: "Vad ägaren säger",
    /** Not decorative: these screenshots are the evidence the section rests on. */
    altHome: "Startsidan",
    altTreatments: "Sidan med behandlingar och priser",
    /**
     * Racha approved these words in ENGLISH. The Swedish below is labelled as a
     * translation rather than presented as her wording — the same rule /th
     * follows, and the reason is the same: her own phrasing is worth more than
     * any rendering of it, so if she ever sends her own, replace this and drop
     * the label.
     */
    quoteTranslationLabel: "(översatt från det engelska original som ägaren godkänt)",
    quoteSv:
      "Ice byggde vår första hemsida. Den är snabb, den fungerar och den är på danska — och sedan den gick live har vi inte behövt ändra något eller betala extra.",
  },

  process: {
    heading: "Så går det till",
    /**
     * Titles and the "you get" line per step, in the same order as
     * servicesProcess. Durations are read from that array, not retyped.
     */
    steps: [
      { title: "Vi pratar", youGet: "Ett rakt svar direkt om jag är rätt för jobbet" },
      { title: "Offert", youGet: "Omfattning och fast pris, skriftligt" },
      { title: "Jag bygger", youGet: "En länk där du följer arbetet, uppdaterad löpande" },
      {
        title: "Överlämning",
        youGet: "Allt står på dig, plus en genomgång av hur du ändrar text själv",
      },
    ],
  },

  contact: {
    heading: "Hör av dig",
    body: "Berätta kort vad företaget gör och vad du vill ha — det räcker för att börja. Är jag inte rätt för jobbet säger jag det direkt och tipsar om någon annan.",
    emailLabel: "E-post",
    /**
     * Named cities rather than "Skåne", because a shop owner in Lund wants to
     * read the name of their own town. It is also the plainest honest way to say
     * how far the in-person offer actually reaches.
     */
    meetingNote:
      "Vill du träffas kan vi ses i Malmö, Lund eller Helsingborg. Annars fungerar allt lika bra på distans.",
    orForm: "Eller fyll i formuläret nedan. Jag ser båda.",
  },

  backToEnglish: "English",

  /**
   * Form chrome, passed into ServicesEnquiryForm as its `copy` prop.
   *
   * 🔒 Only labels. The option VALUES stay exactly as servicesEnquiryOptions
   * defines them, because app/lib/services-enquiry.ts builds its server-side
   * allowlist from those values — a translated value would 400 every Swedish
   * enquiry. Labels are safe, values are the API contract.
   *
   * The budget labels are the one place a number is written by hand, because they
   * are bracket labels rather than prices — and they use the Swedish thousands
   * space for the same reason svPrice() exists.
   */
  form: {
    labels: {
      name: "Namn",
      email: "E-post",
      company: "Företag",
      projectType: "Vad behöver du?",
      budget: "Ungefärlig budget",
      timeline: "När behöver du det?",
      message: "Berätta om företaget och vad du vill ha",
    },
    optionLabels: {
      projectType: {
        "small-business-site": "Hemsida till företaget",
        "web-app-frontend": "Frontend till en webbapp",
        "redesign-rescue": "Göra om eller snabba upp en befintlig sida",
        "something-else": "Något annat",
      },
      budget: {
        "under-10k": "Under 10 000 DKK",
        "10k-25k": "10 000 – 25 000 DKK",
        "25k-50k": "25 000 – 50 000 DKK",
        "50k-plus": "50 000 DKK och uppåt",
        "not-sure": "Vet inte än",
      },
      timeline: {
        asap: "Så snart det går",
        "1-3-months": "Inom 1–3 månader",
        later: "Senare i år",
        exploring: "Kollar bara",
      },
    },
    chooseOne: "Välj ett…",
    messagePlaceholder: "Vad gör företaget, och vad vill du ha på sidan?",
    budgetHint: "Ungefär räcker. Jag behöver bara veta vad som är möjligt.",
    messageHint:
      "Två eller tre meningar räcker. Har du en befintlig sida eller en Facebooksida hjälper en länk mycket.",
    submit: "Skicka",
    submitting: "Skickar…",
    submittingSr: "Skickar meddelandet",
    sentTitle: "Tack, jag har fått det",
    sentBody:
      "Jag läser allt själv och svarar på alla — även på jobb jag inte är rätt för.",
    sentUrgentPrefix: "Är det brådskande, mejla mig på",
    fixOne: "En sak behöver rättas:",
    fixMany: "{n} saker behöver rättas:",
    sendFailed: "Det gick inte att skicka. Mejla mig på {email} istället.",
    honeypotLabel: "Webbplats",
  },

  /** Swedish versions of the eight validator messages. */
  errors: {
    nameShort: "Skriv ditt namn",
    tooLong: "Lite för långt",
    email: "Jag behöver en e-postadress som går att svara på",
    projectType: "Välj det som passar bäst",
    budget: "En ungefärlig siffra räcker",
    timeline: "När behöver du det?",
    messageShort: "En eller två meningar räcker",
    messageLong: "Max {max} tecken",
  } satisfies EnquiryMessages,
} as const;
