import { TrendingUp, Github } from 'lucide-react';

export function TrendingHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Github className="w-8 h-8 text-gray-800 dark:text-white" />
        <TrendingUp className="w-8 h-8 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        GitHub Trending
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        发现最热门的开源项目和技术趋势
      </p>
    </div>
  );
}