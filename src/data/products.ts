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
  },
  {
    id: 'pomada-mate',
    brand: 'BRB',
    name: 'Pomada mate',
    category: 'styling',
    size: '50 ml',
    price: 450,
    // No clean photo yet: the only source is a BRB promo graphic. See PENDIENTES.md.
    forWhom: { es: 'Pelo lacio u ondulado, medio o grueso', en: 'Straight or wavy, medium or thick hair' },
    benefits: {
      es: ['Textura y movimiento', 'Acabado mate natural', 'Sin brillo y sin grasa', 'Fijación fuerte todo el día'],
      en: ['Texture and movement', 'Natural matte finish', 'No shine, no grease', 'Strong all-day hold'],
    },
  },
];
