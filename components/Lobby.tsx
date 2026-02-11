import React, { useState } from 'react';
import { Play, Sparkles, Smartphone, Zap } from 'lucide-react';

interface LobbyProps {
  onStartGame: (name: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onStartGame }) => {
  const [nickname, setNickname] = useState('');

  const handleStart = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = nickname.trim();
    if (trimmed) {
      onStartGame(trimmed);
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-12 mb-10 flex flex-col items-center justify-center animate-pop-in">
      
      {/* 화려한 배경 Blob 효과 */}
      <div className="absolute top-0 -left-10 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 -right-10 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute -bottom-16 left-20 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob pointer-events-none" style={{ animationDelay: '4s' }}></div>

      {/* 메인 글래스모피즘 카드 */}
      <div className="relative w-full bg-white/70 backdrop-blur-xl border border-white shadow-2xl rounded-[3rem] p-10 md:p-16 flex flex-col items-center justify-center">
        
        {/* 아이콘 영역 */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-40 animate-pulse rounded-full"></div>
          <div className="relative bg-gradient-to-tr from-indigo-600 to-purple-500 p-6 rounded-[2rem] shadow-lg transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
            <Smartphone size={56} className="text-white" />
            <Sparkles size={24} className="text-yellow-300 absolute -top-3 -right-3 animate-wiggle" />
          </div>
        </div>

        {/* 타이틀 영역 */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-600 drop-shadow-sm tracking-tight leading-tight">
            앱 로고 맞추기
          </h1>
          <p className="text-slate-600 font-bold text-lg md:text-xl bg-white/50 inline-block px-6 py-2 rounded-full shadow-sm border border-white">
            화면 뒤에 숨겨진 앱은 무엇일까요?
          </p>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleStart} className="w-full max-w-sm flex flex-col gap-5 relative z-10">
          <div className="relative group">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="참가자 닉네임 입력"
              maxLength={10}
              autoFocus
              lang="ko"
              spellCheck={false}
              autoComplete="off"
              style={{ imeMode: 'active' } as React.CSSProperties}
              className="w-full px-6 py-5 bg-white shadow-inner border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-2xl text-center font-bold placeholder:text-slate-300 placeholder:font-medium"
            />
            {/* 장식용 아이콘 */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
              <Zap size={24} className={nickname.trim() ? "text-amber-400 animate-pulse" : ""} />
            </div>
          </div>

          <button
            type="submit"
            disabled={!nickname.trim()}
            className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-5 text-2xl font-black text-white shadow-[0_8px_0_rgb(67,56,202)] transition-all active:translate-y-2 active:shadow-[0_0px_0_rgb(67,56,202)] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_8px_0_rgb(67,56,202)] flex justify-center items-center gap-3"
          >
            {/* 호버 시 지나가는 빛 효과 */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <Play size={28} className="group-hover:animate-bounce relative z-10" fill="currentColor" />
            <span className="relative z-10 tracking-wider">게임 시작!</span>
          </button>
        </form>

      </div>
      
      {/* 하단 힌트 텍스트 */}
      <p className="mt-8 text-slate-400 font-bold text-sm animate-pulse">
        Press Enter to start
      </p>

      {/* 빛 효과용 CSS (shimmer) */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Lobby;