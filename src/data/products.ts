// Products sold at the shop (also offered as extras when booking on Fresha).
// Source: Fresha add-ons and @brbproductos.uy posts. Add more items here;
// the category filter appears automatically once there are 2+ categories.
// `name` is BRB's own product name and stays the same in every language.
import type { Localized } from './business';

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
  imageAlt?: Localized;
  forWhom: Localized;
  benefits: Localized<string[]>;
  /** Before/after comparison shown in the slider section (illustrative photos). */
  showcase?: {
    before: string;
    after: string;
    beforeAlt: Localized;
    afterAlt: Localized;
    lead: Localized;
    steps?: Localized<string[]>;
  };
};

export const PRODUCT_CATEGORIES: Record<ProductCategory, Localized> = {
  styling: { es: 'Peinado', en: 'Styling', pt: 'Finalização' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'cera-en-polvo',
    brand: 'BRB',
    name: 'Cera en polvo',
    category: 'styling',
    size: '105 g',
    price: 400,
    image: 'producto-cera-en-polvo',
    imageAlt: {
      es: 'Frasco negro de Cera en Polvo BRB de 105 g sobre fondo blanco',
      en: 'Black 105 g bottle of BRB Powder Wax on a white background',
      pt: 'Frasco preto de Cera em Pó BRB de 105 g sobre fundo branco',
    },
    forWhom: { es: 'Pelo lacio, fino o medio', en: 'Straight, fine or medium hair', pt: 'Cabelo liso, fino ou médio' },
    benefits: {
      es: ['Textura y volumen al instante', 'Acabado mate, sin brillo artificial', 'Sin residuos grasos ni sensación pegajosa', 'Se va con un lavado'],
      en: ['Instant texture and volume', 'Matte finish, no artificial shine', 'No greasy residue or sticky feel', 'Washes out easily'],
      pt: ['Textura e volume na hora', 'Acabamento matte, sem brilho artificial', 'Sem resíduo oleoso nem sensação pegajosa', 'Sai com uma lavagem'],
    },
    showcase: {
      before: 'cera-antes',
      after: 'cera-despues',
      beforeAlt: {
        es: 'Muchacho de espaldas con gorra: el pelo de la nuca cae lacio y pegado, sin producto',
        en: 'Young man from behind in a cap: the hair at the nape lies flat, no product',
        pt: 'Rapaz de costas com boné: o cabelo da nuca cai liso e colado, sem produto',
      },
      afterAlt: {
        es: 'El mismo pelo con cera en polvo: mechones con textura y volumen',
        en: 'The same hair with powder wax: textured, voluminous strands',
        pt: 'O mesmo cabelo com cera em pó: mechas com textura e volume',
      },
      lead: {
        es: 'Textura y volumen al instante, con acabado mate. Deslizá la barra y mirá la diferencia en el mismo pelo.',
        en: 'Instant texture and volume with a matte finish. Slide the bar to see the difference on the same hair.',
        pt: 'Textura e volume na hora, com acabamento matte. Deslize a barra e veja a diferença no mesmo cabelo.',
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
        pt: [
          'Com o cabelo seco, aplique um pouco do pó na raiz.',
          'Massageie com os dedos para levantar e dar textura. Não precisa de pente.',
          'Modele com as mãos. Se quiser mais volume, repita na região.',
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
    imageAlt: {
      es: 'Lata negra de Pomada Mate BRB de 50 ml con etiqueta azul, sobre fondo blanco',
      en: 'Black 50 ml tin of BRB Matte Pomade with a blue label, on a white background',
      pt: 'Lata preta de Pomada Matte BRB de 50 ml com rótulo azul, sobre fundo branco',
    },
    forWhom: {
      es: 'Pelo lacio u ondulado, medio o grueso',
      en: 'Straight or wavy, medium or thick hair',
      pt: 'Cabelo liso ou ondulado, médio ou grosso',
    },
    benefits: {
      es: ['Textura y movimiento', 'Acabado mate natural', 'Sin brillo y sin grasa', 'Fijación fuerte todo el día'],
      en: ['Texture and movement', 'Natural matte finish', 'No shine, no grease', 'Strong all-day hold'],
      pt: ['Textura e movimento', 'Acabamento matte natural', 'Sem brilho e sem oleosidade', 'Fixação forte o dia todo'],
    },
  },
];
