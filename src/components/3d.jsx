import React from 'react';

const SketchfabEmbed = () => {
  return (
    <div className="sketchfab-embed-wrapper">
      <iframe
        title="Planet Earth 3D Globe"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        src="https://sketchfab.com/models/e60536d944b04294821074e1e8cd338e/embed?ui_theme=dark"
      ></iframe>
      <p
        style={{
          fontSize: '13px',
          fontWeight: 'normal',
          margin: '5px',
          color: '#4A4A4A',
        }}
      >
        <a
          href="https://sketchfab.com/3d-models/planet-earth-3d-globe-e60536d944b04294821074e1e8cd338e?utm_medium=embed&utm_campaign=share-popup&utm_content=e60536d944b04294821074e1e8cd338e"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Planet Earth 3D Globe
        </a>{' '}
        by{' '}
        <a
          href="https://sketchfab.com/v7x?utm_medium=embed&utm_campaign=share-popup&utm_content=e60536d944b04294821074e1e8cd338e"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          v7x
        </a>{' '}
        on{' '}
        <a
          href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=e60536d944b04294821074e1e8cd338e"
          target="_blank"
          rel="nofollow"
          style={{ fontWeight: 'bold', color: '#1CAAD9' }}
        >
          Sketchfab
        </a>
      </p>
    </div>
  );
};

export default SketchfabEmbed;
