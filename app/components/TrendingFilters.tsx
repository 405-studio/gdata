import { Calendar, Code, BarChart3 } from 'lucide-react';

interface TrendingFiltersProps {
  since: string;
  setSince: (since: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onAnalyze: () => void;
  analyzing: boolean;
  hasData: boolean;
}

const POPULAR_LANGUAGES = [
  '', 'JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Vue', 'React'
];

const PERIODS = [
  { value: 'daily', label: '今日' },
  { value: 'weekly', label: '本周' },
  { value: 'monthly', label: '本月' }
];

export function TrendingFilters({
  since,
  setSince,
  language,
  setLanguage,
  onAnalyze,
  analyzing,
  hasData
}: TrendingFiltersProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* 时间周期选择 */}
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">时间周期:</span>
          <div className="flex gap-2">
            {PERIODS.map((period) => (
              <button
                key={period.value}
                onClick={() => setSince(period.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  since === period.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* 语言筛选 */}
        <div className="flex items-center gap-3">
          <Code className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">编程语言:</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">所有语言</option>
            {POPULAR_LANGUAGES.slice(1).map((lang) => (
              <option key={lang} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* AI分析按钮 */}
        <div className="ml-auto">
          <button
            onClick={onAnalyze}
            disabled={!hasData || analyzing}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              !hasData || analyzing
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
            }`}
          >
            <BarChart3 className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
            {analyzing ? '分析中...' : 'AI 趋势分析'}
          </button>
        </div>
      </div>
    </div>
  );
}