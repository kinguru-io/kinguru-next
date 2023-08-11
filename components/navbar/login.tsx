import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import { Spinner } from "@/components/common/spinner";
import { classNames } from "@/utils/class-names";
import { useLocale } from "@/utils/use-locale";

export const Login = () => {
  const { t } = useLocale();
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Spinner />;
  }

  const userNavigation = [
    { name: t("navbar.your_profile"), href: "/dashboard" },
    { name: t("navbar.settings"), href: "#" },
  ];

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {status === "authenticated" ? (
        <>
          <button
            type="button"
            className="relative rounded-full bg-gray-100 p-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">{t("navbar.view_notifications")}</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">{t("navbar.open_user_manu")}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-8 w-8 rounded-full"
                  src={session?.user?.image ?? "/img/user.svg"}
                  alt=""
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700",
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block cursor-pointer px-4 py-2 text-sm text-gray-700",
                      )}
                      onClick={() => signOut()}
                    >
                      {t("navbar.sign_out")}
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </>
      ) : (
        <>
          <button
            className={classNames(
              "text-gray-700 hover:bg-gray-100",
              "rounded-md px-3 py-2 text-sm font-medium",
            )}
            onClick={() => signIn()}
          >
            {t("navbar.sign_in")}
          </button>
        </>
      )}
    </div>
  );
};
