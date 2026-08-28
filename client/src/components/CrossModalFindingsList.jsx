import React from 'react';
import { Network, ArrowRightLeft, Mic, FileImage, FileText, AlertTriangle } from 'lucide-react';

export const CrossModalFindingsList = ({ findings = [] }) => {
  if (!findings || findings.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-base-border bg-base-surface text-center">
        <p className="text-sm text-text-muted">No cross-modal contradictions or linked findings detected.</p>
      </div>
    );
  }

  // Detect referenced modalities for visual icon motif
  const getModalityIcons = (text) => {
    const lower = text.toLowerCase();
    const icons = [];
    if (lower.includes('call') || lower.includes('audio') || lower.includes('verbal') || lower.includes('phone')) {
      icons.push({ type: 'audio', label: 'Audio Call', icon: Mic });
    }
    if (lower.includes('screenshot') || lower.includes('sms') || lower.includes('image') || lower.includes('link') || lower.includes('domain')) {
      icons.push({ type: 'image', label: 'Screenshot', icon: FileImage });
    }
    if (lower.includes('document') || lower.includes('pdf') || lower.includes('clause') || lower.includes('terms') || lower.includes('contract')) {
      icons.push({ type: 'document', label: 'Document', icon: FileText });
    }
    
    // Default if not detected
    if (icons.length < 2) {
      if (!icons.some(i => i.type === 'audio')) icons.push({ type: 'audio', label: 'Audio Call', icon: Mic });
      if (!icons.some(i => i.type === 'image')) icons.push({ type: 'image', label: 'Screenshot', icon: FileImage });
    }
    return icons.slice(0, 2);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Network className="w-5 h-5 text-accent-primary" />
          <h4 className="font-heading font-bold text-lg text-text-primary">Cross-Modal Forensic Findings</h4>
        </div>
        <span className="text-xs font-mono text-accent-primary bg-accent-primary/10 border border-accent-primary/20 px-2.5 py-1 rounded-full">
          {findings.length} Connected Signals
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {findings.map((finding, idx) => {
          const [mod1, mod2] = getModalityIcons(finding);
          const Icon1 = mod1?.icon || Mic;
          const Icon2 = mod2?.icon || FileImage;

          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-risk-high/30 bg-base-surface/90 hover:bg-base-surfaceRaised transition-colors duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Connecting Icon Motif */}
              <div className="flex items-center space-x-2 shrink-0 bg-base-void/80 px-3 py-2 rounded-lg border border-base-border">
                <div className="flex items-center space-x-1.5 text-xs font-mono text-text-secondary">
                  <Icon1 className="w-4 h-4 text-accent-primary" />
                  <span className="hidden sm:inline">{mod1?.label}</span>
                </div>
                <ArrowRightLeft className="w-3.5 h-3.5 text-risk-high animate-pulse mx-1" />
                <div className="flex items-center space-x-1.5 text-xs font-mono text-text-secondary">
                  <Icon2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">{mod2?.label}</span>
                </div>
              </div>

              {/* Finding Description */}
              <div className="flex-1">
                <p className="text-sm text-text-primary leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-risk-high inline-block mr-2 -mt-0.5" />
                  {finding}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
