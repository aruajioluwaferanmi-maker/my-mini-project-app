import { trackEvent } from "../utils/analytics";

export default function ProductCard({ product }) {
  const { id, name, price, category, description } = product;

  function handleClick() {
    // AC-03: fire product_card_clicked with id and name in payload
    trackEvent("product_card_clicked", { id, name });
  }

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all duration-200 flex flex-col gap-3"
    >
      {/* Category badge */}
      <span className="self-start text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700">
        {category}
      </span>

      {/* Name and price row */}
      <div className="flex justify-between items-start gap-2">
        <h2 className="text-gray-800 font-bold text-base leading-snug">
          {name}
        </h2>
        <span className="text-blue-600 font-bold text-base whitespace-nowrap">
          ₦{price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
