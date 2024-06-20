export interface SpritesMap {
  action: "arrow" | "view-off" | "view";
  common: "phone";
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
    filePath: "action.8c58981f.svg",
    items: {
      arrow: {
        viewBox: "0 0 20 20",
        width: 20,
        height: 20,
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
    filePath: "common.6c74e148.svg",
    items: {
      phone: {
        viewBox: "0 0 24 25",
        width: 24,
        height: 25,
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
