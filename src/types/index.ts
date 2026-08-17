// Shared Data Types across AQ Dashboard & Landing Page Components

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  discount: string;
  desc: string;
  tryUrl: string;
  tutorialUrl?: string;
  logo?: string;
}

export interface PerformItem {
  id: string;
  title: string;
  views: string;
  clicks: string;
  type: string;
  thumb: string;
  highlight: string;
  ytUrl?: string;
  thumbnail?: string;
}

export interface SponsorItem {
  id: string;
  partnerName: string;
  campaignType: string;
  quote: string;
  quoteFont?: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  description?: string;
  deliverables?: string;
  ytUrl?: string;
  roiBreakdown?: string;
  publishDate?: string;
  logoUrl?: string;
  websiteUrl?: string;
  thumbnailUrl?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "Super Admin" | "Editor" | "Viewer";
  permissions: string[];
  recoveryKey: string;
  status: "Active" | "Inactive";
  lastLogin?: string;
}

export interface BrandItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  logoText: string;
  ytUrl?: string;
  logoUrl?: string;
}

export interface ChannelStats {
  subscribers: string;
  subscribersSub: string;
  monthlyViews: string;
  monthlyViewsSub: string;
  newSubs: string;
  newSubsSub: string;
  videosCount: string;
  videosCountSub: string;
  retention: string;
  channelBanner?: string;
  uniqueViewers?: string;
  watchTimeHours?: string;
  avgViewDuration?: string;
  avgPercentageViewed?: string;
  returningViewers?: string;
}

export interface ChannelRates {
  dedicatedRate: string;
  integrationRate: string;
}

export interface ChannelDemographics {
  age13_17: string;
  age18_24: string;
  age25_34: string;
  age35_44: string;
  age45_54: string;
  age55_64: string;
  age65_plus: string;
  malePercent: string;
  femalePercent: string;
}

export interface CountryItem {
  id?: string;
  name: string;
  percent: string;
  code?: string;
}

export type ChannelGeographies = CountryItem[] | Record<string, string>;

export interface InterestItem {
  name: string;
  level: string;
}

export interface HeroConfig {
  badgeText?: string;
  headline?: string;
  headlineHighlight?: string;
  subheadline?: string;
  sponsorButtonText?: string;
  sponsorButtonUrl?: string;
  caseStudiesButtonText?: string;
  channelName?: string;
  channelHandle?: string;
  channelCategory?: string;
  channelLogo?: string;
  subscribeUrl?: string;
  subscribeButtonText?: string;
  subscribersCount?: string;
  subscribersBadge?: string;
  monthlyViewsCount?: string;
  monthlyViewsBadge?: string;
  retentionPercent?: string;
  retentionLabel?: string;
  retentionLeftText?: string;
  retentionRightText?: string;
  enableRgbEffect?: boolean;
}

