// Services exactly as published on Fresha (category "♠️ Servicios").
// Prices are "from" prices in Uruguayan pesos: the final price depends on the
// barber and is shown when booking. `freshaId` is Fresha's service id.
import type { Localized } from './business';

export type Service = {
  id: string;
  freshaId: string;
  minutes: number;
  priceFrom: number;
  name: Localized;
  description: Localized;
  /** Options Fresha shows inside the service (same price). */
  options?: Localized[];
};

export const SERVICES: Service[] = [
  {
    id: 'corte',
    freshaId: '8199320',
    minutes: 45,
    priceFrom: 500,
    name: { es: 'Corte de pelo', en: 'Haircut', pt: 'Corte de cabelo' },
    description: {
      es: 'Corte completo y personalizado según tu estilo. Incluye asesoramiento, corte y terminaciones. No incluye barba.',
      en: 'A full haircut tailored to your style. Includes consultation, cut and finishing. Beard not included.',
      pt: 'Corte completo e personalizado de acordo com o seu estilo. Inclui consultoria, corte e acabamento. Não inclui barba.',
    },
  },
  {
    id: 'corte-barba',
    freshaId: '7433520',
    minutes: 60,
    priceFrom: 600,
    name: { es: 'Corte + barba', en: 'Haircut + beard', pt: 'Corte + barba' },
    description: {
      es: 'Servicio completo de cabello y barba: corte personalizado más perfilado y/o afeitado de barba, con terminaciones.',
      en: 'The full service: a tailored haircut plus beard shaping and/or shave, with finishing.',
      pt: 'Serviço completo de cabelo e barba: corte personalizado mais modelagem e/ou barbear, com acabamento.',
    },
    options: [{ es: 'También con cejas, mismo precio', en: 'Also available with eyebrows, same price', pt: 'Também com sobrancelha, mesmo preço' }],
  },
  {
    id: 'barba',
    freshaId: '7433521',
    minutes: 30,
    priceFrom: 250,
    name: { es: 'Solo barba', en: 'Beard only', pt: 'Só barba' },
    description: {
      es: 'Perfilado y/o afeitado de barba, con terminaciones.',
      en: 'Beard shaping and/or shave, with finishing.',
      pt: 'Modelagem e/ou barbear, com acabamento.',
    },
  },
];
