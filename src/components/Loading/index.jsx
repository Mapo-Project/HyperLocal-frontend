import React from 'react';
// import MoonLoader from 'react-spinners/MoonLoader';
import { LoadingContainer } from './style';

// const override = {
//   opacity: '0.6',
// };

function Loading() {
  return (
    <LoadingContainer>
      {/* <MoonLoader size={80} speedMultiplier={0.5} cssOverride={override} /> */}
    </LoadingContainer>
  );
}

export default Loading;
