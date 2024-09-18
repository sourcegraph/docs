
import React from 'react';

export const CURRENT_VERSION = '5.7.2474';
export const CURRENT_VERSION_LONG_FORM = 'Sourcegraph 5 Version 7 Patch 1'

export const CurrentVersion: React.FC = () => {
  return <span>{CURRENT_VERSION}</span>;
};

export const CurrentVersionLongForm: React.FC = () => {
  return <span>{CURRENT_VERSION_LONG_FORM}</span>;
};
