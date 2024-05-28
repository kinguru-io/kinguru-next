"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getDefaultFormAmenities } from "../_premise-form/default-form-amenities";
import { SubmitOrNextTabButton } from "../_premise-form/SubmitOrNextTabButton";
import BookingCancelTerm from "../_premise-form/tabs/BookingCancelTerm";
import MainInformation from "../_premise-form/tabs/MainInformation";
import OpenHoursAndPrices from "../_premise-form/tabs/OpenHoursAndPrices";
import ParametersAndAmenities from "../_premise-form/tabs/ParametersAndAmenities";
import Resources from "../_premise-form/tabs/Resources";
import Rules from "../_premise-form/tabs/Rules";
import {
  Button,
  Tab,
  TabContent,
  TabList,
  TabsWrapper,
} from "@/components/uikit";
import { PassActiveTabProvider } from "@/components/uikit/Tabs/Tabs";
import { type CreatePremiseAction } from "@/lib/actions/premise";
import {
  type CreatePremiseFormSchemaProps,
  CreatePremiseFormTypeEnum,
  createPremiseFormSchema,
  MergedFormSchemaProps,
} from "@/lib/actions/premise/validation";
import { transformMultiFormPayload } from "@/utils/forms/multiFormHandlers";

// import { useRouter } from "@/navigation";

interface AddPremiseFormProps {
  createPremiseAction: CreatePremiseAction;
  venueId: string;
  mapboxId: string;
}

export function AddPremiseForm({
  createPremiseAction,
  venueId,
  mapboxId,
}: AddPremiseFormProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const t = useTranslations("profile.premises.add");
  const isEditing = pathname?.includes("edit-premise");

  const methods = useForm<CreatePremiseFormSchemaProps>({
    mode: "onChange",
    resolver: zodResolver(createPremiseFormSchema),
    defaultValues: {
      formType: CreatePremiseFormTypeEnum.MainInformation,
      resources: {
        resources: Array.from({ length: 12 }, () => ({ url: "" })),
      },
      parametersAndAmenities: {
        amenities: getDefaultFormAmenities(),
      },
      openHoursAndPrice: {
        discounts: [],
      },
    },
  });

  const {
    getValues,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const formSubmit = async (payload: CreatePremiseFormSchemaProps) => {
    const multiFormPayload = transformMultiFormPayload<
      CreatePremiseFormSchemaProps,
      MergedFormSchemaProps
    >(payload);

    const response = await createPremiseAction(multiFormPayload, venueId);
    if (!response) return;

    const { status, message } = response;

    if (status === "error") {
      toast.error(message);
    }

    if (status === "success") {
      toast.success(message);
      push(`/profile/venues/${venueId}`);
    }
  };

  function setFormType(newFormType: CreatePremiseFormTypeEnum) {
    methods.setValue("formType", newFormType);
  }

  function setActiveForm(tabIdx: number) {
    setFormType(tabs[tabIdx].formType);
  }

  const tabs = [
    {
      label: t("groups.main_info"),
      content: <MainInformation isEditing={isEditing} />,
      formType: CreatePremiseFormTypeEnum.MainInformation,
    },
    {
      label: t("groups.photo"),
      content: <Resources />,
      formType: CreatePremiseFormTypeEnum.Resources,
    },
    {
      label: t("groups.amenities"),
      content: <ParametersAndAmenities />,
      formType: CreatePremiseFormTypeEnum.ParametersAndAmenities,
    },
    {
      label: t("groups.open_hours"),
      content: <OpenHoursAndPrices mapboxId={mapboxId} />,
      formType: CreatePremiseFormTypeEnum.OpenHoursAndPrice,
    },
    {
      label: t("groups.rules"),
      content: <Rules />,
      formType: CreatePremiseFormTypeEnum.Rules,
    },
    {
      label: t("groups.booking_cancel_terms"),
      content: <BookingCancelTerm />,
      formType: CreatePremiseFormTypeEnum.BookingCancelTerm,
    },
  ];

  async function handleNextFormType() {
    if (isValid) {
      const nextTabIdx = PassActiveTabProvider.activeTabIdx + 1;
      const lastTabIdx = tabs.length;

      if (nextTabIdx < lastTabIdx) {
        setFormType(tabs[nextTabIdx].formType);
        PassActiveTabProvider.setActiveTabIdx((prevIdx) => prevIdx + 1);
      } else {
        try {
          await formSubmit(getValues());
        } catch (error) {
          console.error("An error occurred during form submission:", error);
        }
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        // `action` prop isn't working as expected since <TabsContent /> is rendering only the current tab
        // The form is really complex, so `display: none` isn't used. Btw `next/submit` button requires JS too
        onSubmit={handleSubmit(handleNextFormType)}
      >
        <TabsWrapper>
          <TabList overflowX="auto" marginBlockEnd="50px">
            {tabs.map(({ label }, i) => (
              <Tab
                key={label}
                tabIdx={i}
                label={label}
                setActiveForm={setActiveForm}
                variant="line-below"
              />
            ))}
          </TabList>
          <TabContent
            tabList={tabs}
            display="flex"
            flexDirection="column"
            gap="40px"
            marginBlockEnd="40px"
          />
          <SubmitOrNextTabButton lastTabIdx={tabs.length - 1} />
        </TabsWrapper>
      </form>
    </FormProvider>
  );
}
