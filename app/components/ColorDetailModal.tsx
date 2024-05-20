import React from "react";
import { Color } from "../lib/api";

interface ColorDetailModalProps {
  color: Color;
  onClose: () => void;
}

const ColorDetailModal: React.FC<ColorDetailModalProps> = ({
  color,
  onClose,
}) => {
  return (
    <div className="w-full max-w-xs bg-white p-5 rounded shadow-lg m-2.5">
      <h1 className="text-lg text-gray-700 font-semibold mb-3.5">
        {color.name}
      </h1>
      <p className="text-base text-gray-600 mb-2.5">HEX: {color.hex}</p>
      <button
        onClick={onClose}
        className="w-full p-3 bg-blue-500 text-white rounded font-semibold uppercase mt-5 hover:bg-blue-400"
      >
        Close
      </button>
    </div>
  );
};

export default ColorDetailModal;
