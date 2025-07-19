import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface TrendingRepo {
  name: string;
  author: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  todayStars: string;
  url: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const since = searchParams.get('since') || 'daily'; // daily, weekly, monthly
  const language = searchParams.get('language') || '';

  try {
    let url = `https://github.com/trending`;
    if (language) {
      url += `/${language}`;
    }
    url += `?since=${since}`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const repos: TrendingRepo[] = [];

    $('article.Box-row').each((index, element) => {
      const $repo = $(element);
      
      const nameElement = $repo.find('h2 a');
      const fullName = nameElement.attr('href')?.replace('/', '') || '';
      const [author, name] = fullName.split('/');
      
      const description = $repo.find('p.col-9').text().trim();
      
      const language = $repo.find('[itemprop="programmingLanguage"]').text().trim();
      
      const starsElement = $repo.find('a[href*="/stargazers"]');
      const stars = starsElement.text().trim();
      
      const forksElement = $repo.find('a[href*="/forks"]');
      const forks = forksElement.text().trim();
      
      const todayStarsElement = $repo.find('.float-sm-right');
      const todayStars = todayStarsElement.text().trim();
      
      const url = `https://github.com${nameElement.attr('href')}`;

      if (name && author) {
        repos.push({
          name,
          author,
          description,
          language,
          stars,
          forks,
          todayStars,
          url
        });
      }
    });

    return NextResponse.json({ repos, since, language });
  } catch (error) {
    console.error('Error fetching trending repos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trending repositories' },
      { status: 500 }
    );
  }
}