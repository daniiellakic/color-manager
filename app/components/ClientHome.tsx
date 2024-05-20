"use client";
import React, { useState } from "react";
import ColorList from "../components/ColorList";
import ColorDetailModal from "../components/ColorDetailModal";
import ColorForm from "./ColorForm/ColorForm";
import { Color, fetchAllColors } from "../lib/api";

const ClientHome: React.FC<{ initialColors: Color[] }> = ({
  initialColors = [],
}) => {
  const [colors, setColors] = useState<Color[]>(initialColors);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [editingColor, setEditingColor] = useState<Color | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const handleColorClick = (colorName: string) => {
    const color = colors.find((c) => c.name === colorName) || null;
    setSelectedColor(color);
    setShowModal(color !== null);
  };

  const handleSave = (color: any) => {
    const updatedColors = editingColor
      ? colors.map((c) => (c.hex === editingColor.hex ? color : c))
      : [...colors, color];
    setColors(updatedColors);
    setEditingColor(null);
    setShowForm(false);
  };

  const handleDelete = (colorHex: string) => {
    const updatedColors = colors.filter((c) => c.hex !== colorHex);
    setColors(updatedColors);
    if (selectedColor?.hex === colorHex) {
      setSelectedColor(null);
      setShowModal(false);
    }
  };

  const handleFilterChange = (event: { target: { value: string } }) => {
    setFilter(event.target.value.toLowerCase());
  };

  const filteredColors = colors.filter(
    (color) =>
      color.name.toLowerCase().includes(filter) ||
      color.hex.toLowerCase().includes(filter)
  );

  return (
    <main className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl text-gray-800 uppercase font-bold mb-5">
        Color Manager
      </h1>
      <input
        type="text"
        placeholder="Search by name or hex value"
        value={filter}
        onChange={handleFilterChange}
        className="p-2 m-2.5 border border-gray-300 rounded w-full max-w-md text-gray-800"
      />
      <button
        className="py-2.5 px-5 border-none rounded cursor-pointer font-bold uppercase text-black"
        onClick={() => {
          setShowForm(true);
          setEditingColor(null);
        }}
      >
        Add Color
      </button>
      <ColorList
        colors={filteredColors}
        onColorClick={handleColorClick}
        onDelete={handleDelete}
      />
      {showModal && selectedColor && (
        <ColorDetailModal
          color={selectedColor}
          onClose={() => setShowModal(false)}
        />
      )}
      {showForm && (
        <ColorForm
          initialColor={editingColor}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}
    </main>
  );
};

export const getServerSideProps = async () => {
  try {
    const initialColors = await fetchAllColors();
    return {
      props: {
        initialColors,
      },
    };
  } catch (error) {
    console.error("Failed to fetch colors:", error);
    return {
      props: {
        initialColors: [],
      },
    };
  }
};

export default ClientHome;
