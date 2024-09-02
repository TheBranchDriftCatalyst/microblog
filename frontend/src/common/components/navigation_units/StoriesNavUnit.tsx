import { NavigationMenuLink } from "@/common/ui/navigation-menu";
import NavigationItem, { NavigationListItem } from "../NavigationHeader/NavigationItem";
import { title } from "process";
import { LucideAlarmClock } from "lucide-react";

export const StoriesNavigation = ({}) => {


  
  return (
    <NavigationItem key="stories_nav" title="Stories">
      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <li className="">
          <NavigationMenuLink asChild>
            <LucideAlarmClock className="h-6 w-6" />
          </NavigationMenuLink>
        </li>
        {
        Array.from({length: 10}, (_, idx) => (
          <NavigationListItem key={idx} href="/docs" title="Introduction">
            Re-usable components built using Radix UI and Tailwind CSS.
          </NavigationListItem>
        ))
      }
      </ul>
    </NavigationItem>
  );
};

export default StoriesNavigation;
