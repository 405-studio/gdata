import { Star, GitFork, ExternalLink, Loader2 } from 'lucide-react';
import { TrendingRepo } from '../api/trending/route';

interface TrendingListProps {
  repos: TrendingRepo[];
  loading: boolean;
}

// 为不同编程语言分配颜色
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    'JavaScript': 'bg-yellow-500',
    'TypeScript': 'bg-blue-600',
    'Python': 'bg-green-600',
    'Java': 'bg-orange-600',
    'Go': 'bg-cyan-500',
    'Rust': 'bg-orange-800',
    'C++': 'bg-pink-600',
    'C#': 'bg-purple-600',
    'PHP': 'bg-indigo-600',
    'Ruby': 'bg-red-600',
    'Swift': 'bg-orange-500',
    'Kotlin': 'bg-purple-500',
    'Dart': 'bg-blue-500',
    'Vue': 'bg-green-500',
    'HTML': 'bg-orange-400',
    'CSS': 'bg-blue-400',
    'Shell': 'bg-gray-600',
    'C': 'bg-gray-700',
    'Objective-C': 'bg-blue-700',
    'Scala': 'bg-red-500',
    'R': 'bg-blue-800',
    'Perl': 'bg-indigo-800',
    'Haskell': 'bg-purple-800',
    'Lua': 'bg-blue-300',
    'MATLAB': 'bg-orange-700',
    'Assembly': 'bg-gray-800',
    'PowerShell': 'bg-blue-900',
    'Dockerfile': 'bg-cyan-600',
    'YAML': 'bg-red-400',
    'JSON': 'bg-yellow-600',
    'Markdown': 'bg-gray-500'
  };
  
  return colors[language] || 'bg-gray-400';
}

export function TrendingList({ repos, loading }: TrendingListProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">加载中...</span>
        </div>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p className="text-lg">暂无数据</p>
          <p className="text-sm mt-2">请尝试调整筛选条件</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          热门项目 ({repos.length})
        </h2>
      </div>
      
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {repos.map((repo, index) => (
          <div key={`${repo.author}/${repo.name}`} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                  >
                    {repo.author}/{repo.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                
                {repo.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                    {repo.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  
                  {repo.stars && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{repo.stars}</span>
                    </div>
                  )}
                  
                  {repo.forks && (
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      <span>{repo.forks}</span>
                    </div>
                  )}
                  
                  {repo.todayStars && (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{repo.todayStars}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}