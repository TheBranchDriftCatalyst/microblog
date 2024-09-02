"use client";
import { useAuth } from "@/common/auth/hooks/useAuth";
import CatalystHeader from "@/common/components/CatalystHeader/CatalystHeader";
import UserNavigationUnit from "@/common/components/navigation_units/LoginNavUnit";
import StoriesNavigation from "@/common/components/navigation_units/StoriesNavUnit";
import NavigationItem from "@/common/components/NavigationHeader/NavigationItem";
import { useHeader } from "@/common/components/CatalystHeader/CatalystHeaderProvider";
import Image from "next/image";
import { useEffect } from "react";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";

// TODO: remove the header state management from here, create a provider for it and add it to the provider stack, then use the useHeader 
// to register the header state based on the auth state

// const MicroBlogHeader = () => {
//   const { title, setTitle, avatar, setAvatar } = useHeader({
//     title: "Initial Title",
//     avatar: <img src="https://github.com/shadcn.png" alt="Avatar" />,
//   });

//   return (
//     <CatalystHeader
//       title={title}
//       avatar={avatar}
//       navigationItems={[
//         (<StoriesNavigation key="stories_nav" />), 
//         (<UserNavigationUnit key="users_nav" />)
//       ]}
//     />
//   );
// }

export default function Home() {

  return (
    <main>
      <MicroBlogHeader />
      {/* TODO: show some stuff on the microblog homepage */}
      {/* <body>
        TEsting
      </body> */}
    </main>
  );
}
