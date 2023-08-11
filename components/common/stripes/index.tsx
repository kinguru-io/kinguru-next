export const Stripes = (props: {
  color?: string;
  mt?: string;
  mb?: string;
}) => {
  const { color, mt, mb } = Object.assign(
    {
      color: "#ffd800",
      mt: "32px",
      mb: "62px",
    },
    props,
  );
  return (
    <svg
      width="142px"
      height="16px"
      viewBox="0 0 142 16"
      preserveAspectRatio="xMinYMid slice"
      style={{
        display: "block",
        marginTop: mt,
        marginBottom: mb,
        marginRight: "auto",
        marginLeft: "auto",
        overflow: "hidden",
        verticalAlign: "middle",
        strokeWidth: "3px",
        stroke: color,
        fill: "none",
      }}
    >
      <path
        d="M0,2 l15.778,13 15.778,-13 15.778,13 15.778,-13 15.778,13 15.778,-13  15.778,13 15.778,-13 15.778,13"
        className="stripe-path"
      ></path>
    </svg>
  );
};
