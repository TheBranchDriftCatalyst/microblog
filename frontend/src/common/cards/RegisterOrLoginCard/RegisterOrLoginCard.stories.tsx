import { Meta } from '@storybook/react';
// import NavigationItem, { _sampleLinkObjects } from "../NavigationHeader/NavigationItem";
import RegisterOrLoginCard from './RegisterOrLoginCard'; // Adjust the import path as needed

// Define the metadata for the story
const meta: Meta<typeof RegisterOrLoginCard> = {
  title: 'Cards/RegisterOrLoginCard',
  component: RegisterOrLoginCard,
  parameters: {
    layout: 'centered'
  }
};

export default meta;

export const Default = {
  args: {
    oidcProviders: [
      {
        name: 'GitHub',
        onClick: () => {},
        // icon: ,
      },
      {
        name: 'Google',
        onClick: () => {},
        // icon: ,
      },
    ],
  },
};
