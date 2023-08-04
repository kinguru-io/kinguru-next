import { FC } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Section: FC<SectionProps> = ({ children, className }) => {
  return (
    <div className={`bg-white ${className}`}>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        {children}
      </div>
    </div>
  );
};
