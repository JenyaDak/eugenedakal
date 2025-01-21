export default function Hero(): React.JSX.Element {
  return (
    <div
      className="relative bg-cover bg-top h-[70vh]"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Colour Grade Fast</h1>
          <p className="mt-4">LUTs I use in all my content</p>
          <a
            href="/products"
            className="mt-6 inline-block px-6 py-2 text-white border border-white text-lg uppercase transition-colors duration-300 hover:border-opacity-100 border-opacity-70"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
