'use client';

import { useState, useEffect } from 'react';
import { TrendingRepo } from './api/trending/route';
import { TrendingHeader } from './components/TrendingHeader';
import { TrendingFilters } from './components/TrendingFilters';
import { TrendingList } from './components/TrendingList';
import { AnalysisPanel } from './components/AnalysisPanel';

export default function Home() {
  const [repos, setRepos] = useState<TrendingRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [since, setSince] = useState('weekly');
  const [language, setLanguage] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const fetchTrending = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('since', since);
      if (language) {
        params.append('language', language);
      }
      
      const response = await fetch(`/api/trending?${params}`);
      const data = await response.json();
      
      if (data.repos) {
        setRepos(data.repos);
      }
    } catch (error) {
      console.error('Error fetching trending repos:', error);
    } finally {
      setLoading(false);
    }
  };

  const analyzeData = async () => {
    if (repos.length === 0) return;
    
    setAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repos, period: since }),
      });
      
      const analysisData = await response.json();
      setAnalysis(analysisData);
    } catch (error) {
      console.error('Error analyzing data:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, [since, language]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <TrendingHeader />
        
        <TrendingFilters
          since={since}
          setSince={setSince}
          language={language}
          setLanguage={setLanguage}
          onAnalyze={analyzeData}
          analyzing={analyzing}
          hasData={repos.length > 0}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrendingList repos={repos} loading={loading} />
          </div>
          
          <div className="lg:col-span-1">
            <AnalysisPanel analysis={analysis} analyzing={analyzing} />
          </div>
        </div>
      </div>
    </div>
  );
}
