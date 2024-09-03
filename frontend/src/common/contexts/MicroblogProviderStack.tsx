"use client";

import React, { useId } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from '../auth/AuthContext';
import CatalystHeader from '../components/CatalystHeader/CatalystHeader';
import NavigationItem, { NavigationListItem } from '../components/NavigationHeader/NavigationItem';
import { NavigationMenuLink } from '../ui/navigation-menu';
import RegisterOrLoginCard from '../cards/RegisterOrLoginCard/RegisterOrLoginCard';
import { TypeOf, ZodObject, ZodString, ZodTypeAny } from 'zod';
import { CatalystHeaderProvider } from '../components/CatalystHeader/CatalystHeaderProvider';
import { Toaster } from '../ui/toaster';
import { ThemeProvider } from '../Theme';
// import { HeaderProvider } from '../components/CatalystHeader/HeaderProvider';

// Initialize a new QueryClient instance for React Query
const queryClient = new QueryClient();

export const MicroblogProviderStack = ({ children }: { children: React.ReactNode }) => {
  
    return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
            <CatalystHeaderProvider initialValues={{title: "Microblog"}}>
            <Toaster />
            {/* TODO: add header provider here eventually */}
            {children}
            </CatalystHeaderProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MicroblogProviderStack;