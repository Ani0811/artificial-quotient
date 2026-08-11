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
}

export interface ChannelRates {
  dedicatedRate: string;
  integrationRate: string;
}

export interface ChannelDemographics {
  age25_34: string;
  age18_24: string;
  malePercent: string;
  femalePercent: string;
}

export interface ChannelGeographies {
  usa: string;
  india: string;
  uk: string;
  germany: string;
}
