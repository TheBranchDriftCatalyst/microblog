"use client";
import { useAuth } from "@/common/auth/hooks/useAuth";
import CatalystHeader from "@/common/components/CatalystHeader/CatalystHeader";
import UserNavigationUnit from "@/common/components/navigation_units/LoginNavUnit";
import StoriesNavigation from "@/common/components/navigation_units/BlogPostNavUnit";
import NavigationItem from "@/common/components/NavigationHeader/NavigationItem";
import { useHeader } from "@/common/components/CatalystHeader/CatalystHeaderProvider";
import Image from "next/image";
import { useEffect } from "react";
import MicroBlogHeader from "@/common/header/MicroBlogHeader";

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
