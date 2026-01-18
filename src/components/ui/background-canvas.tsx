import React from 'react';

interface BackgroundCanvasProps {
  title?: string;
  modelUrl?: string;
}

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({
  title = 'Earth Moon',
  modelUrl = 'https://sketchfab.com/models/a148a4fd11e04bdca7b742555580d892/embed?autostart=1&preload=1',
}) => {
  return (
    <div className='absolute inset-0 w-full h-full z-0 overflow-hidden top-0 left-0'>
      <div className='sketchfab-embed-wrapper w-full h-full'>
        <iframe
          title={title}
          frameBorder='0'
          allowFullScreen
          allow='autoplay; fullscreen; xr-spatial-tracking'
          src={modelUrl}
          className='w-full h-full border-none'
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    </div>
  );
};

export default BackgroundCanvas;
