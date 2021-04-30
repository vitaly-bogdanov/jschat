import React, { FC } from 'react';

interface Props {
  name: string
}

const HomePage: FC<Props> = ({ name }) => (
  <>
    <h2>{ name }</h2>
  </>
);

export default HomePage;