// Frequently asked questions. Every answer comes from Fresha's published
// information (policies, hours, services). Edit freely.

export type Faq = { q: { es: string; en: string }; a: { es: string; en: string } };

export const FAQ: Faq[] = [
  {
    q: { es: '¿Cómo reservo?', en: 'How do I book?' },
    a: {
      es: 'Tocá cualquier botón “Reservar”: se abre Fresha. Elegís el servicio, el barbero (o “cualquier profesional”), el día y la hora, entrás con tu email, celular, Google o Apple, y confirmás. Te llega la confirmación al instante.',
      en: 'Tap any “Book” button to open Fresha. Pick the service, the barber (or “any professional”), the day and time, sign in with email, phone, Google or Apple, and confirm. Confirmation is instant.',
    },
  },
  {
    q: { es: '¿Puedo cancelar o reprogramar?', en: 'Can I cancel or reschedule?' },
    a: {
      es: 'Sí, desde Fresha, con al menos 60 minutos de anticipación. Si no venís o cancelás fuera de plazo, se abona el 50% del servicio en tu próxima visita; si pasa dos veces seguidas, el 100% del segundo servicio.',
      en: 'Yes, from Fresha, at least 60 minutes in advance. If you miss it or cancel late, 50% of the service is charged on your next visit; twice in a row, 100% of the second service.',
    },
  },
  {
    q: { es: '¿Atienden sin turno?', en: 'Do you take walk-ins?' },
    a: {
      es: 'Sí, por orden de llegada. Con turno en Fresha te asegurás el horario y el barbero que querés.',
      en: 'Yes, first come, first served. Booking on Fresha guarantees your time and your barber.',
    },
  },
  {
    q: { es: '¿Cuánto dura un corte?', en: 'How long does a cut take?' },
    a: {
      es: 'El corte de pelo dura 45 minutos, corte + barba 1 hora y solo barba 30 minutos.',
      en: 'A haircut takes 45 minutes, haircut + beard 1 hour, and beard only 30 minutes.',
    },
  },
  {
    q: { es: '¿Venden los productos que usan?', en: 'Do you sell the products you use?' },
    a: {
      es: 'Sí: la cera en polvo y la pomada mate de BRB. Las comprás en la barbería o las sumás como extra al reservar en Fresha.',
      en: 'Yes: BRB powder wax and matte pomade. Buy them at the shop or add them as an extra when booking on Fresha.',
    },
  },
  {
    q: { es: '¿Cómo se paga?', en: 'How can I pay?' },
    a: {
      es: 'Efectivo, tarjeta de crédito o débito, en la barbería.',
      en: 'Cash, credit or debit card, at the shop.',
    },
  },
];
