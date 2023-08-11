import { CSSProperties, FC } from "react";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Section: FC<SectionProps> = ({
  id,
  children,
  className,
  style,
}) => {
  return (
    <div id={id} className={className} style={style}>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        {children}
      </div>
    </div>
  );
};
