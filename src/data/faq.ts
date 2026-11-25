// Frequently asked questions. Every answer comes from Fresha's published
// information (policies, hours, services). Edit freely.
import type { Localized } from './business';

export type Faq = { q: Localized; a: Localized };

export const FAQ: Faq[] = [
  {
    q: { es: '¿Cómo reservo?', en: 'How do I book?', pt: 'Como faço para agendar?' },
    a: {
      es: 'Tocá cualquier botón “Reservar”: se abre Fresha. Elegís el servicio, el barbero (o “cualquier profesional”), el día y la hora, entrás con tu email, celular, Google o Apple, y confirmás. Te llega la confirmación al instante.',
      en: 'Tap any “Book” button to open Fresha. Pick the service, the barber (or “any professional”), the day and time, sign in with email, phone, Google or Apple, and confirm. Confirmation is instant.',
      pt: 'Toque em qualquer botão “Agendar” e o Fresha abre. Escolha o serviço, o barbeiro (ou “qualquer profissional”), o dia e o horário, entre com seu e-mail, celular, Google ou Apple e confirme. A confirmação chega na hora.',
    },
  },
  {
    q: { es: '¿Puedo cancelar o reprogramar?', en: 'Can I cancel or reschedule?', pt: 'Posso cancelar ou remarcar?' },
    a: {
      es: 'Sí, desde Fresha, con al menos 60 minutos de anticipación. Si no venís o cancelás fuera de plazo, se abona el 50% del servicio en tu próxima visita; si pasa dos veces seguidas, el 100% del segundo servicio.',
      en: 'Yes, from Fresha, at least 60 minutes in advance. If you miss it or cancel late, 50% of the service is charged on your next visit; twice in a row, 100% of the second service.',
      pt: 'Sim, pelo Fresha, com pelo menos 60 minutos de antecedência. Se você não vier ou cancelar fora do prazo, paga 50% do serviço na próxima visita; se acontecer duas vezes seguidas, 100% do segundo serviço.',
    },
  },
  {
    q: { es: '¿Atienden sin turno?', en: 'Do you take walk-ins?', pt: 'Vocês atendem sem horário marcado?' },
    a: {
      es: 'Sí, por orden de llegada. Con turno en Fresha te asegurás el horario y el barbero que querés.',
      en: 'Yes, first come, first served. Booking on Fresha guarantees your time and your barber.',
      pt: 'Sim, por ordem de chegada. Agendando no Fresha você garante o horário e o barbeiro que quiser.',
    },
  },
  {
    q: { es: '¿Cuánto dura un corte?', en: 'How long does a cut take?', pt: 'Quanto tempo dura um corte?' },
    a: {
      es: 'El corte de pelo dura 45 minutos, corte + barba 1 hora y solo barba 30 minutos.',
      en: 'A haircut takes 45 minutes, haircut + beard 1 hour, and beard only 30 minutes.',
      pt: 'O corte de cabelo leva 45 minutos, corte + barba 1 hora e só barba 30 minutos.',
    },
  },
  {
    q: { es: '¿Venden los productos que usan?', en: 'Do you sell the products you use?', pt: 'Vocês vendem os produtos que usam?' },
    a: {
      es: 'Sí: la cera en polvo y la pomada mate de BRB. Las comprás en la barbería o las sumás como extra al reservar en Fresha.',
      en: 'Yes: BRB powder wax and matte pomade. Buy them at the shop or add them as an extra when booking on Fresha.',
      pt: 'Sim: a cera em pó e a pomada matte da BRB. Você compra na barbearia ou adiciona como extra ao agendar no Fresha.',
    },
  },
  {
    q: { es: '¿Cómo se paga?', en: 'How can I pay?', pt: 'Como posso pagar?' },
    a: {
      es: 'Efectivo, tarjeta de crédito o débito, en la barbería.',
      en: 'Cash, credit or debit card, at the shop.',
      pt: 'Dinheiro, cartão de crédito ou débito, na barbearia.',
    },
  },
];
