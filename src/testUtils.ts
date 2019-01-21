import { ReactElement } from 'react';
import renderer from 'react-test-renderer';

export const createSnapshot = (component: ReactElement<any>) => {
  const snapshot = renderer.create(component);
  return snapshot.toJSON();
};
