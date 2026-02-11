import React, { useState, useCallback, useEffect } from 'react';
import { GameState, Player, AppInfo } from './types';
import { APPS_DATA } from './constants';
import Lobby from './components/Lobby';
import GameBoard from './components/GameBoard';
import Podium from './components/Podium';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('LOBBY');
  const [leaderboard, setLeaderboard] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [gameApps, setGameApps] = useState<AppInfo[]>([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);

  // 초기 마운트 시 저장된 명예의 전당 데이터 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('appLogoHOF');
    if (stored) {
      setLeaderboard(JSON.parse(stored));
    }
  }, []);

  const updateLeaderboard = useCallback((player: Player) => {
    setLeaderboard(prev => {
      let newBoard = [...prev];
      const existingIdx = newBoard.findIndex(p => p.name === player.name);
      
      if (existingIdx >= 0) {
        if (player.score > newBoard[existingIdx].score) {
          newBoard[existingIdx] = player;
        }
      } else {
        newBoard.push(player);
      }
      
      // 점수 내림차순 정렬 후 최대 10명까지만 유지
      newBoard.sort((a, b) => b.score - a.score);
      newBoard = newBoard.slice(0, 10);
      
      localStorage.setItem('appLogoHOF', JSON.stringify(newBoard));
      return newBoard;
    });
  }, []);

  const handleStartGame = useCallback((playerName: string) => {
    const newPlayer = { id: crypto.randomUUID(), name: playerName, score: 0 };
    setCurrentPlayer(newPlayer);
    
    // 전체 앱 중에서 무작위로 섞습니다.
    const shuffledApps = [...APPS_DATA];
    for (let i = shuffledApps.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledApps[i], shuffledApps[j]] = [shuffledApps[j], shuffledApps[i]];
    }
    
    // 7개의 퍼즐 라운드를 뽑습니다.
    setGameApps(shuffledApps.slice(0, 7)); 
    setCurrentRoundIndex(0);
    setGameState('PLAYING');
  }, []);

  const handleCorrectAnswer = useCallback((playerId: string, points: number) => {
    setCurrentPlayer(prev => {
      if (!prev || prev.id !== playerId) return prev;
      const updated = { ...prev, score: prev.score + points };
      updateLeaderboard(updated); // 점수가 오를 때마다 리더보드 즉시 업데이트
      return updated;
    });
  }, [updateLeaderboard]);

  const handleNextRound = useCallback(() => {
    if (currentRoundIndex + 1 < gameApps.length) {
      setCurrentRoundIndex(prev => prev + 1);
    } else {
      setGameState('ENDED');
    }
  }, [currentRoundIndex, gameApps.length]);

  const handleRestart = useCallback(() => {
    setGameState('LOBBY');
  }, []);

  // 화면에 표시할 플레이어 목록: Top 10 + (순위권에 없는 현재 플레이어)
  const displayPlayers = [...leaderboard];
  if (currentPlayer && !displayPlayers.some(p => p.id === currentPlayer.id)) {
    displayPlayers.push(currentPlayer);
  }

  return (
    <div className="min-h-screen py-4 px-4 flex flex-col items-center justify-center">
      {gameState === 'LOBBY' && (
        <Lobby 
          onStartGame={handleStartGame} 
        />
      )}
      
      {gameState === 'PLAYING' && gameApps.length > 0 && (
        <div className="w-full max-w-6xl animate-pop-in">
          <GameBoard 
            currentApp={gameApps[currentRoundIndex]}
            roundIndex={currentRoundIndex}
            totalRounds={7} // UI상으로 총 7라운드 표시
            players={displayPlayers}
            selectedPlayerId={currentPlayer?.id || null}
            onCorrectAnswer={handleCorrectAnswer}
            onNextRound={handleNextRound}
          />
        </div>
      )}

      {gameState === 'ENDED' && (
        <div className="w-full animate-pop-in flex justify-center items-center h-[calc(100vh-2rem)]">
           <Podium 
             players={displayPlayers} 
             currentPlayerId={currentPlayer?.id} 
             onRestart={handleRestart} 
           />
        </div>
      )}
    </div>
  );
};

export default App;