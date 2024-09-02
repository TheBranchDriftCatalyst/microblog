import React, { createContext, useContext, useState } from 'react';

interface CatalystHeaderContextProps {
  navigationItems: React.ReactElement[]; // Assuming typeof NavigationItem is React.ReactElement
  title: string;
  avatar?: React.ReactElement;
  // breadcrumbs?: any[];
  setNavigationItems: (items: React.ReactElement[]) => void;
  setTitle: (title: string) => void;
  setAvatar: (avatar: React.ReactElement) => void;
  // setBreadcrumbs: (breadcrumbs: any[]) => void;
}

const CatalystHeaderContext = createContext<CatalystHeaderContextProps | undefined>(undefined);

export const CatalystHeaderProvider = ({
  children,
  initialValues = {},
}: {
  children: React.ReactNode;
  initialValues?: Partial<CatalystHeaderContextProps>;
}) => {
  const [navigationItems, setNavigationItems] = useState<React.ReactElement[]>(
    initialValues.navigationItems || []
  );
  const [title, setTitle] = useState<string>(initialValues.title || '');
  const [avatar, setAvatar] = useState<React.ReactElement | undefined>(
    initialValues.avatar || undefined
  );
  // const [breadcrumbs, setBreadcrumbs] = useState<any[]>(initialValues.breadcrumbs || []);

  return (
    <CatalystHeaderContext.Provider
      value={{
        navigationItems,
        title,
        avatar,
        // breadcrumbs,
        setNavigationItems,
        setTitle,
        setAvatar,
        // setBreadcrumbs,
      }}
    >
      {children}
    </CatalystHeaderContext.Provider>
  );
};

export const useHeader = () => {
  const context = useContext(CatalystHeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a CatalystHeaderProvider');
  }
  return context;
};
