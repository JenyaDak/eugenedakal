export default function Contact(): React.JSX.Element {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Subscribe</h1>
      <p className="text-lg mb-8">
        Reach out below or via{" "}
        <a
          href="mailto:eugenedakal@gmail.com"
          className="text-blue-600 underline"
        >
          eugenedakal@gmail.com
        </a>
      </p>
      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-600"
          />
          <input
            type="email"
            placeholder="Email *"
            className="w-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-600"
          />
        </div>
        <input
          type="text"
          placeholder="Phone number"
          className="w-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-600"
        />
        <textarea
          placeholder="Comment"
          rows={4}
          className="w-full border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-600"
        />
        <button
          type="submit"
          className="bg-black text-white font-semibold py-2 px-6 shadow hover:bg-gray-800"
        >
          Send
        </button>
      </form>
    </div>
  );
}
