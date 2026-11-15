// Gallery images (processed from Instagram grid captures by scripts/process-images.mjs).
// Replace with original photos when available: drop them in, add a job in the
// script, run `npm run images`, and list the names here.

export type GalleryItem = { image: string; alt: { es: string; en: string } };

const cut = (n: number, es: string, en: string): GalleryItem => ({
  image: `galeria-${String(n).padStart(2, '0')}`,
  alt: { es, en },
});

export const GALLERY: GalleryItem[] = [
  cut(1, 'Barbero acomodando el pelo de un chico en el sillón', 'Barber styling a boy’s hair in the chair'),
  cut(2, 'Cliente con corte texturizado y barbero detrás', 'Client with a textured cut, barber behind him'),
  cut(3, 'Cliente con corte corto y barba, antes de rapar', 'Client with short cut and beard before a buzz cut'),
  cut(4, 'Barbero del equipo en el local, sentado en el sillón', 'Team barber in the shop, sitting in the chair'),
  cut(5, 'Barbero del equipo en el local con su remera de Azes', 'Team barber in the shop wearing an Azes tee'),
  cut(6, 'Barbero trabajando un corte bajo el techo de luces', 'Barber working a cut under the light ceiling'),
  cut(7, 'Cliente con mechas claras y el equipo detrás', 'Client with light highlights, team behind him'),
  cut(8, 'Cliente con degradado corto sonriendo a cámara', 'Client with a short fade smiling at the camera'),
  cut(9, 'Barbero junto a un cliente con el corte terminado', 'Barber next to a client with the finished cut'),
  cut(10, 'Barbero detrás de un cliente con lentes y corte nuevo', 'Barber behind a client with glasses and a fresh cut'),
  cut(11, 'Niño con rulos decolorados y degradado', 'Boy with bleached curls and a fade'),
];
