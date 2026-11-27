import type { Localized } from './business';
// Google reviews. Everything here must come from the real listing
// (GOOGLE_REVIEWS_URL in business.ts); nothing is written by us.

/**
 * Topics Google extracts from the reviews ("Ordenar por" chips on the
 * listing), with how many reviews mention each. Read on 2026-11-17.
 */
export const REVIEW_TOPICS: (Localized & { count: number })[] = [
  { es: 'Ambiente', en: 'Atmosphere', pt: 'Ambiente', count: 14 },
  { es: 'Buena onda', en: 'Good vibe', pt: 'Boa vibe', count: 9 },
  { es: 'Precio', en: 'Price', pt: 'Preço', count: 8 },
  { es: 'El corte', en: 'The cut', pt: 'O corte', count: 7 },
  { es: 'El trabajo', en: 'The work', pt: 'O trabalho', count: 6 },
  { es: 'Los barberos', en: 'The barbers', pt: 'Os barbeiros', count: 4 },
];

export type Review = {
  /** As shown on Google, e.g. "Martín G." */
  author: string;
  stars: 1 | 2 | 3 | 4 | 5;
  /** Original text, copied word for word. */
  text: string;
  /** Optional English translation for /en/; falls back to the original. */
  textEn?: string;
  /** Optional Portuguese translation for /pt/; falls back to the original. */
  textPt?: string;
  /** As shown on Google, e.g. "hace 2 meses". */
  when?: string;
};

/**
 * Quotes shown in the slider. Copied word for word from the public Google
 * listing on 2026-11-27 (all 5 stars). Names as Google shows them, surnames
 * shortened to an initial. EN/PT are our translations, labelled as such.
 * No dates: Google only gives relative ones ("hace 2 semanas") that go stale.
 */
export const REVIEWS: Review[] = [
  {
    author: 'Julian C.',
    stars: 5,
    text: 'Excelente barbería, muy buena atención y un servicio de primera. Los cortes quedan impecables, trabajan con mucho detalle y dedicación. El ambiente es muy bueno y los barberos son unos cracks. Sin dudas, una de las mejores barberías. ¡Totalmente recomendable!',
    textEn: 'Excellent barbershop, great service, first-class all round. The cuts come out spotless; they work with real attention to detail and care. The atmosphere is great and the barbers are aces. Easily one of the best barbershops. Highly recommended!',
    textPt: 'Excelente barbearia, ótimo atendimento e um serviço de primeira. Os cortes ficam impecáveis, trabalham com muito detalhe e dedicação. O ambiente é muito bom e os barbeiros são fera. Sem dúvida, uma das melhores barbearias. Super recomendo!',
  },
  {
    author: 'Augusto L.',
    stars: 5,
    text: 'Excelente servicio. Me recomendaron la peluquería mientras caminaba por Maldonado y fue un gran acierto. Apenas entré me atendió Lautaro. Se nota que es un lugar amigable, con una energía joven y muy buena onda. ¡Sin dudas, muy recomendable!',
    textEn: 'Excellent service. Someone recommended the place while I was walking around Maldonado and it was a great call. Lautaro took care of me as soon as I walked in. You can tell it’s a friendly place, with young energy and a great vibe. Definitely recommended!',
    textPt: 'Excelente serviço. Me indicaram a barbearia enquanto eu caminhava por Maldonado e foi um grande acerto. Assim que entrei, o Lautaro me atendeu. Dá pra ver que é um lugar acolhedor, com energia jovem e uma vibe muito boa. Recomendo sem dúvida!',
  },
  {
    author: 'Junto ati',
    stars: 5,
    text: 'Lugar bien ubicado, bien expuesto en una esquina, local grande 2 plantas, lo más destacable fue la atención personalizada, te ofrecen un buen café, atención rápida y profesional, la 1er barbería que conozco en Maldonado, compite perfectamente a nivel Europeo.',
    textEn: 'Well located, right on a corner, a big two-storey shop. The highlight was the personal attention: they offer you a good coffee, and the service is quick and professional. The first barbershop I know in Maldonado that could easily hold its own in Europe.',
    textPt: 'Lugar bem localizado, numa esquina bem visível, espaço grande com 2 andares. O destaque foi o atendimento personalizado: te oferecem um bom café, atendimento rápido e profissional. A 1ª barbearia que conheço em Maldonado que compete tranquilamente com as da Europa.',
  },
  {
    author: 'Matias A.',
    stars: 5,
    text: 'Peluquería 10/10, muy prolija, atención increíble y siempre con buena onda, tienen play y pool por lo tanto si tenes que esperar no te aburrís🤩',
    textEn: 'A 10/10 barbershop, very neat, incredible service and always a great vibe. They have a PlayStation and pool, so if you have to wait you won’t get bored 🤩',
    textPt: 'Barbearia nota 10, muito caprichada, atendimento incrível e sempre com boa vibe. Tem videogame e sinuca, então se precisar esperar você não fica entediado 🤩',
  },
  {
    author: 'santiiivigo',
    stars: 5,
    text: 'Muy buen lugar la verdad.\nBuena atención y cortan bien.\nLa parte de arriba tiene todo para que no te aburras',
    textEn: 'Really good place, honestly. Good service and they cut well. The upstairs has everything so you don’t get bored.',
    textPt: 'Lugar muito bom, de verdade. Bom atendimento e cortam bem. A parte de cima tem de tudo pra você não ficar entediado.',
  },
];
