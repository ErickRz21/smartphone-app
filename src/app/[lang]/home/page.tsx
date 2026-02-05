import React, { Suspense } from "react";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import Spinner from "@/components/Spinner";
import SmartphoneTable from "@/components/SmartphoneTable";

import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/definitions";
import { getActivities, getTeamMembers, getSmartphones } from "@/lib/data";

interface Props {
  params: {
    lang: Locale;
  };
}

export default function Page({ params: { lang: locale } }: Props) {
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
  const intl = await getIntl(locale);
  const teamMembers = await getTeamMembers();
  const activities = await getActivities();
  const smartphones = await getSmartphones();

  return (
    <div className="space-y-8">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <Card>
            <CardHeader>{intl.formatMessage({ id: "page.home.activities" })}</CardHeader>
            <CardBody>
              {activities.map((activity) => (
                <div key={activity.ts} className="mt-3">
                  <div>{intl.formatMessage({ id: "page.home.activity" }, { action: activity.action })}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                      {activity.firstName} {activity.lastName}
                    </div>
                    <div className="text-sm text-gray-700">
                      {intl.formatDate(new Date(activity.ts), {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>{intl.formatMessage({ id: "page.home.team" })}</CardHeader>
            <CardBody>
              {teamMembers.map((teamMember) => (
                <div key={teamMember.username} className="flex items-center flex-nowrap mt-3">
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={teamMember.profileImage}
                      alt="Profile image"
                      width={50}
                      height={50}
                      className="rounded-full p-1"
                    />
                  </div>
                  <div className="mx-3">
                    <p className="text-base">
                      {teamMember.firstName} {teamMember.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{teamMember.username}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Smartphone Table Section */}
      <div>
        <Card>
          <CardHeader>Catálogo de Smartphones</CardHeader>
          <CardBody>
            <SmartphoneTable smartphones={smartphones} />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
