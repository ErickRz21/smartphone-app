import React, { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { getSmartphones } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import DiscoverClient from "./DiscoverClient";

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Page({ params }: Props) {
  const { lang: locale } = await params;
  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
  const smartphones = await getSmartphones();

  return <DiscoverClient smartphones={smartphones} />;
}
