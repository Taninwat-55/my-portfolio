import type { EnquiryMessages } from "./lib/services-enquiry";

/**
 * Thai copy for /th.
 *
 * ⚠️ DRAFTED BY CLAUDE, NOT YET PROOFREAD BY A NATIVE SPEAKER. Ice is Thai, so he
 * is the reviewer — every string here should be read and edited by him before this
 * page is treated as finished. The politeness register in particular is a
 * judgement call, not something to take on trust.
 *
 * Kept in its own module rather than inside data.ts for two reasons: it would
 * roughly double that file, and D6 in PLAN.md settled on standalone language pages
 * rather than i18n machinery, so there is no shared key structure to conform to.
 *
 * NOTHING NUMERIC LIVES HERE. Prices, timelines, metrics and screenshots are all
 * read from `services` / `cases` at render time, so /th cannot quote a figure that
 * /services has changed. If you find yourself typing a number into this file, that
 * is the bug.
 */

/**
 * Translates the unit WORD in a scope or duration without copying its numbers.
 *
 * "1–3 pages" → "1–3 หน้า". The point is that the numerals keep coming from
 * `services` / `servicesProcess`, so a page count or a timeline that changes there
 * changes here too. A hand-written Thai "1–3 หน้า" would have gone stale silently
 * the first time the ladder moved — which is the whole failure mode the "nothing
 * numeric in this file" rule exists to prevent.
 *
 * Longest keys first: "weeks" must match before "week", "days" before "day".
 */
const UNIT_WORDS: [string, string][] = [
  ["Add-ons", "เพิ่มเติม"],
  ["pages", "หน้า"],
  ["weeks", "สัปดาห์"],
  ["week", "สัปดาห์"],
  ["days", "วัน"],
  ["day", "วัน"],
  ["min", "นาที"],
  ["each", "ต่อรายการ"],
  // Item 44. These appear only in the aftercare price and unit strings.
  ["hours", "ชั่วโมง"],
  ["hour", "ชั่วโมง"],
  ["months", "เดือน"],
  ["valid", "ใช้ได้"],
];

export function thUnits(value: string): string {
  return UNIT_WORDS.reduce(
    (out, [en, thai]) => out.replace(en, thai),
    value
  );
}

