export type UserPalettes = {
  [name: string]: string[];
};

type ColoringPage = string[][];

export type ColoringPages = {
  [pageName: string]: ColoringPage;
};

export type PanelLocation = "float" | "top" | "left";
