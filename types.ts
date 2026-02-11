import React from 'react';

export type GameState = 'LOBBY' | 'PLAYING' | 'ENDED';

export interface Player {
  id: string;
  name: string;
  score: number;
}

export interface AppInfo {
  id: string;
  names: string[];
  component: React.FC;
}

export interface HOFEntry {
  id: string;
  name: string;
  score: number;
  date: string;
}