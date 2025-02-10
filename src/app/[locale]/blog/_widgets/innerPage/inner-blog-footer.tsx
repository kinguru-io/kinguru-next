import { FC, useId } from "react";
import { InnerBlogProps } from "../../interfaces";
import { B2BRegisterSection } from "@/app/[locale]/b2b/_widgets/register/b2b-register-section";
import { css } from "~/styled-system/css";
export const InnerBlogFooter: FC<InnerBlogProps> = () => {
  const id = useId();
  return (
    <section
      className={css({ background: "dark", borderRadius: "3xl", mb: "30px" })}
    >
      <B2BRegisterSection sectionId={id} />
    </section>
  );
};
