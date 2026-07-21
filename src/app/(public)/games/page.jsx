import React from 'react';
import GamesPageClient from './GamesPageClient';

export const metadata = {
  title: 'Games - AppInfoHub',
  description:
    'Find the best Android and desktop games, download safe APKs, and read game reviews with AppInfoHub. Explore action, puzzle, racing, and more categories.',
};

export default function GamesPage() {
  return <GamesPageClient />;
}