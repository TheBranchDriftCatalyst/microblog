import { NavigationMenuLink } from "@/common/ui/navigation-menu";
import NavigationItem from "../NavigationHeader/NavigationItem";
import RegisterOrLoginCard from "@/common/cards/RegisterOrLoginCard/RegisterOrLoginCard";
import { useAuth } from "@/common/auth/hooks/useAuth";

import React from "react";
import { useQuery } from "react-query";
import { Loader, AlertCircle, DoorClosed } from "lucide-react";
import { getMe, getUserPosts } from "@/common/api/users";
import Button from "@/common/ui/button";

// Define the TypeScript interface based on the UserSchema
interface UserSchema {
  id: number;
  username: string;
  avatar?: string;
  email: string;
}

// Props for the UserCard component
interface UserCardProps {
  userId: number;
}

// The UserCard component
const UserCard: React.FC<UserCardProps> = ({ userId }) => {
  const { data: user, error, isLoading } = useQuery(["user", userId], getMe);
  const { data } = useQuery(["userPosts", userId], () => getUserPosts(userId));

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <Loader className="animate-spin w-8 h-8 text-blue-500" />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-32 text-red-500">
        <AlertCircle className="w-8 h-8" />
        <p className="ml-2">Error fetching user data</p>
      </div>
    );
  }

  // Render user data
  // TODO: convert this to a card component from ui/cards
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg p-6">
      <div className="flex items-center space-x-4">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <span>{user?.username[0]}</span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{user?.username}</h2>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        Posts {data?.length}
      </div>
    </div>
  );
};

export const UserNavigationUnit = () => {
  const { login, isAuthenticated, logout, register } = useAuth();

  const handleLogin = ({
    username: email,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    login(email, password);
  };

  const handleRegistration = ({
    username: email,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    console.log("TODO: handle registration to users api endpoint");
    register({ password, email });
  };

  const userNotLoggedIn = (
    <NavigationItem key="login_nav" title="Login">
      <ul className="p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr shadow-md rounded-lg">
        <NavigationMenuLink asChild>
          <RegisterOrLoginCard
            oidcProviders={[]}
            onCreateAccount={handleRegistration}
            onLogin={handleLogin}
          />
        </NavigationMenuLink>
      </ul>
    </NavigationItem>
  );

  const userLoggedIn = (
    <NavigationItem key="profile_nav" title="Profile">
      <ul className="p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr shadow-md rounded-lg space-y-4">
        <UserCard userId={1} />
        <Button
          onClick={() => logout()}
          className="w-full flex items-center justify-center bg-red-500 px-4 py-2 rounded-md shadow hover:bg-red-600 transition ease-in-out duration-150"
        >
          <DoorClosed className="h-6 w-6 mr-2" />
          Logout
        </Button>
      </ul>
    </NavigationItem>
  );

  return isAuthenticated ? userLoggedIn : userNotLoggedIn;
};

export default UserNavigationUnit;
