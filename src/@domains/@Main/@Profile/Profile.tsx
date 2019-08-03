import React from 'react';

interface IProfile {
  title?: string;
}

export const Profile: React.FC<IProfile> = ({ title }) => {
  return <div>Profile</div>;
};
