export interface LanguageStat {
  [language: string]: number;
}

export interface FrameworkStat {
  [framework: string]: number;
}

export interface TopLanguage {
  language: string;
  count: number;
}

export interface TopFramework {
  framework: string;
  count: number;
}

export interface AnalysisData {
  summary: string;
  languageStats: LanguageStat;
  frameworkStats: FrameworkStat;
  topLanguages: [string, number][];
  topFrameworks: [string, number][];
  totalRepos: number;
  period: string;
}