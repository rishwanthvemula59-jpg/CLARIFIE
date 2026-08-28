import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { ReportPreview } from '../components/ReportPreview';

export const ReportView = () => {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosClient.get(`/cases/${id}/report`);
        setReportData(res.data.report);
        setCaseData(res.data.case);
      } catch (err) {
        setError('Failed to generate incident report');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4 font-mono text-text-muted">
        <Sparkles className="w-8 h-8 text-accent-primary animate-spin mx-auto" />
        <p>Formatting official incident forensics report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          <AlertCircle className="w-6 h-6 mx-auto mb-2" />
          <span>{error}</span>
        </div>
        <Link to={`/cases/${id}`} className="inline-flex items-center space-x-2 text-accent-primary text-sm font-medium hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Analysis</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link to={`/cases/${id}`} className="inline-flex items-center space-x-1 text-xs font-mono text-text-muted hover:text-text-primary no-print">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Case Analysis</span>
      </Link>

      <ReportPreview reportData={reportData} caseData={caseData} />
    </div>
  );
};
