import React from "react";
import { Color } from "../lib/api";

interface ColorListProps {
  colors: Color[];
  onColorClick: (colorName: string) => void;
  onDelete: (colorHex: string) => void;
}

const ColorList: React.FC<ColorListProps> = ({
  colors,
  onColorClick,
  onDelete,
}) => {
  return (
    <div className="flex flex-col p-2.5 m-2.5">
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-1.5 mb-1.5"
        >
          <div
            className="flex-grow p-2.5 rounded cursor-pointer transition-colors duration-300"
            style={{ backgroundColor: color.hex, color: "#FFF" }}
            onClick={() => onColorClick(color.name)}
          >
            {color.name} - {color.hex}
          </div>
          <button
            className="bg-red-600 text-white p-1.5 ml-2.5 rounded cursor-pointer hover:bg-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(color.hex);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ColorList;
