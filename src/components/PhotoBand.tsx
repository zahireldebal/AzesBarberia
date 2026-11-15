import { Img } from './Img';

/** One full-bleed photograph between sections: the canon's big-photo moment. */
export function PhotoBand({ alt }: { alt: string }) {
  return (
    <div className="relative h-[52svh] min-h-[18rem] w-full overflow-hidden md:h-[68vh]">
      <Img name="local-lounge" alt={alt} sizes="100vw" className="size-full object-cover object-[50%_62%]" />
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,#151517_0%,transparent_22%,transparent_78%,#151517_100%)]" />
    </div>
  );
}
