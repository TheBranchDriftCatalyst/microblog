'use client';

import { useAuth } from "@/common/auth/AuthContext";
import NavigationHeader from "@/common/components/NavigationHeader/NavigationHeader";
import NavigationItem from "@/common/components/NavigationHeader/NavigationItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/ui/avatar";
import Typography from "@/common/ui/typography";
import { ReactElement } from "react";

export interface CatalystHeaderProps {
  navigationItems: React.ReactElement<typeof NavigationItem>[];
  title: string;

  avatar?: ReactElement

  breadcrumbs?: any[]
}

export const CatalystHeader = ({ navigationItems, title, avatar }: CatalystHeaderProps) => {
  return (
    <header suppressHydrationWarning={true} className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="ml-4 mr-4 flex justify-between">
        {/* Left Subgroup */}
        <div className="flex items-center">
            <div className="flex items-center">
              <Typography>{title}</Typography>
            </div>
        </div>
        {/* Right Subgroup */}
        <div suppressHydrationWarning={true} className="flex items-center justify-around">
            <NavigationHeader direction="right">{navigationItems}</NavigationHeader>
            {avatar}
        </div>
      </div>
      {/* <div className="ml-4 mr-4">
          <Breadcrumbs crumbs={breadcrumbs}  />
      </div> */}
    </header>
  );
};

export default CatalystHeader;
