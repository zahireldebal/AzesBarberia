// Products sold at the shop (also offered as extras when booking on Fresha).
// Source: Fresha add-ons and @brbproductos.uy posts. Add more items here;
// the category filter appears automatically once there are 2+ categories.

export type ProductCategory = 'styling';

export type Product = {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  size?: string;
  price?: number;
  /** Processed image name; omit to show the typographic label panel instead. */
  image?: string;
  imageAlt?: { es: string; en: string };
  forWhom: { es: string; en: string };
  benefits: { es: string[]; en: string[] };
  /** Before/after comparison shown in the slider section (illustrative photos). */
  showcase?: {
    before: string;
    after: string;
    beforeAlt: { es: string; en: string };
    afterAlt: { es: string; en: string };
    lead: { es: string; en: string };
    steps?: { es: string[]; en: string[] };
  };
};

export const PRODUCT_CATEGORIES: Record<ProductCategory, { es: string; en: string }> = {
  styling: { es: 'Peinado', en: 'Styling' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'cera-en-polvo',
    brand: 'BRB',
    name: 'Cera en polvo',
    category: 'styling',
    size: '10 g',
    price: 400,
    image: 'producto-cera-en-polvo',
    imageAlt: { es: 'Frasco de Cera en Polvo BRB en la mano de un barbero', en: 'A barber holding a bottle of BRB Powder Wax' },
    forWhom: { es: 'Pelo lacio, fino o medio', en: 'Straight, fine or medium hair' },
    benefits: {
      es: ['Textura y volumen al instante', 'Acabado mate, sin brillo artificial', 'Sin residuos grasos ni sensación pegajosa', 'Se va con un lavado'],
      en: ['Instant texture and volume', 'Matte finish, no artificial shine', 'No greasy residue or sticky feel', 'Washes out easily'],
    },
    showcase: {
      before: 'cera-antes',
      after: 'cera-despues',
      beforeAlt: { es: 'Pelo lacio y pesado, sin producto, visto de perfil', en: 'Straight, flat hair with no product, seen in profile' },
      afterAlt: { es: 'El mismo pelo con cera en polvo: más textura, volumen y acabado mate', en: 'The same hair with powder wax: more texture, volume and a matte finish' },
      lead: {
        es: 'Textura y volumen al instante, con acabado mate. Deslizá la barra y mirá la diferencia en el mismo pelo.',
        en: 'Instant texture and volume with a matte finish. Slide the bar to see the difference on the same hair.',
      },
      steps: {
        es: [
          'Con el pelo seco, echá un poco de polvo en la raíz.',
          'Masajeá con los dedos para levantar y dar textura. No hace falta peine.',
          'Dale forma con las manos. Si querés más volumen, repetí en la zona.',
        ],
        en: [
          'On dry hair, sprinkle a little powder at the roots.',
          'Work it in with your fingertips to lift and texture. No comb needed.',
          'Shape it with your hands. For more volume, repeat on that area.',
        ],
      },
    },
  },
  {
    id: 'pomada-mate',
    brand: 'BRB',
    name: 'Pomada mate',
    category: 'styling',
    size: '50 ml',
    price: 450,
    image: 'producto-pomada-mate',
    imageAlt: { es: 'Mano sosteniendo la Pomada Mate BRB de 50 ml', en: 'A hand holding a 50 ml jar of BRB Matte Pomade' },
    forWhom: { es: 'Pelo lacio u ondulado, medio o grueso', en: 'Straight or wavy, medium or thick hair' },
    benefits: {
      es: ['Textura y movimiento', 'Acabado mate natural', 'Sin brillo y sin grasa', 'Fijación fuerte todo el día'],
      en: ['Texture and movement', 'Natural matte finish', 'No shine, no grease', 'Strong all-day hold'],
    },
    showcase: {
      before: 'pomada-antes',
      after: 'pomada-despues',
      beforeAlt: { es: 'Pelo mojado y sin forma, antes de peinar', en: 'Wet, shapeless hair before styling' },
      afterAlt: { es: 'El pelo peinado con pomada mate: textura, movimiento y sin brillo', en: 'The hair styled with matte pomade: texture, movement and no shine' },
      lead: {
        es: 'Textura y movimiento con fijación fuerte y acabado natural, sin brillo ni grasa. Deslizá la barra para comparar.',
        en: 'Texture and movement with strong hold and a natural finish, no shine or grease. Slide the bar to compare.',
      },
    },
  },
];
