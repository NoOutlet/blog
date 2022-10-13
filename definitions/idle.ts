type Skill = {
  experience: number;
  actions: { [name: string]: number };
};

type PlayerItem = {
  name: string;
  health?: number;
  count?: number;
};

export type Item = {
  name: string;
  category: string;
  picture: string;
  stackable: boolean;
  price: [number, number, number];
};

export type ItemList = {
  [itemName: string]: Item;
};

interface SellableItem extends Item {
  count: number;
}

export type Sellables = {
  [itemKey: string]: SellableItem;
};

export type UserData = {
  skills: { [name: string]: Skill };
  items: PlayerItem[];
};

export type CurrentAction = { skill: string; action: string };

type ItemReq = {
  category: string;
  level: string;
  lose: number;
};

type Drop = {
  name: string;
  chance: [number, number];
};

type Action = {
  name: string;
  duration: (level: number) => number;
  levelRequired: number;
  experience: number;
  requires: ItemReq[];
  drops: Drop[];
};

type Skill2 = {
  name: string;
  actions: {
    [actionName: string]: Action;
  };
};

export type GameData = {
  skills: {
    [skillName: string]: Skill2;
  };
};
