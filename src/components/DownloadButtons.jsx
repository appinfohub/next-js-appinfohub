

import React from "react";

const DownloadButtons = ({ playUrl, appStoreUrl, isDesktop }) => (
  <div className="flex gap-4 my-6 justify-center">
    {isDesktop ? (
      <a
        href={playUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg shadow transition"
        style={{ textDecoration: 'none' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 mr-3"><path d="M2 4.75A2.75 2.75 0 0 1 4.75 2h6.5v9.25H2V4.75ZM2 12.75v6.5A2.75 2.75 0 0 0 4.75 22h6.5v-9.25H2Zm10.5 9.25h6.75A2.75 2.75 0 0 0 22 19.25v-6.5H12.5V22Zm9.25-9.25V4.75A2.75 2.75 0 0 0 19.25 2H12.5v9.25H21.75Z" /></svg>
        Free Download for Windows
      </a>
    ) : (
      <>
        {playUrl && (
          <a
            href={playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-14 md:h-16 w-auto"
            />
          </a>
        )}
        <a
          href={appStoreUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block${!appStoreUrl ? ' pointer-events-none opacity-50' : ''}`}
          tabIndex={appStoreUrl ? 0 : -1}
        >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-14 md:h-16 w-auto"
          />
        </a>
      </>
    )}
  </div>
);

export default DownloadButtons;

