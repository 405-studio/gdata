import { NextRequest, NextResponse } from 'next/server';
import { TrendingRepo } from '../trending/route';

export async function POST(request: NextRequest) {
  try {
    const { repos, period } = await request.json();

    if (!repos || !Array.isArray(repos)) {
      return NextResponse.json(
        { error: 'Invalid repos data' },
        { status: 400 }
      );
    }

    // 分析语言分布
    const languageStats = repos.reduce((acc: Record<string, number>, repo: TrendingRepo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    // 分析框架和技术关键词
    const frameworks = {
      'React': 0,
      'Vue': 0,
      'Angular': 0,
      'Next.js': 0,
      'Nuxt': 0,
      'Express': 0,
      'FastAPI': 0,
      'Django': 0,
      'Flask': 0,
      'Spring': 0,
      'Laravel': 0,
      'Rails': 0,
      'Docker': 0,
      'Kubernetes': 0,
      'AI/ML': 0,
      'Blockchain': 0,
      'WebAssembly': 0,
      'GraphQL': 0,
      'REST API': 0,
      'Microservices': 0
    };

    repos.forEach((repo: TrendingRepo) => {
      const text = `${repo.name} ${repo.description}`.toLowerCase();

      if (text.includes('react')) frameworks['React']++;
      if (text.includes('vue')) frameworks['Vue']++;
      if (text.includes('angular')) frameworks['Angular']++;
      if (text.includes('next') || text.includes('nextjs')) frameworks['Next.js']++;
      if (text.includes('nuxt')) frameworks['Nuxt']++;
      if (text.includes('express')) frameworks['Express']++;
      if (text.includes('fastapi')) frameworks['FastAPI']++;
      if (text.includes('django')) frameworks['Django']++;
      if (text.includes('flask')) frameworks['Flask']++;
      if (text.includes('spring')) frameworks['Spring']++;
      if (text.includes('laravel')) frameworks['Laravel']++;
      if (text.includes('rails')) frameworks['Rails']++;
      if (text.includes('docker')) frameworks['Docker']++;
      if (text.includes('kubernetes') || text.includes('k8s')) frameworks['Kubernetes']++;
      if (text.includes('ai') || text.includes('ml') || text.includes('machine learning') || text.includes('neural') || text.includes('deep learning')) frameworks['AI/ML']++;
      if (text.includes('blockchain') || text.includes('crypto') || text.includes('web3')) frameworks['Blockchain']++;
      if (text.includes('wasm') || text.includes('webassembly')) frameworks['WebAssembly']++;
      if (text.includes('graphql')) frameworks['GraphQL']++;
      if (text.includes('api') || text.includes('rest')) frameworks['REST API']++;
      if (text.includes('microservice')) frameworks['Microservices']++;
    });

    // 生成分析报告
    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 5);

    const topFrameworks = Object.entries(frameworks)
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    const analysis = {
      summary: generateSummary(topLanguages as [string, number][], topFrameworks as [string, number][], period, repos.length),
      languageStats,
      frameworkStats: frameworks,
      topLanguages,
      topFrameworks,
      totalRepos: repos.length,
      period
    };

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing trending data:', error);
    return NextResponse.json(
      { error: 'Failed to analyze trending data' },
      { status: 500 }
    );
  }
}

function generateSummary(
  topLanguages: [string, number][],
  topFrameworks: [string, number][],
  period: string,
  totalRepos: number
): string {
  const periodText = period === 'daily' ? '今日' : period === 'weekly' ? '本周' : '本月';

  let summary = `${periodText}GitHub Trending分析报告\n\n`;
  summary += `📊 总计 ${totalRepos} 个热门项目\n\n`;

  if (topLanguages.length > 0) {
    summary += `🔥 热门编程语言：\n`;
    topLanguages.forEach(([lang, count], index) => {
      summary += `${index + 1}. ${lang} (${count}个项目)\n`;
    });
    summary += `\n`;
  }

  if (topFrameworks.length > 0) {
    summary += `⚡ 热门技术框架：\n`;
    topFrameworks.forEach(([framework, count], index) => {
      summary += `${index + 1}. ${framework} (${count}个相关项目)\n`;
    });
    summary += `\n`;
  }

  // 趋势分析
  summary += `📈 技术趋势洞察：\n`;

  if (topLanguages.some(([lang]) => ['TypeScript', 'JavaScript'].includes(lang))) {
    summary += `• 前端技术持续火热，TypeScript/JavaScript生态繁荣\n`;
  }

  if (topLanguages.some(([lang]) => lang === 'Python')) {
    summary += `• Python在AI/ML和数据科学领域保持强势\n`;
  }

  if (topFrameworks.some(([framework]) => framework === 'AI/ML')) {
    summary += `• 人工智能和机器学习项目数量显著增长\n`;
  }

  if (topFrameworks.some(([framework]) => ['Docker', 'Kubernetes'].includes(framework))) {
    summary += `• 容器化和云原生技术需求旺盛\n`;
  }

  return summary;
}