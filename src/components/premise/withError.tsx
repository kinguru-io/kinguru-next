import { useTranslations } from "next-intl";
import React, { ComponentType, ReactNode } from "react";
import { Booking } from "@/lib/utils/premise-booking";

interface WithErrorProps {
  children?: Booking[] | ReactNode[] | ReactNode;
}

export function withError<T extends ComponentType<any>>(WrappedComponent: T) {
  const ComponentWithError: React.FC<
    React.ComponentProps<T> & WithErrorProps
  > = (props) => {
    const { children, ...rest } = props;
    const t = useTranslations("profile.my_bookings");

    if (!children || (Array.isArray(children) && children.length === 0)) {
      return <section>{t("no_bookings")}</section>;
    }

    return (
      // @ts-ignore
      <WrappedComponent {...(rest as React.ComponentProps<T>)}>
        {children}
      </WrappedComponent>
    );
  };

  return ComponentWithError;
}
