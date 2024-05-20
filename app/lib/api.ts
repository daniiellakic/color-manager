import axios from "axios";

export interface Color {
  name: string;
  hex: string;
}

export const fetchAllColors = async (): Promise<Color[]> => {
  try {
    const response = await axios.get("https://www.csscolorsapi.com/api/colors");
    return response.data.colors as Color[];
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};

export const findColor = async (search: string): Promise<Color | undefined> => {
  const colors = await fetchAllColors();
  const normalizedSearch = search.startsWith("#") ? search : `#${search}`;
  return colors.find(
    (color: Color) =>
      color.hex.toLowerCase() === normalizedSearch.toLowerCase() ||
      color.name.toLowerCase() === search.toLowerCase()
  );
};
