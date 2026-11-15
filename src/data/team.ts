// The five barbers on Fresha. `freshaId` opens Fresha with that barber
// preselected. Photos are their Fresha profile pictures.
// `haircutFrom` = their price for "Corte de pelo" as shown on Fresha.
// Specialties are not published anywhere yet: add them here when confirmed.

export type Barber = {
  id: string;
  name: string;
  freshaId: string;
  image: string;
  haircutFrom: number;
  specialty?: { es: string; en: string };
};

export const TEAM: Barber[] = [
  { id: 'lautaro', name: 'Lautaro', freshaId: '5769190', image: 'equipo-lautaro', haircutFrom: 500 },
  { id: 'federico', name: 'Federico', freshaId: '5553310', image: 'equipo-federico', haircutFrom: 500 },
  { id: 'emanuel', name: 'Emanuel', freshaId: '5400327', image: 'equipo-emanuel', haircutFrom: 500 },
  { id: 'benjamin', name: 'Benjamín', freshaId: '1822598', image: 'equipo-benjamin', haircutFrom: 550 },
  { id: 'alex', name: 'Alex', freshaId: '2549351', image: 'equipo-alex', haircutFrom: 850 },
];
