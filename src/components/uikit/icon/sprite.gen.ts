export interface SpritesMap {
  action:
    | "arrow-tail"
    | "arrow"
    | "cross"
    | "image-add"
    | "menu"
    | "move"
    | "tick-double"
    | "tick"
    | "trash-can"
    | "view-off"
    | "view";
  auth: "github" | "google";
  common:
    | "calendar"
    | "cards"
    | "location-star"
    | "phone"
    | "play-icon"
    | "search"
    | "settings"
    | "spinner"
    | "time"
    | "user-circle";
  social: "facebook" | "instagram" | "linkedin";
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string;
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string;
        width: number;
        height: number;
      }
    >;
  };
} = {
  action: {
    filePath: "action.9b441eab.svg",
    items: {
      "arrow-tail": {
        viewBox: "0 0 20 20",
        width: 20,
        height: 20,
      },
      arrow: {
        viewBox: "0 0 20 20",
        width: 20,
        height: 20,
      },
      cross: {
        viewBox: "0 0 14 14",
        width: 14,
        height: 14,
      },
      "image-add": {
        viewBox: "0 0 32 32",
        width: 32,
        height: 32,
      },
      menu: {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
      move: {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
      "tick-double": {
        viewBox: "0 0 41 40",
        width: 41,
        height: 40,
      },
      tick: {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
      "trash-can": {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
      "view-off": {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
      view: {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
    },
  },
  auth: {
    filePath: "auth.9f2ed548.svg",
    items: {
      github: {
        viewBox: "0 0 98 96",
        width: 98,
        height: 96,
      },
      google: {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
    },
  },
  common: {
    filePath: "common.e92fc012.svg",
    items: {
      calendar: {
        viewBox: "0 0 20 20",
        width: 20,
        height: 20,
      },
      cards: {
        viewBox: "0 0 64 64",
        width: 64,
        height: 64,
      },
      "location-star": {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
      phone: {
        viewBox: "0 0 24 25",
        width: 24,
        height: 25,
      },
      "play-icon": {
        viewBox: "0 0 1280 1280",
        width: 1706.667,
        height: 1706.667,
      },
      search: {
        viewBox: "0 0 21 20",
        width: 21,
        height: 20,
      },
      settings: {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
      spinner: {
        viewBox: "0 0 16 16",
        width: 200,
        height: 200,
      },
      time: {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
      "user-circle": {
        viewBox: "0 0 24 24",
        width: 24,
        height: 24,
      },
    },
  },
  social: {
    filePath: "social.d30c188f.svg",
    items: {
      facebook: {
        viewBox: "0 0 40 40",
        width: 40,
        height: 40,
      },
      instagram: {
        viewBox: "0 0 40 40",
        width: 40,
        height: 40,
      },
      linkedin: {
        viewBox: "0 0 40 40",
        width: 40,
        height: 40,
      },
    },
  },
};
