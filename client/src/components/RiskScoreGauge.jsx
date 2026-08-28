import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react';

export const RiskScoreGauge = ({ score = 85, verdict = 'high' }) => {
  const normalizedScore = Math.min(100, Math.max(0, score));

  const getVerdictDetails = (v, s) => {
    if (v === 'high' || s >= 75) {
      return {
        color: '#EF4444',
        label: 'HIGH FRAUD RISK',
        bgColor: 'bg-risk-high/10',
        borderColor: 'border-risk-high/40',
        textColor: 'text-risk-high',
        icon: ShieldAlert,
        description: 'Critical social engineering tactics & cross-channel spoofing identified.'
      };
    }
    if (v === 'medium' || s >= 45) {
      return {
        color: '#F5A623',
        label: 'SUSPICIOUS / MEDIUM RISK',
        bgColor: 'bg-risk-medium/10',
        borderColor: 'border-risk-medium/40',
        textColor: 'text-risk-medium',
        icon: AlertTriangle,
        description: 'Unusual terms or unverified urgency detected. Caution strongly advised.'
      };
    }
    return {
      color: '#22C55E',
      label: 'NORMAL / SAFE (LOW RISK)',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400',
      icon: ShieldCheck,
      description: 'Standard routine notice observed. No fraud or phishing indicators detected.'
    };
  };

  const details = getVerdictDetails(verdict, normalizedScore);
  const Icon = details.icon;

  const data = [
    {
      name: 'Risk Score',
      value: normalizedScore,
      fill: details.color
    }
  ];

  return (
    <div className={`p-6 rounded-2xl border ${details.borderColor} ${details.bgColor} glass-card flex flex-col items-center justify-center relative overflow-hidden text-center`}>
      
      {/* Title Header */}
      <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider text-text-muted mb-2">
        <Icon className={`w-4 h-4 ${details.textColor}`} />
        <span>Unified Forensic Risk Verdict</span>
      </div>

      {/* Gauge Canvas */}
      <div className="w-56 h-56 relative flex items-center justify-center my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="95%"
            barSize={14}
            data={data}
            startAngle={225}
            endAngle={-45}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: '#262A38' }}
              clockWise
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Center Numeric Value Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-5xl font-mono font-extrabold tracking-tight text-text-primary">
            {normalizedScore}
          </span>
          <span className="text-xs font-mono text-text-muted mt-0.5">/ 100 RISK</span>
        </div>
      </div>

      {/* Verdict Badge */}
      <div className={`px-4 py-1.5 rounded-full border ${details.borderColor} ${details.textColor} text-sm font-heading font-bold uppercase tracking-wider mb-2`}>
        {details.label}
      </div>

      <p className="text-xs text-text-secondary max-w-sm">
        {details.description}
      </p>

    </div>
  );
};
