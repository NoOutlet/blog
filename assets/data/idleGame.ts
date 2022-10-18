import LogImage from "../images/idle/log.png";
import NestImage from "../images/idle/nest.png";
import CopperImage from "../images/idle/copper-ore.png";
import TinImage from "../images/idle/tin-ore.png";
import EmeraldImage from "../images/idle/emerald.png";
import RubyImage from "../images/idle/ruby.png";
import DiamondImage from "../images/idle/diamond.png";
import type { GameData, ItemList } from "@/definitions/idle";

export const gameData: GameData = {
  skills: {
    woodcutting: {
      name: "Woodcutting",
      actions: {
        oak: {
          name: "Oak",
          duration: (level: number) => 5000 - level * 10,
          levelRequired: 1,
          experience: 20,
          requires: [{ category: "axe", level: "bronze", lose: 0.02 }],
          drops: [
            { name: "oakLog", chance: [0, 1] },
            { name: "oakLog", chance: [0, 0.1] },
            { name: "birdNest", chance: [0, 0.01] },
          ],
        },
        willow: {
          name: "Willow",
          duration: (level: number) => 8000 - level * 20,
          levelRequired: 4,
          experience: 60,
          requires: [{ category: "axe", level: "bronze", lose: 0.02 }],
          drops: [
            { name: "willowLog", chance: [0, 1] },
            { name: "willowLog", chance: [0, 0.05] },
            { name: "birdNest", chance: [0, 0.01] },
          ],
        },
      },
    },

    mining: {
      name: "Mining",
      actions: {
        copper: {
          name: "Copper",
          duration: (level: number) => 10000 - level * 10,
          levelRequired: 1,
          experience: 20,
          requires: [{ category: "pick", level: "bronze", lose: 0.02 }],
          drops: [
            { name: "copperOre", chance: [0, 1] },
            { name: "emerald", chance: [0, 0.008] },
            { name: "ruby", chance: [0, 0.004] },
            { name: "diamond", chance: [0, 0.001] },
          ],
        },
        tin: {
          name: "Tin",
          duration: (level: number) => 10000 - level * 10,
          levelRequired: 1,
          experience: 20,
          requires: [{ category: "pick", level: "bronze", lose: 0.02 }],
          drops: [
            { name: "tinOre", chance: [0, 1] },
            { name: "emerald", chance: [0, 0.008] },
            { name: "ruby", chance: [0, 0.004] },
            { name: "diamond", chance: [0, 0.001] },
          ],
        },
      },
    },
  },
};

const levelByExp = [
  0,
  100,
  210,
  330,
  460,
  600,
  750,
  910,
  1080,
  1250,
  1420,
  1600,
  1790,
  2000,
  Infinity,
];
export const getLevelData = (experience: number) => {
  const level = levelByExp.findIndex((level) => level > experience);
  const progress = Math.round(
    (100 * (experience - levelByExp[level - 1])) /
      (levelByExp[level] - levelByExp[level - 1])
  );
  return { level, progress };
};

export const items: ItemList = {
  oakLog: {
    name: "Oak Log",
    category: "wood",
    picture: LogImage,
    stackable: true,
    price: [10, 1, 1],
  },
  willowLog: {
    name: "Willow Log",
    category: "wood",
    picture: LogImage,
    stackable: true,
    price: [8, 1, 1],
  },
  birdNest: {
    name: "Birds Nest",
    category: "other",
    picture: NestImage,
    stackable: true,
    price: [1, 1, 5],
  },
  copperOre: {
    name: "Copper Ore",
    category: "ore",
    picture: CopperImage,
    stackable: true,
    price: [8, 1, 1],
  },
  tinOre: {
    name: "Tin Ore",
    category: "ore",
    picture: TinImage,
    stackable: true,
    price: [8, 1, 1],
  },
  emerald: {
    name: "Emerald",
    category: "gem",
    picture: EmeraldImage,
    stackable: true,
    price: [4, 1, 5],
  },
  ruby: {
    name: "Ruby",
    category: "gem",
    picture: RubyImage,
    stackable: true,
    price: [4, 1, 5],
  },
  diamond: {
    name: "Diamond",
    category: "gem",
    picture: DiamondImage,
    stackable: true,
    price: [2, 1, 10],
  },
};

export const getItemImage = (itemName: string) => items[itemName].picture;
