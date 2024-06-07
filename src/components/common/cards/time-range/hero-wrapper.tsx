import bg from "~/public/img/defaultImages/time_search_bg.jpg";
import { css } from "~/styled-system/css";
import { Box, Grid } from "~/styled-system/jsx";

export function TimeRangeHero({
  heading,
  children,
}: {
  heading?: string;
  children: React.ReactNode;
}) {
  return (
    <Grid
      placeItems="center"
      paddingInline="20px"
      paddingBlock={heading ? "150px" : "70px"}
      style={{ backgroundImage: `url(${bg.src})` }}
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Box>
        {heading && (
          <h1
            className={css({
              color: "neutral.5",
              marginBlockEnd: "45px",
              textAlign: "center",
            })}
          >
            {heading}
          </h1>
        )}
        {children}
      </Box>
    </Grid>
  );
}
