import { NavigationMenuLink } from "@/common/ui/navigation-menu";
import NavigationItem from "../NavigationHeader/NavigationItem";
import RegisterOrLoginCard from "@/common/cards/RegisterOrLoginCard/RegisterOrLoginCard";
import { useAuth } from "@/common/auth/hooks/useAuth";


import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Loader, AlertCircle, DoorClosed } from "lucide-react";
import { getMe, getUser } from "@/common/api/users";
import { useRegister } from "@/common/auth/hooks/useRegister";
import Button from "@/common/ui/button";

// Define the TypeScript interface based on the UserSchema
interface UserSchema {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
}

// Props for the UserCard component
interface UserCardProps {
  userId: number;
}

// Function to fetch user data from the API
// const fetchUser = async (userId: number): Promise<UserSchema> => {
//   await getMe
//   return response.data;
// };

// The UserCard component
const UserCard: React.FC<UserCardProps> = ({ userId }) => {
  const { data: user, error, isLoading } = useQuery(["user", userId], getMe)

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
      <div className="flex items-center justify-center h-32">
        <AlertCircle className="w-8 h-8 text-red-500" />
        <p className="ml-2 text-red-500">Error fetching user data</p>
      </div>
    );
  }

  // Render user data
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{user?.username}</div>
        <p className="text-gray-700 text-base">
          {JSON.stringify(user, null, 2)}
        </p>
      </div>
    </div>
  );
};


export const UserNavigationUnit = ({}) => {

  const { login, isAuthenticated, logout, register } = useAuth();
  // const { register } = useRegister()


  const handleLogin = ({username: email, password}: {username: string, password: string}) => { 
    login(email, password);
  }

  const handleRegistration = ({username: email, password}: {username: string, password: string}) => { 
    console.log('TODO: handle registration to users api endpoint')
    register({password, email})
  }

  const userNotLoggedIn = (
    <NavigationItem key="login_nav" title="Login">
      <ul className="p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <NavigationMenuLink asChild>
            <RegisterOrLoginCard oidcProviders={[]} onCreateAccount={handleRegistration} onLogin={handleLogin} />
        </NavigationMenuLink>
      </ul>
    </NavigationItem>
  )

  const userLoggedIn = (
    <NavigationItem key="profile_nav" title="Profile">
      <ul className="p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        <UserCard userId={1} />
        <Button onClick={() => logout()}><DoorClosed className="h-6 w-6" /> Logout</Button>
      </ul>
    </NavigationItem>
  )
    

  return (
    isAuthenticated ? userLoggedIn : userNotLoggedIn
  )
}

export default UserNavigationUnit;
