import { coloring } from "@/assets/data/coloringPages";
import type { UserPalettes } from "@/definitions/color";
import useStorage from "./storage";

const palettes = useStorage<UserPalettes>("userPalettes", {});

const setPalette = (name: string, palette: string[]) => {
  palettes.value[name] = palette;
};

const deletePalette = (name: string | number) => {
  delete palettes.value[name];
};

export const usePalettes = () => ({
  palettes,
  setPalette,
  deletePalette,
  restorePalette,
});

const pictures = useStorage("coloring", coloring);

const restorePalette = (pageName: string) => {
  const colors = pictures.value[pageName].reduce(
    (acc: string[], path: string[]) => {
      if (path.length > 1 && !acc.includes(path[1])) {
        acc.push(path[1]);
      }
      return acc;
    },
    []
  );
  return colors;
};

const clearPage = (pageName: string | number) => {
  pictures.value[pageName] = coloring[pageName];
};

export const useColoring = () => ({
  pictures,
  restorePalette,
  clearPage,
});
