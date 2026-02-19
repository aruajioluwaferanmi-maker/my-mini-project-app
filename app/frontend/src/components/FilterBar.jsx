import { Button } from "@mui/material";
import { trackEvent } from "../utils/analytics";

export default function FilterBar({ categories, activeCategory, onSelect }) {
  function handleSelect(category) {
    trackEvent("filter_applied", { category });
    onSelect(category);
  }
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "contained" : "outlined"}
          size="small"
          onClick={() => handleSelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
