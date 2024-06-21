import bg from "~/public/img/defaultImages/time_search_bg.jpg";
import { css } from "~/styled-system/css";
import { container } from "~/styled-system/patterns";
import { token } from "~/styled-system/tokens";

const overlayHeroImage: React.CSSProperties = {
  backgroundImage: `
    ${token.var("gradients.dark-overlay")},
    ${token.var("gradients.darken-to-bottom")},
    url(${bg.src})
  `,
};

export function TimeRangeHero({
  heading,
  children,
}: {
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={css({ bgSize: "cover", bgPosition: "center" })}
      style={overlayHeroImage}
    >
      <div
        className={container({
          paddingBlock: { base: "10", md: "24" },
          "&[data-no-heading=true]": {
            paddingBlock: { base: "10", md: "14" },
          },
        })}
        data-no-heading={!Boolean(heading)}
      >
        {heading && (
          <h1
            className={css({
              textStyle: "heading.hero",
              color: "light",
              marginBlockEnd: { base: "6", md: "8" },
            })}
          >
            {heading}
          </h1>
        )}
        {children}
      </div>
    </section>
  );
}
