import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, FileImage, FileText, Cpu, CheckCircle2, ShieldAlert, Zap } from 'lucide-react';

export const FusionConvergenceAnimation = ({ caseData, evidenceTypes = ['audio', 'image', 'document'], onComplete }) => {
  const [stage, setStage] = useState('analyzing'); // 'analyzing' | 'converging' | 'fused'
  const [completedNodes, setCompletedNodes] = useState([]);

  const hasAudio = evidenceTypes.includes('audio') || Boolean(caseData?.audio_transcript || caseData?.audio_flags);
  const hasImage = evidenceTypes.includes('image') || Boolean(caseData?.image_description || caseData?.image_flags);
  const hasDoc = evidenceTypes.includes('document') || Boolean(caseData?.document_text || caseData?.document_flags);

  useEffect(() => {
    // Step 1: Simulate or trigger stage progress
    const timer1 = setTimeout(() => {
      setCompletedNodes((prev) => [...prev, 'audio']);
    }, 1200);

    const timer2 = setTimeout(() => {
      setCompletedNodes((prev) => [...prev, 'image']);
    }, 2400);

    const timer3 = setTimeout(() => {
      setCompletedNodes((prev) => [...prev, 'document']);
    }, 3600);

    const timer4 = setTimeout(() => {
      setStage('converging');
    }, 4200);

    const timer5 = setTimeout(() => {
      setStage('fused');
      if (onComplete) onComplete();
    }, 5600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [onComplete]);

  const getNodeColor = (type, score) => {
    if (score >= 75) return 'border-risk-high text-risk-high bg-risk-highGlow';
    if (score >= 45) return 'border-risk-medium text-risk-medium bg-risk-mediumGlow';
    return 'border-risk-low text-risk-low bg-risk-lowGlow';
  };

  return (
    <div className="relative w-full py-12 px-6 glass-card rounded-2xl border border-base-border overflow-hidden">
      
      {/* Background Animated Radar Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,127,255,0.08)_0,transparent_70%)] pointer-events-none" />

      {/* Header Banner */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-mono mb-3">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>FUSION ENGINE FORENSIC PROCESSOR</span>
        </div>
        <h3 className="text-2xl font-heading font-bold text-text-primary">
          {stage === 'analyzing' && 'Step 1: Parallel Gemini Modality Inspections'}
          {stage === 'converging' && 'Step 2: Cross-Modal Neural Synthesis & Correlation'}
          {stage === 'fused' && 'Forensic Fusion Complete — Verdict Rendered'}
        </h3>
        <p className="text-sm text-text-secondary mt-1 max-w-xl mx-auto">
          {stage === 'analyzing' && 'Analyzing isolated red flags in telephonic audio, screenshots, and contracts in parallel.'}
          {stage === 'converging' && 'Cross-referencing channel mismatches, identity spoofing, and contradictory terms.'}
          {stage === 'fused' && 'Unified risk verdict synthesized from all active evidence streams.'}
        </p>
      </div>

      {/* Animation Stage Canvas */}
      <div className="relative h-72 w-full max-w-2xl mx-auto flex items-center justify-between px-4">

        {/* Connecting Lines (SVG paths) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Audio to Center line */}
          {hasAudio && (
            <motion.line
              x1="20%"
              y1="30%"
              x2="50%"
              y2="50%"
              stroke="#5B7FFF"
              strokeWidth={stage === 'converging' || stage === 'fused' ? "3" : "1.5"}
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{
                pathLength: 1,
                opacity: stage === 'converging' ? 1 : 0.4
              }}
              transition={{ duration: 1.5, repeat: stage === 'converging' ? Infinity : 0 }}
            />
          )}

          {/* Image to Center line */}
          {hasImage && (
            <motion.line
              x1="20%"
              y1="70%"
              x2="50%"
              y2="50%"
              stroke="#5B7FFF"
              strokeWidth={stage === 'converging' || stage === 'fused' ? "3" : "1.5"}
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{
                pathLength: 1,
                opacity: stage === 'converging' ? 1 : 0.4
              }}
              transition={{ duration: 1.5, repeat: stage === 'converging' ? Infinity : 0 }}
            />
          )}

          {/* Document to Center line */}
          {hasDoc && (
            <motion.line
              x1="80%"
              y1="50%"
              x2="50%"
              y2="50%"
              stroke="#5B7FFF"
              strokeWidth={stage === 'converging' || stage === 'fused' ? "3" : "1.5"}
              strokeDasharray="6 4"
              initial={{ pathLength: 0, opacity: 0.3 }}
              animate={{
                pathLength: 1,
                opacity: stage === 'converging' ? 1 : 0.4
              }}
              transition={{ duration: 1.5, repeat: stage === 'converging' ? Infinity : 0 }}
            />
          )}
        </svg>

        {/* Left Side Modality Nodes */}
        <div className="flex flex-col space-y-12 z-10 w-44">
          
          {/* Audio Node */}
          {hasAudio && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: stage === 'converging' ? [1, 0.9, 1] : 1,
                x: stage === 'converging' ? 40 : 0,
                opacity: 1
              }}
              transition={{ duration: 0.5 }}
              className={`p-4 rounded-xl border flex items-center space-x-3 backdrop-blur-md ${
                completedNodes.includes('audio') || caseData?.audio_risk_score !== undefined
                  ? getNodeColor('audio', caseData?.audio_risk_score || 92)
                  : 'border-base-border text-text-secondary bg-base-surface/80 animate-pulse-glow'
              }`}
            >
              <div className="p-2 rounded-lg bg-base-void/60">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-heading font-semibold text-text-primary">Audio Call</div>
                <div className="text-[10px] font-mono">
                  {completedNodes.includes('audio') || caseData?.audio_risk_score !== undefined ? (
                    <span className="font-bold">Risk: {caseData?.audio_risk_score || 92}/100</span>
                  ) : (
                    <span className="text-accent-primary animate-pulse">Analyzing...</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Image Node */}
          {hasImage && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: stage === 'converging' ? [1, 0.9, 1] : 1,
                x: stage === 'converging' ? 40 : 0,
                opacity: 1
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`p-4 rounded-xl border flex items-center space-x-3 backdrop-blur-md ${
                completedNodes.includes('image') || caseData?.image_risk_score !== undefined
                  ? getNodeColor('image', caseData?.image_risk_score || 89)
                  : 'border-base-border text-text-secondary bg-base-surface/80 animate-pulse-glow'
              }`}
            >
              <div className="p-2 rounded-lg bg-base-void/60">
                <FileImage className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-heading font-semibold text-text-primary">Screenshot</div>
                <div className="text-[10px] font-mono">
                  {completedNodes.includes('image') || caseData?.image_risk_score !== undefined ? (
                    <span className="font-bold">Risk: {caseData?.image_risk_score || 89}/100</span>
                  ) : (
                    <span className="text-accent-primary animate-pulse">Analyzing...</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Central Fusion Node */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <motion.div
            animate={{
              rotate: stage === 'converging' ? 360 : 0,
              scale: stage === 'fused' ? [0.9, 1.15, 1] : stage === 'converging' ? [1, 1.1, 1] : 1
            }}
            transition={{
              rotate: { duration: 3, repeat: stage === 'converging' ? Infinity : 0, ease: 'linear' },
              scale: { duration: 0.6 }
            }}
            className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-2 shadow-2xl backdrop-blur-xl ${
              stage === 'fused'
                ? caseData?.fused_verdict === 'high' || !caseData
                  ? 'border-risk-high bg-risk-high/15 shadow-glow-risk-high text-risk-high'
                  : 'border-accent-primary bg-accent-primary/15 shadow-glow-primary text-accent-primary'
                : 'border-accent-primary bg-base-surfaceRaised/90 text-accent-primary shadow-glow-primary'
            }`}
          >
            <Cpu className={`w-8 h-8 mb-1 ${stage === 'converging' ? 'animate-bounce' : ''}`} />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase">FUSION</span>
          </motion.div>

          {/* Fused Risk Output Badge when complete */}
          <AnimatePresence>
            {stage === 'fused' && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute top-28 whitespace-nowrap bg-base-surfaceRaised border border-risk-high/40 px-4 py-1.5 rounded-full shadow-lg flex items-center space-x-2"
              >
                <ShieldAlert className="w-4 h-4 text-risk-high" />
                <span className="text-xs font-mono font-bold text-text-primary">
                  FUSED SCORE: <span className="text-risk-high text-sm font-extrabold">{caseData?.fused_risk_score || 94}/100</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Document Node */}
        <div className="flex flex-col space-y-12 z-10 w-44">
          {hasDoc && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: stage === 'converging' ? [1, 0.9, 1] : 1,
                x: stage === 'converging' ? -40 : 0,
                opacity: 1
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`p-4 rounded-xl border flex items-center space-x-3 backdrop-blur-md ${
                completedNodes.includes('document') || caseData?.document_risk_score !== undefined
                  ? getNodeColor('document', caseData?.document_risk_score || 84)
                  : 'border-base-border text-text-secondary bg-base-surface/80 animate-pulse-glow'
              }`}
            >
              <div className="p-2 rounded-lg bg-base-void/60">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-heading font-semibold text-text-primary">Document PDF</div>
                <div className="text-[10px] font-mono">
                  {completedNodes.includes('document') || caseData?.document_risk_score !== undefined ? (
                    <span className="font-bold">Risk: {caseData?.document_risk_score || 84}/100</span>
                  ) : (
                    <span className="text-accent-primary animate-pulse">Analyzing...</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
};
