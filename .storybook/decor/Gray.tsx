import React from 'react';

export default function GrayDecorator(getStory) {
  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: '#F1F3F5',
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
