import Image from 'next/image';

const DecorativeEvala = () => {
  return (
    <div className="pointer-events-none fixed bottom-0 -left-6 md:-left-12 z-[5]">
      <Image
        src="/images/evala-explain.png"
        alt="Evala"
        width={400}
        height={400}
        className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-lg opacity-45"
        priority
      />
    </div>
  );
};

export default DecorativeEvala; 