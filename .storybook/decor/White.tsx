import React from 'react';

export default function WhiteDecorator(getStory) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#fff',
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '16px',
      }}
    >
      {getStory()}
    </div>
  );
}
