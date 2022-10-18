import type { Orientations } from "@/definitions/rubiks";

const orientations: Orientations = {
  oneThree: {
    possibleRotations: ["90, 0, 270", "270, 180, 90"],
    to: {
      x: [0, [-90, 0, 0]], // fourOne,
      y: [0, [0, 0, -90]], // oneFive,
      z: [0, [0, -90, 0]], // sixThree,
    },
  },
  oneFour: {
    possibleRotations: ["90, 0, 90", "270, 180, 270"],
    to: {
      x: [0, [-90, 0, 0]], // threeOne,
      y: [0, [0, 0, -90]], // oneSix,
      z: [0, [0, -90, 0]], // fiveFour,
    },
  },
  oneFive: {
    possibleRotations: ["90, 0, 180", "270, 180, 0"],
    to: {
      x: [0, [-90, 0, 0]], // sixOne,
      y: [0, [0, 0, -90]], // oneFour,
      z: [0, [0, -90, 0]], // threeFive,
    },
  },
  oneSix: {
    possibleRotations: ["90, 0, 0", "270, 180, 180"],
    to: {
      x: [0, [-90, 0, 0]], // fiveOne,
      y: [0, [0, 0, -90]], // oneThree,
      z: [0, [0, -90, 0]], // fourSix,
    },
  },
  twoThree: {
    possibleRotations: ["90, 180, 270", "270, 0, 90"],
    to: {
      x: [0, [-90, 0, 0]], // fourTwo,
      y: [0, [0, 0, 90]], // twoSix,
      z: [0, [0, -90, 0]], // fiveThree,
    },
  },
  twoFour: {
    possibleRotations: ["90, 180, 90", "270, 0, 270"],
    to: {
      x: [0, [-90, 0, 0]], // threeTwo,
      y: [0, [0, 0, 90]], // twoFive,
      z: [0, [0, -90, 0]], // sixFour,
    },
  },
  twoFive: {
    possibleRotations: ["90, 180, 180", "270, 0, 0"],
    to: {
      x: [0, [-90, 0, 0]], // sixTwo,
      y: [0, [0, 0, 90]], // twoThree,
      z: [0, [0, -90, 0]], // fourFive,
    },
  },
  twoSix: {
    possibleRotations: ["90, 180, 0", "270, 0, 180"],
    to: {
      x: [0, [-90, 0, 0]], // fiveTwo,
      y: [0, [0, 0, 90]], // twoFour,
      z: [0, [0, -90, 0]], // threeSix,
    },
  },
  threeOne: {
    possibleRotations: ["0, 0, 90", "180, 180, 270"],
    to: {
      x: [0, [-90, 0, 0]], // twoThree,
      y: [0, [0, 90, 0]], // threeSix,
      z: [0, [0, 0, -90]], // fiveOne,
    },
  },
  threeTwo: {
    possibleRotations: ["0, 180, 90", "180, 0, 270"],
    to: {
      x: [0, [-90, 0, 0]], // oneThree,
      y: [0, [0, 90, 0]], // threeFive,
      z: [0, [0, 0, 90]], // sixTwo,
    },
  },
  threeFive: {
    possibleRotations: [
      "180, 270, 270",
      "90, 270, 180",
      "0, 270, 90",
      "270, 270, 0",
    ],
    to: {
      x: [0, [0, 0, 90]], // sixThree,
      y: [0, [0, -90, 0]], // threeOne,
      z: [1, [0, -90, 0]], // twoFive,
    },
  },
  threeSix: {
    possibleRotations: [
      "0, 90, 90",
      "90, 90, 0",
      "180, 90, 270",
      "270, 90, 180",
    ],
    to: {
      x: [0, [0, 0, -90]], // fiveThree,
      y: [0, [0, 90, 0]], // threeTwo,
      z: [1, [0, -90, 0]], // oneSix,
    },
  },
  fourOne: {
    possibleRotations: ["180, 180, 90", "0, 0, 270"],
    to: {
      x: [0, [-90, 0, 0]], // twoFour,
      y: [0, [0, -90, 0]], // fourFive,
      z: [0, [0, 0, -90]], // sixOne,
    },
  },
  fourTwo: {
    possibleRotations: ["180, 0, 90", "0, 180, 270"],
    to: {
      x: [0, [-90, 0, 0]], // oneFour,
      y: [0, [0, -90, 0]], // fourSix,
      z: [0, [0, 0, 90]], // fiveTwo,
    },
  },
  fourFive: {
    possibleRotations: [
      "0, 90, 270",
      "90, 90, 180",
      "180, 90, 90",
      "270, 90, 0",
    ],
    to: {
      x: [0, [0, 0, -90]], // sixFour,
      y: [0, [0, 90, 0]], // fourTwo,
      z: [1, [0, -90, 0]], // oneFive,
    },
  },
  fourSix: {
    possibleRotations: [
      "90, 270, 0",
      "0, 270, 270",
      "180, 270, 90",
      "270, 270, 180",
    ],
    to: {
      x: [0, [-90, 0, 0]], // fiveFour,
      y: [1, [0, 90, 0]], // fourOne,
      z: [0, [0, -90, 0]], // twoSix,
    },
  },
  fiveOne: {
    possibleRotations: ["0, 0, 0", "180, 180, 180"],
    to: {
      x: [0, [-90, 0, 0]], // twoFive,
      y: [0, [0, 90, 0]], // fiveThree,
      z: [0, [0, 0, -90]], // fourOne,
    },
  },
  fiveTwo: {
    possibleRotations: ["0, 180, 0", "180, 0, 180"],
    to: {
      x: [0, [-90, 0, 0]], // oneFive,
      y: [0, [0, 90, 0]], // fiveFour,
      z: [0, [0, 0, 90]], // threeTwo,
    },
  },
  fiveThree: {
    possibleRotations: [
      "0, 90, 0",
      "90, 90, 270",
      "180, 90, 180",
      "270, 90, 90",
    ],
    to: {
      x: [0, [0, 0, -90]], // fourFive,
      y: [0, [0, 90, 0]], // fiveTwo,
      z: [1, [0, -90, 0]], // oneThree,
    },
  },
  fiveFour: {
    possibleRotations: [
      "0, 270, 0",
      "90, 270, 90",
      "180, 270, 180",
      "270, 270, 270",
    ],
    to: {
      x: [1, [0, 0, 90]], // threeFive,
      y: [0, [0, 90, 0]], // fiveOne,
      z: [1, [0, -90, 0]], // twoFour,
    },
  },
  sixOne: {
    possibleRotations: ["0, 0, 180", "180, 180, 0"],
    to: {
      x: [0, [-90, 0, 0]], // twoSix,
      y: [0, [0, 90, 0]], // sixFour,
      z: [0, [0, 0, -90]], // threeOne,
    },
  },
  sixTwo: {
    possibleRotations: ["0, 180, 180", "180, 0, 0"],
    to: {
      x: [0, [-90, 0, 0]], // oneSix,
      y: [0, [0, 90, 0]], // sixThree,
      z: [0, [0, 0, 90]], // fourTwo,
    },
  },
  sixThree: {
    possibleRotations: [
      "0, 270, 180",
      "90, 270, 270",
      "180, 270, 0",
      "270, 270, 90",
    ],
    to: {
      x: [0, [0, 0, 90]], // fourSix,
      y: [0, [0, 90, 0]], // sixOne,
      z: [1, [0, -90, 0]], // twoThree,
    },
  },
  sixFour: {
    possibleRotations: [
      "0, 90, 180",
      "90, 90, 90",
      "180, 90, 0",
      "270, 90, 270",
    ],
    to: {
      x: [0, [0, 0, -90]], // threeSix,
      y: [0, [0, 90, 0]], // sixTwo,
      z: [1, [0, -90, 0]], // oneFour,
    },
  },
};

export default orientations;
