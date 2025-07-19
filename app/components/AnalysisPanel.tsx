import { BarChart3, Loader2, TrendingUp, Code2, Zap } from 'lucide-react';
import { AnalysisData } from '../types/analysis';

interface AnalysisPanelProps {
  analysis: AnalysisData | null;
  analyzing: boolean;
}

export function AnalysisPanel({ analysis, analyzing }: AnalysisPanelProps) {
  if (analyzing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI 趋势分析
          </h3>
        </div>
        
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          <span className="ml-3 text-gray-600 dark:text-gray-300">正在分析数据...</span>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI 趋势分析
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-500 mb-2">
            <TrendingUp className="w-12 h-12 mx-auto mb-3" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            点击上方按钮开始分析
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 分析摘要 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            趋势分析报告
          </h3>
        </div>
        
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans leading-relaxed">
            {analysis.summary}
          </pre>
        </div>
      </div>

      {/* 热门语言统计 */}
      {analysis.topLanguages && analysis.topLanguages.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              热门编程语言
            </h3>
          </div>
          
          <div className="space-y-3">
            {analysis.topLanguages.map(([language, count]: [string, number], index: number) => {
              const percentage = (count / analysis.totalRepos) * 100;
              return (
                <div key={language} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-4">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {language}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {count} 项目 ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 热门框架技术 */}
      {analysis.topFrameworks && analysis.topFrameworks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              热门技术框架
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {analysis.topFrameworks.map(([framework, count]: [string, number]) => (
              <div
                key={framework}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center"
              >
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {count}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {framework}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}