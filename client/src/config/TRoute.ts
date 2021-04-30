import { FC } from 'react';

export type TRoute = {
  name: string,
  path: string,
  exact: boolean,
  Page: FC,
  Layout: FC
}
