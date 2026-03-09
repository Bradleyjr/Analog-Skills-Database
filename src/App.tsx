/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Download, Copy, Check, Terminal, Cpu, Network, Database, Shield, Zap, Play, Power } from 'lucide-react';
import { SKILLS } from './skillsData';

class SoundManager {
  private ctx: AudioContext | null = null;
  public volume: number = 0.5;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick(pitchOffset = 0) {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Short, sharp click
    osc.type = 'square';
    osc.frequency.setValueAtTime(150 + pitchOffset, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40 + pitchOffset, this.ctx.currentTime + 0.02);
    
    gain.gain.setValueAtTime(0.1 * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01 * this.volume, this.ctx.currentTime + 0.02);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.02);
  }

  playSnap(pitchOffset = 0) {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300 + pitchOffset, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100 + pitchOffset, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.15 * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01 * this.volume, this.ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }
  
  playSliderTick(pitchOffset = 0) {
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800 + pitchOffset, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400 + pitchOffset, this.ctx.currentTime + 0.01);
    
    gain.gain.setValueAtTime(0.05 * this.volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01 * this.volume, this.ctx.currentTime + 0.01);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.01);
  }
}

const sounds = new SoundManager();

const SCREEN_MODES = [
  { bg: 'bg-[#c4c4c4]', text: 'text-[#333]', border: 'border-[#b0b0b0]' },
  { bg: 'bg-[#0f291e]', text: 'text-[#4ade80]', border: 'border-[#06140e]' },
  { bg: 'bg-[#29150f]', text: 'text-[#fb923c]', border: 'border-[#140a06]' }
];

