// Services exactly as published on Fresha (category "♠️ Servicios").
// Prices are "from" prices in Uruguayan pesos: the final price depends on the
// barber and is shown when booking. `freshaId` is Fresha's service id.

export type Service = {
  id: string;
  freshaId: string;
  minutes: number;
  priceFrom: number;
  name: { es: string; en: string };
  description: { es: string; en: string };
  /** Options Fresha shows inside the service (same price). */
  options?: { es: string; en: string }[];
};

export const SERVICES: Service[] = [
  {
    id: 'corte',
    freshaId: '8199320',
    minutes: 45,
    priceFrom: 500,
    name: { es: 'Corte de pelo', en: 'Haircut' },
    description: {
      es: 'Corte completo y personalizado según tu estilo. Incluye asesoramiento, corte y terminaciones. No incluye barba.',
      en: 'A full haircut tailored to your style. Includes consultation, cut and finishing. Beard not included.',
    },
  },
  {
    id: 'corte-barba',
    freshaId: '7433520',
    minutes: 60,
    priceFrom: 600,
    name: { es: 'Corte + barba', en: 'Haircut + beard' },
    description: {
      es: 'Servicio completo de cabello y barba: corte personalizado más perfilado y/o afeitado de barba, con terminaciones.',
      en: 'The full service: a tailored haircut plus beard shaping and/or shave, with finishing.',
    },
    options: [{ es: 'También con cejas, mismo precio', en: 'Also available with eyebrows, same price' }],
  },
  {
    id: 'barba',
    freshaId: '7433521',
    minutes: 30,
    priceFrom: 250,
    name: { es: 'Solo barba', en: 'Beard only' },
    description: {
      es: 'Perfilado y/o afeitado de barba, con terminaciones.',
      en: 'Beard shaping and/or shave, with finishing.',
    },
  },
];
