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
// import { HeaderProvider } from '../components/CatalystHeader/HeaderProvider';

// Initialize a new QueryClient instance for React Query
const queryClient = new QueryClient();

export const MicroblogProviderStack = ({ children }: { children: React.ReactNode }) => {
  
    return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CatalystHeaderProvider initialValues={{title: "Microblog"}}>
        {/* TODO: add header provider here eventually */}
        {children}
        </CatalystHeaderProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default MicroblogProviderStack;