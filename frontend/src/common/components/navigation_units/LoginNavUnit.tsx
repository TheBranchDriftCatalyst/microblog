import { NavigationMenuLink } from "@/common/ui/navigation-menu";
import NavigationItem from "../NavigationHeader/NavigationItem";
import RegisterOrLoginCard from "@/common/cards/RegisterOrLoginCard/RegisterOrLoginCard";
import { useAuth } from "@/common/auth/hooks/useAuth";

export const UserNavigationUnit = ({}) => {

  const { login, isAuthenticated } = useAuth();

  const handleLogin = ({username: email, password}: {username: string, password: string}) => { 
    login(email, password);
  }

  const handleRegistration = () => { 
    console.log('TODO: handle registration to users api endpoint')
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
    <NavigationItem key="Profile" title="Profile">
      <ul className="p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
        {/* TODO: create user profile card */}
      </ul>
    </NavigationItem>
  )
    

  return (
    isAuthenticated ? userLoggedIn : userNotLoggedIn
  )
}

export default UserNavigationUnit;