export default function App() {
  const [selectedSkillId, setSelectedSkillId] = useState<string>(SKILLS[0].id);
  const [copied, setCopied] = useState(false);
  const [sliderPos, setSliderPos] = useState(20);
  const [knobAngle, setKnobAngle] = useState(135); // Middle volume
  const [screenModeIdx, setScreenModeIdx] = useState(0);
  const [powerOn, setPowerOn] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runLog, setRunLog] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const lastScrollTop = useRef(0);
  const selectedSkill = SKILLS.find(s => s.id === selectedSkillId) || SKILLS[0];
  const selectedSkillRef = useRef(selectedSkill);
  
  useEffect(() => { selectedSkillRef.current = selectedSkill; }, [selectedSkill]);

  const currentMode = SCREEN_MODES[screenModeIdx];
  const codeFontSize = 10 + ((100 - sliderPos) / 100) * 14; // 10px to 24px

  // Syntax Highlighter
  const highlightCode = (code: string) => {
    if (!code) return '';
    return code
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\b(async|function|const|let|var|return|if|throw|new|await)\b/g, '<span class="opacity-60 font-bold">$1</span>')
      .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="opacity-80 italic">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="opacity-90">$1</span>');
  };

  // Run Simulation
  const handleRun = () => {
    if (!powerOn || isBooting || isRunning) return;
    sounds.playSnap(-20);
    setIsRunning(true);
    setRunLog(['> INITIALIZING SKILL ENVIRONMENT...', '> ALLOCATING MEMORY...']);
    
    let step = 0;
    const steps = [
      `> EXECUTING: ${selectedSkillRef.current.name.toUpperCase()}`,
      '> CONNECTING TO SECURE ENCLAVE...',
      '> AUTHENTICATION SUCCESSFUL.',
      '> PROCESSING DATA STREAM...',
      '> [██████████░░░░] 64%',
      '> [██████████████] 100%',
      '> OPERATION COMPLETED SUCCESSFULLY.',
      '> TERMINATING PROCESS...'
    ];
    
    const interval = setInterval(() => {
      if (step < steps.length) {
        sounds.playSliderTick(Math.random() * 200 - 100);
        setRunLog(prev => [...prev, steps[step]]);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsRunning(false), 1500);
      }
    }, 300);
  };

  const togglePower = () => {
    sounds.playSnap(-50);
    if (powerOn) {
      setPowerOn(false);
      setIsRunning(false);
    } else {
      setPowerOn(true);
      setIsBooting(true);
      setTimeout(() => setIsBooting(false), 1200);
    }
  };

  // Update sound volume when knob changes
  useEffect(() => {
    sounds.volume = knobAngle / 270;
  }, [knobAngle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!powerOn || isBooting) return;
      
      if (e.key >= '1' && e.key <= '6') {
        const idx = parseInt(e.key) - 1;
        if (SKILLS[idx]) {
          setSelectedSkillId(SKILLS[idx].id);
          setActiveKey(SKILLS[idx].id);
          sounds.playClick(Math.random() * 40 - 20);
          setTimeout(() => setActiveKey(null), 150);
        }
      }
      
      if (e.key.toLowerCase() === 'c') { handleCopy(); setActiveKey('copy'); setTimeout(() => setActiveKey(null), 150); }
      if (e.key.toLowerCase() === 's') { handleDownload(); setActiveKey('save'); setTimeout(() => setActiveKey(null), 150); }
      if (e.key.toLowerCase() === 'r') { handleRun(); setActiveKey('run'); setTimeout(() => setActiveKey(null), 150); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [powerOn, isBooting, isRunning]);

  const handleKnobMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startAngle = knobAngle;
    
    const move = (moveEvent: MouseEvent) => {
      const deltaY = startY - moveEvent.clientY;
      let newAngle = startAngle + deltaY * 2;
      newAngle = Math.max(0, Math.min(270, newAngle));
      setKnobAngle(newAngle);
    };
    
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (Math.abs(scrollTop - lastScrollTop.current) > 30) {
      sounds.playSliderTick(Math.random() * 50 - 25);
      lastScrollTop.current = scrollTop;
    }
  };

  const handleCopy = () => {
    if (!powerOn || isBooting) return;
    sounds.playSnap(Math.random() * 20 - 10);
    navigator.clipboard.writeText(selectedSkillRef.current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!powerOn || isBooting) return;
    sounds.playSnap(Math.random() * 20 - 10);
    const blob = new Blob([selectedSkillRef.current.code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedSkillRef.current.name.replace(/\\s+/g, '_').toLowerCase()}.ts`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#e4e4e4] flex items-center justify-center p-4 sm:p-8 font-sans text-[#222]">
      {/* Main Device Container */}
      <div className="flex flex-col sm:flex-row rounded-[20px] overflow-hidden device-light bg-noise max-w-4xl w-full">
        
        {/* Left Panel - Dark Controls */}
        <div className="w-full sm:w-24 bg-[#4a4a4c] flex sm:flex-col items-center justify-between py-4 sm:py-6 px-4 shadow-[inset_-2px_0_10px_rgba(0,0,0,0.2)] z-10 relative border-b sm:border-b-0 sm:border-r border-[#333] gap-4 sm:gap-0">
          {/* Top Screws */}
          <div className="hidden sm:flex w-full justify-between px-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full screw-head flex items-center justify-center"><div className="w-1.5 h-0.5 bg-[#333] rotate-45"></div></div>
            <div className="w-2.5 h-2.5 rounded-full screw-head flex items-center justify-center"><div className="w-1.5 h-0.5 bg-[#333] -rotate-12"></div></div>
          </div>

          {/* Power Button */}
          <div className="flex flex-col items-center gap-2 sm:mb-6">
            <div className={`led red ${powerOn ? 'on' : ''}`}></div>
            <button 
              onMouseDown={togglePower}
              className={`w-8 h-8 rounded-full btn-tactile-dark flex items-center justify-center ${!powerOn ? 'active' : ''}`}
            >
              <Power size={14} className={powerOn ? 'text-red-400' : 'engraved-icon'} />
            </button>
            <span className="engraved-text">PWR</span>
          </div>

          {/* Knob */}
          <div className="flex flex-col items-center gap-2 sm:mb-6">
            <div 
              className="relative w-12 h-12 rounded-full slider-knob flex items-center justify-center cursor-ns-resize group"
              onMouseDown={handleKnobMouseDown}
              style={{ transform: `rotate(${knobAngle - 135}deg)` }}
            >
              <div className="absolute inset-1 rounded-full border border-[#555] opacity-50"></div>
              <div className="w-1.5 h-3 bg-[#222] rounded-full absolute top-1.5 shadow-inner"></div>
              {/* Knob ridges */}
              <div className="absolute inset-0 rounded-full bg-[repeating-conic-gradient(transparent_0_4deg,#888_4deg_5deg)] opacity-30 mix-blend-multiply"></div>
            </div>
            <span className="engraved-text">VOL</span>
          </div>

          {/* Slider */}
          <div className="hidden sm:flex flex-col items-center gap-2 flex-1 w-full py-4">
            <div className="w-1.5 h-full slider-track rounded-full relative">
              <div 
                className="absolute w-6 h-6 bg-[#c4c4c4] rounded-full -left-[9px] cursor-ns-resize border border-[#999] shadow-[1px_2px_3px_rgba(0,0,0,0.5),inset_0_1.5px_1px_rgba(255,255,255,0.9),inset_0_-1px_1px_rgba(0,0,0,0.2)]"
                style={{ top: `calc(${sliderPos}% - 12px)` }}
                onMouseDown={(e) => {
                  const track = e.currentTarget.parentElement;
                  if (!track) return;
                  
                  const move = (moveEvent: MouseEvent) => {
                    const rect = track.getBoundingClientRect();
                    let newPos = ((moveEvent.clientY - rect.top) / rect.height) * 100;
                    newPos = Math.max(0, Math.min(100, newPos));
                    
                    // Play tick sound if moved enough
                    setSliderPos(prev => {
                      if (Math.abs(prev - newPos) > 2) {
                        sounds.playSliderTick(Math.random() * 50 - 25);
                      }
                      return newPos;
                    });
                  };
                  const up = () => {
                    window.removeEventListener('mousemove', move);
                    window.removeEventListener('mouseup', up);
                  };
                  
                  window.addEventListener('mousemove', move);
                  window.addEventListener('mouseup', up);
                }}
              >
                <div className="w-full h-[1px] bg-[#222] absolute top-1/2 -translate-y-1/2 opacity-30"></div>
              </div>
            </div>
            <span className="engraved-text mt-4">ZOOM</span>
          </div>

          {/* Bottom Button */}
          <div className="flex flex-col items-center gap-2 sm:mt-4">
            <button 
              onMouseDown={() => {
                if (!powerOn) return;
                sounds.playClick();
                setScreenModeIdx((prev) => (prev + 1) % SCREEN_MODES.length);
              }}
              className="w-10 h-6 rounded-md btn-tactile mt-2 flex items-center justify-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_2px_rgba(255,255,255,0.8)]"></div>
            </button>
            <span className="engraved-text">MODE</span>
          </div>

          {/* Bottom Screws */}
          <div className="hidden sm:flex w-full justify-between px-2 mt-4">
            <div className="w-2.5 h-2.5 rounded-full screw-head flex items-center justify-center"><div className="w-1.5 h-0.5 bg-[#333] rotate-90"></div></div>
            <div className="w-2.5 h-2.5 rounded-full screw-head flex items-center justify-center"><div className="w-1.5 h-0.5 bg-[#333] rotate-180"></div></div>
          </div>
        </div>

        {/* Right Panel - Light */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col gap-8 min-w-0">
          
          {/* Screen Area */}
          <div className="screen-recessed p-3 rounded-xl h-64 sm:h-80 flex flex-col min-w-0">
            <div className={`screen-inner flex-1 rounded-lg p-4 flex flex-col font-mono text-sm relative overflow-hidden min-w-0 ${powerOn ? 'screen-on' : 'screen-off'}`}>
              {/* Screen grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4px_4px] pointer-events-none z-20"></div>
              
              {isBooting ? (
                <div className={`flex-1 ${currentMode.bg} ${currentMode.text} rounded p-3 flex flex-col justify-center items-center z-10`}>
                  <div className="animate-pulse">OP-SKILL OS v1.0.4</div>
                  <div className="text-xs opacity-50 mt-2">INITIALIZING...</div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight uppercase text-[#333] flex items-center gap-2">
                        {selectedSkill.icon}
                        {selectedSkill.name}
                      </h2>
                      <p className="text-xs text-[#555] mt-1 max-w-md">{selectedSkill.description}</p>
                    </div>
                    <div className="text-[10px] text-[#666] uppercase tracking-widest">
                      ID: {selectedSkill.id}
                    </div>
                  </div>
                  
                  <div 
                    className={`flex-1 ${currentMode.bg} rounded p-3 overflow-auto shadow-inner border ${currentMode.border} relative z-10 transition-colors duration-300 min-w-0 analog-scrollbar`}
                    onScroll={handleScroll}
                  >
                    {isRunning ? (
                      <div className={`${currentMode.text} leading-relaxed text-xs`}>
                        {runLog.map((log, i) => (
                          <div key={i} className="mb-1">{log}</div>
                        ))}
                        <div className="animate-pulse mt-2">_</div>
                      </div>
                    ) : (
                      <pre className={`${currentMode.text} leading-relaxed transition-all duration-100`} style={{ fontSize: `${codeFontSize}px` }}>
                        <code dangerouslySetInnerHTML={{ __html: highlightCode(selectedSkill.code) }} />
                      </pre>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Controls Area */}
          <div className="flex flex-col sm:flex-row gap-6 h-auto sm:h-[320px]">
            
            {/* Numpad-style Grid */}
            <div className="flex-1 overflow-y-auto analog-scrollbar pr-4 h-[320px] sm:h-full">
              <div className="grid grid-cols-3 gap-3">
                {SKILLS.map((skill, i) => (
                  <button
                    key={skill.id}
                    onMouseDown={() => {
                      if (!powerOn || isBooting) return;
                      sounds.playClick();
                      setSelectedSkillId(skill.id);
                    }}
                    className={`btn-tactile h-14 rounded-lg flex flex-col items-center justify-center gap-1 relative ${selectedSkillId === skill.id || activeKey === skill.id ? 'active' : ''}`}
                  >
                    <span className="engraved-icon">{skill.icon}</span>
                    <span className="engraved-text truncate w-full text-center px-1">{skill.name.split(' ')[0]}</span>
                    {/* Small indicator dot */}
                    {selectedSkillId === skill.id && (
                      <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#e85d04]"></div>
                    )}
                  </button>
                ))}
                
                {/* Empty decorative slots to fill grid if needed */}
                {Array.from({ length: SKILLS.length % 3 === 0 ? 0 : 3 - (SKILLS.length % 3) }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-14 rounded-lg bg-[#bcbcbc] shadow-[inset_0px_3px_4px_rgba(0,0,0,0.2),inset_1px_0px_3px_rgba(0,0,0,0.1)] border border-[#999] flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-[#a0a0a0] rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex sm:flex-col gap-4 w-full sm:w-24 items-center justify-center">
              
              <div className="flex flex-col items-center gap-2">
                <div className={`led green ${isRunning ? 'on' : ''}`}></div>
                <button 
                  onClick={() => { handleRun(); setActiveKey('run'); setTimeout(() => setActiveKey(null), 150); }}
                  className={`btn-tactile w-14 h-14 rounded-full flex items-center justify-center text-[#444] ${activeKey === 'run' ? 'active' : ''}`}
                >
                  <Play size={18} className={isRunning ? 'text-green-600' : 'engraved-icon'} />
                </button>
                <span className="engraved-text">Run</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className={`led orange ${copied ? 'on' : ''}`}></div>
                <button 
                  onClick={() => { handleCopy(); setActiveKey('copy'); setTimeout(() => setActiveKey(null), 150); }}
                  className={`btn-tactile w-14 h-14 rounded-full flex items-center justify-center text-[#444] ${activeKey === 'copy' ? 'active' : ''}`}
                >
                  {copied ? <Check size={18} className="text-orange-500" /> : <Copy size={18} className="engraved-icon" />}
                </button>
                <span className="engraved-text">{copied ? 'Copied' : 'Copy'}</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="led red"></div>
                <button 
                  onClick={() => { handleDownload(); setActiveKey('save'); setTimeout(() => setActiveKey(null), 150); }}
                  className={`btn-tactile w-14 h-14 rounded-full flex items-center justify-center text-[#f96302] ${activeKey === 'save' ? 'active' : ''}`}
                >
                  <Download size={18} className="engraved-icon" />
                </button>
                <span className="engraved-text">Save</span>
              </div>
            </div>

          </div>
          
          {/* Decorative branding */}
          <div className="flex justify-between items-end mt-2">
            <div className="engraved-text font-mono">
              OP-SKILL // v1.0.4
            </div>
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-[#a0a0a0] rounded-sm"></div>
              <div className="w-1 h-3 bg-[#a0a0a0] rounded-sm"></div>
              <div className="w-1 h-3 bg-[#a0a0a0] rounded-sm"></div>
              <div className="w-1 h-3 bg-[#e85d04] rounded-sm"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