export const thContent = {
  /** Shown in <html>-adjacent wrapper and hreflang. */
  locale: "th",

  meta: {
    title: "เว็บไซต์สำหรับธุรกิจไทยในเดนมาร์กและสวีเดน",
    description:
      "รับทำเว็บไซต์ให้ร้านไทยในเดนมาร์กและสวีเดน — ร้านอาหาร ร้านนวด ร้านทำเล็บ ร้านทำความสะอาด คุยกันเป็นภาษาไทยได้ตลอดงาน ราคาบอกชัดเจนตั้งแต่ต้น",
  },

  hero: {
    eyebrow: "สำหรับคนไทยในเดนมาร์กและสวีเดน",
    title: "เว็บไซต์สำหรับร้านไทย",
    lead: "ร้านอาหาร · ร้านนวด · ร้านทำเล็บ · ร้านทำความสะอาด",
    body: "ผมชื่อไอซ์ครับ เป็นคนไทย อยู่โคเปนเฮเกน รับทำเว็บไซต์ให้ธุรกิจเล็ก ๆ ทำคนเดียวทั้งงาน ไม่ใช่บริษัท คุยกับผมตรง ๆ ได้เลย และผมเป็นคนรับผิดชอบถ้ามีอะไรผิดพลาด",
    /** The whole proposition, and the thing that keeps scope honest. */
    languageNote:
      "ตัวเว็บไซต์จะทำเป็นภาษาเดนมาร์กหรือสวีเดน เพราะลูกค้าของร้านคุณเป็นคนที่นี่ แต่เรื่องงานเราคุยกันเป็นภาษาไทยได้ตลอด ตั้งแต่คุยครั้งแรกจนส่งมอบ",
  },

  /** Why a Thai owner should pick him over a local agency. */
  why: {
    heading: "ทำไมต้องเป็นผม",
    items: [
      "คุยภาษาไทยได้ ไม่ต้องหาคนแปล ไม่ต้องกลัวสื่อสารผิด",
      "ผมเข้าใจว่าร้านไทยขายอะไร ลูกค้าถามอะไร และต้องโชว์อะไรบนหน้าเว็บ",
      "บอกราคาชัดเจนก่อนเริ่มงาน ไม่มีบวกเพิ่มทีหลัง",
      "ทำเสร็จแล้วทุกอย่างเป็นชื่อคุณ ทั้งโดเมน ทั้งโฮสติ้ง อยากเปลี่ยนคนทำทีหลังก็ทำได้เลย",
    ],
  },

  pricing: {
    heading: "ราคา",
    lead: "ราคาเท่ากันไม่ว่าจะทำด้วยวิธีไหน ขึ้นอยู่กับว่าเว็บมีกี่หน้า",
    /**
     * Sweden is the larger half of this market (~64,000 Thai-origin residents
     * against ~14,000 in Denmark), so a DKK-only page is quietly useless to most
     * of the audience. No conversion rate is published on purpose — it would be
     * wrong within a month and this page's whole argument is that the numbers
     * are honest.
     */
    currencyNote:
      "ราคาด้านล่างเป็นโครนเดนมาร์ก (DKK) ถ้าร้านอยู่สวีเดน ผมเสนอราคาเป็นโครนสวีเดน (SEK) ให้ ตามอัตราแลกเปลี่ยนตอนที่คุยกัน",
    /**
     * Thai renderings of services.termsShort. Same three claims, same order.
     *
     * ⚠️ The moms line is hand-written Thai and therefore does NOT follow `vat` in
     * app/data.ts. It is phrased as "prices exclude moms", which is true whether or
     * not Ice is registered, so it should survive registration untouched — but if
     * the English wording ever changes substantively, change this too. The only
     * other non-interpolating site is public/llms.txt.
     */
    terms: [
      "ตกลงราคาเป็นลายลักษณ์อักษรก่อนเริ่มงาน",
      "ราคาทั้งหมดยังไม่รวมภาษีมูลค่าเพิ่ม (moms)",
      "โดเมน โฮสติ้ง และโค้ด เป็นชื่อคุณทั้งหมด",
    ],
  },

  /**
   * ITEM 44. What changes cost after launch. Mirrors /da and /sv.
   *
   * ⚠️ NEW THAI PROSE, AND THEREFORE PART OF ITEM 40. This section did not exist
   * when chunk 1 of the Thai proofread was presented, so it has to go into that
   * review rather than around it. Written now on purpose: item 40 is still open, so
   * this costs one pass instead of two.
   *
   * NOTHING NUMERIC IN THIS FILE. `{effective}` and `{hourly}` are filled from
   * `aftercareRates` at render time.
   */
  aftercare: {
    heading: "ถ้าอยากแก้อะไรทีหลัง",
    lead: "เว็บไม่มีปลั๊กอินให้ต้องอัปเดต และไม่มีอะไรที่พังเองตามเวลา — นั่นคือเหตุผลที่ผมสร้างแบบนี้ และเป็นเหตุผลที่ผมไม่มีแพ็กเกจรายเดือนมาขายคุณ สิ่งที่คนอยากได้ทีหลังคือการแก้ไข ก็เลยบอกไว้เลยว่าคิดเท่าไหร่",
    free: {
      label: "ฟรี — บอกมาได้เลย",
      body: "ราคา เบอร์โทร เวลาเปิดปิด คำผิด อะไรที่ใช้เวลาผมไม่กี่นาที ไม่คุ้มที่จะออกใบแจ้งหนี้กันทั้งสองฝ่าย ผมก็เลยไม่คิดเงิน",
    },
    hourly: {
      label: "คิดเป็นชั่วโมง",
      body: "คิดเป็นครึ่งชั่วโมง สำหรับงานที่ใหญ่ขึ้น — รูปใหม่ เขียนหน้าใหม่ เมนูตามฤดูกาล ผมบอกราคาประเมินก่อนเริ่ม ไม่ใช่ตอนจบ",
    },
    block: {
      label: "ซื้อชั่วโมงไว้ล่วงหน้า",
      body: "ลูกค้าส่วนใหญ่ของผมไม่เคยต้องใช้เลย และผมขอบอกตรง ๆ แบบนี้ดีกว่าขายแพ็กเกจรายเดือนให้คุณ แต่ถ้าคุณไม่อยากคิดเรื่องนี้ทุกครั้งที่อยากแก้อะไร ก็ซื้อชั่วโมงไว้ก่อนแล้วค่อย ๆ ใช้ ใช้กับอะไรก็ได้ — ข้อความ รูป ราคา หน้าใหม่ หรือแค่คำถาม ผมจดไว้ว่าแต่ละครั้งใช้เวลาเท่าไหร่ แล้วบอกคุณว่าเหลือเท่าไหร่",
      terms: [
        "เท่ากับ {effective} DKK ต่อชั่วโมง แทนที่จะเป็น {hourly}",
        "ชั่วโมงที่ยังไม่ได้ใช้ ยกไปปีที่สองได้ หนึ่งครั้ง",
        "ไม่มีบิลรายเดือน และไม่มีอะไรต่ออายุอัตโนมัติ",
        "ใช้หมดแล้วจะซื้อใหม่หรือไม่ซื้อก็ได้ — ไม่มีอะไรเกิดขึ้นเอง",
      ],
    },
  },

  proof: {
    heading: "ตัวอย่างงานจริง",
    /** Every metric and screenshot comes from cases[racha]; this is framing only. */
    body: "Racha Beauty & Wellness เป็นร้านนวดของคนไทยที่เมือง Næstved เดิมมีแค่เพจเฟซบุ๊ก ผมทำเว็บไซต์ภาษาเดนมาร์กให้ทั้งเว็บ มีรายการนวด ราคา รูปร้าน และฟอร์มติดต่อ เจ้าของร้านไม่มีงบจ่ายค่าดูแลรายเดือน ผมจึงทำให้มันอยู่ได้เองโดยไม่ต้องมีผมคอยแก้ และตั้งแต่เปิดมาก็ยังใช้งานได้ปกติ",
    quoteLabel: "คำพูดของเจ้าของร้าน",
    /**
     * Alt text for the two proof screenshots. Not decorative: they are the
     * evidence the section rests on, so a screen-reader user needs them — and a
     * real alt is also what makes a failed image load visible instead of leaving
     * an unexplained empty box, which is exactly how the first version broke.
     */
    altHome: "หน้าแรกของเว็บไซต์",
    altTreatments: "หน้ารายการนวดและราคา",
    /**
     * Racha approved these words in ENGLISH. The Thai below is a translation, and
     * it is labelled as one on the page rather than presented as her own wording.
     *
     * Ice confirmed on 2026-08-18 that he had already asked her about publishing a
     * Thai version and she was fine with it, so the permission is real. What she
     * has still never done is approve a specific Thai sentence — so if she ever
     * sends her own Thai, replace this and drop the translation label. In a
     * referral community her own phrasing is worth more than any rendering of it.
     */
    quoteTranslationLabel: "(แปลจากต้นฉบับภาษาอังกฤษที่เจ้าของร้านอนุมัติ)",
    quoteTh:
      "ไอซ์ทำเว็บไซต์แรกให้ร้าน เว็บเร็ว ใช้งานได้ดี เป็นภาษาเดนมาร์ก และตั้งแต่เปิดมาก็ไม่ต้องแก้อะไรหรือจ่ายเพิ่มเลย",
  },

  process: {
    heading: "ขั้นตอนการทำงาน",
    /**
     * Titles and the "you get" line per step, in the same order as
     * servicesProcess. Durations are read from that array, not retyped.
     */
    steps: [
      { title: "คุยกัน", youGet: "ตอบตรง ๆ ในครั้งแรกว่ารับหรือไม่รับงาน" },
      { title: "เสนอราคา", youGet: "ขอบเขตงานและราคาเป็นลายลักษณ์อักษร" },
      { title: "ลงมือทำ", youGet: "ลิงก์ดูความคืบหน้า อัปเดตเรื่อย ๆ" },
      { title: "ส่งมอบ", youGet: "ทุกอย่างเป็นชื่อคุณ พร้อมสอนวิธีแก้ข้อความเอง" },
    ],
  },

  contact: {
    heading: "ติดต่อผม",
    body: "เล่าคร่าว ๆ ว่าร้านทำอะไรและอยากได้อะไร แค่นี้พอเริ่มคุยได้ ถ้าผมไม่เหมาะกับงานนี้ ผมจะบอกตรง ๆ และแนะนำคนอื่นให้",
    lineLabel: "คุยทาง LINE",
    lineId: "tka2218",
    emailLabel: "อีเมล",
    orForm: "หรือกรอกฟอร์มด้านล่างก็ได้ ผมได้รับทั้งสองทาง",
  },

  backToEnglish: "English",

  /**
   * Form chrome, passed into ServicesEnquiryForm as its `copy` prop.
   *
   * 🔒 Only labels. The option VALUES stay exactly as servicesEnquiryOptions
   * defines them, because app/lib/services-enquiry.ts builds its server-side
   * allowlist from those values — a translated value would 400 every Thai
   * enquiry. Labels are safe, values are the API contract.
   */
  form: {
    labels: {
      name: "ชื่อ",
      email: "อีเมล",
      company: "ชื่อร้าน / ธุรกิจ",
      projectType: "อยากได้อะไร",
      budget: "งบประมาณคร่าว ๆ",
      timeline: "อยากได้เมื่อไหร่",
      message: "เล่าเรื่องร้านและงานที่ต้องการ",
    },
    optionLabels: {
      projectType: {
        "small-business-site": "เว็บไซต์สำหรับร้าน",
        "web-app-frontend": "หน้าเว็บแอป",
        "redesign-rescue": "ปรับเว็บเดิมให้ดีขึ้น / เร็วขึ้น",
        "something-else": "อย่างอื่น",
      },
      budget: {
        "under-10k": "ต่ำกว่า 10.000 DKK",
        "10k-25k": "10.000 – 25.000 DKK",
        "25k-50k": "25.000 – 50.000 DKK",
        "50k-plus": "50.000 DKK ขึ้นไป",
        "not-sure": "ยังไม่แน่ใจ",
      },
      timeline: {
        asap: "เร็วที่สุดเท่าที่ทำได้",
        "1-3-months": "ภายใน 1–3 เดือน",
        later: "ปลายปีนี้",
        exploring: "ยังดูอยู่",
      },
    },
    chooseOne: "เลือกหนึ่งข้อ…",
    messagePlaceholder: "ร้านทำอะไร และอยากได้อะไรบนเว็บไซต์",
    budgetHint: "บอกคร่าว ๆ ก็ได้ครับ แค่ให้ผมรู้ว่าอะไรเป็นไปได้",
    messageHint: "สองสามประโยคก็พอครับ ถ้ามีลิงก์เว็บเดิมหรือเพจเฟซบุ๊กก็ช่วยได้มาก",
    submit: "ส่งข้อความ",
    submitting: "กำลังส่ง…",
    submittingSr: "กำลังส่งข้อความ",
    sentTitle: "ได้รับแล้วครับ",
    sentBody:
      "ผมอ่านทุกข้อความเองและตอบทุกอันครับ รวมถึงงานที่ผมไม่เหมาะจะรับด้วย",
    sentUrgentPrefix: "ถ้าเร่งด่วน ส่งอีเมลมาที่",
    fixOne: "มีจุดที่ต้องแก้:",
    fixMany: "มี {n} จุดที่ต้องแก้:",
    sendFailed: "ส่งไม่สำเร็จครับ ส่งอีเมลมาที่ {email} ได้เลย",
    honeypotLabel: "เว็บไซต์",
  },

  /** Thai versions of the eight validator messages. */
  errors: {
    nameShort: "กรอกชื่อด้วยครับ",
    tooLong: "ยาวเกินไปหน่อย",
    email: "ขออีเมลที่ติดต่อกลับได้ครับ",
    projectType: "เลือกข้อที่ใกล้เคียงที่สุด",
    budget: "เลือกช่วงงบคร่าว ๆ ก็ได้ครับ",
    timeline: "อยากได้เมื่อไหร่ครับ",
    messageShort: "เล่าสัก 1–2 ประโยคก็พอครับ",
    messageLong: "ไม่เกิน {max} ตัวอักษรครับ",
  } satisfies EnquiryMessages,
} as const;

