import React, { useState, useEffect } from "react";
import { Color } from "../../lib/api";

interface ColorFormProps {
  initialColor?: Color | null;
  onSave: (color: Color) => void;
  onCancel: () => void;
}

const ColorForm: React.FC<ColorFormProps> = ({
  initialColor = null,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState(initialColor?.name || "");
  const [hex, setHex] = useState(initialColor?.hex || "");

  useEffect(() => {
    if (initialColor) {
      setName(initialColor.name);
      setHex(initialColor.hex);
    }
  }, [initialColor]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ name, hex });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded shadow-md m-5 flex flex-col gap-2.5"
    >
      <label className="block mb-1.5 text-gray-800 font-semibold">
        Color Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-800"
        />
      </label>
      <label className="block mb-1.5 text-gray-800 font-semibold">
        HEX Code:
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          required
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          title="Hex color must start with '#' followed by 3 or 6 hexadecimal characters."
          className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-800"
        />
      </label>
      <button
        type="submit"
        className="bg-green-500 text-white p-3 rounded hover:bg-green-600"
      >
        Save
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="bg-red-500 text-white p-3 rounded hover:bg-red-600"
      >
        Cancel
      </button>
    </form>
  );
};

export default ColorForm;
