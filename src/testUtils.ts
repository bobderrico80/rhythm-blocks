import { ReactElement } from 'react';
import renderer from 'react-test-renderer';

export const UUID_REGEX = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;

export const createSnapshot = (component: ReactElement<any>) => {
  const snapshot = renderer.create(component);
  return snapshot.toJSON();
};
