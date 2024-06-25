export interface SpritesMap {
  action: "arrow" | "cross" | "view-off" | "view";
  common: "calendar" | "phone" | "search" | "settings" | "time";
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
    filePath: "action.b0bb6950.svg",
    items: {
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
  common: {
    filePath: "common.6fd97590.svg",
    items: {
      calendar: {
        viewBox: "0 0 20 20",
        width: 20,
        height: 20,
      },
      phone: {
        viewBox: "0 0 24 25",
        width: 24,
        height: 25,
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
      time: {
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
