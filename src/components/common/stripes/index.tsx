export function Stripes(props: any) {
  const {color, mb, mt} = Object.assign(
    {
      color: '#ffd800',
      mt: '32px',
      mb: '62px'
    },
    props
  )
  return (
    <svg
      height="16px"
      preserveAspectRatio="xMinYMid slice"
      style={{
        display: 'block',
        marginTop: mt,
        marginBottom: mb,
        marginRight: 'auto',
        marginLeft: 'auto',
        overflow: 'hidden',
        verticalAlign: 'middle',
        strokeWidth: '3px',
        stroke: color,
        fill: 'none'
      }}
      viewBox="0 0 142 16"
      width="142px"
    >
      <path
        className="stripe-path"
        d="M0,2 l15.778,13 15.778,-13 15.778,13 15.778,-13 15.778,13 15.778,-13  15.778,13 15.778,-13 15.778,13"
      />
    </svg>
  )
}
