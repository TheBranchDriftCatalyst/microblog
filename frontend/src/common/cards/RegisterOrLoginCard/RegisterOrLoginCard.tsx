"use client";

import { Button } from "@/common/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/common/ui/card";
import { SiGit, SiGoogle } from "@icons-pack/react-simple-icons";
import { toLower } from "lodash";
import { FileQuestionIcon } from "lucide-react";
import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  // Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/ui/form";
import { Input } from "@/common/ui/input";
import { Typography } from "@/common/ui/typography";
import { zodResolver } from "@hookform/resolvers/zod";

const InputFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
});

const ProviderIcons = {
  github: SiGit,
  google: SiGoogle,
};

interface OIDCProviderShape {
  name: keyof typeof ProviderIcons;
  onClick: () => void;
  icon?: React.ComponentType;
}

interface RegisterOrLoginCardProps {
  oidcProviders: OIDCProviderShape[];
  onLogin: (values: z.infer<typeof InputFormSchema>) => void;
  onCreateAccount: () => void;
}

// @ts-ignore
export const RegisterOrLoginCard = ({ oidcProviders, onLogin, onCreateAccount }: RegisterOrLoginCardProps) => {
  const form = useForm<z.infer<typeof InputFormSchema>>({
    resolver: zodResolver(InputFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email below to login</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLogin)}>
          <CardContent>
            <div className="flex justify-evenly">
              {oidcProviders.map((provider) => (
                <OIDCButton key={provider.name} provider={provider} />
              ))}
            </div>
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                // console.log(field);
                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="someone@somewhere.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                // console.log(field);
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-evenly">
              <span className="shrink-1">
                <Button variant="default" type="submit">
                  Login
                </Button>
              </span>
              <Typography size="2xs" className="text-muted-foreground">
                or
              </Typography>
              <span className="shrink-1">
                <Button variant="secondary" onClick={form.handleSubmit(onCreateAccount)}>
                  Create account
                </Button>
              </span>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

const OIDCButton: React.FC<{ provider: OIDCProviderShape }> = ({ provider }) => {
  const lookupName = toLower(provider.name) as keyof typeof ProviderIcons;
  const IconComponent = ProviderIcons[lookupName] || provider?.icon || FileQuestionIcon;

  return (
    <Button variant="outline" onClick={provider.onClick}>
      {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
      {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
    </Button>
  );
};

export default RegisterOrLoginCard;
