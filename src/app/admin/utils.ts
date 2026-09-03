export function getYoutubeId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
  const match = trimmed.match(regExp);
  return match && match[1]?.length === 11 ? match[1] : null;
}

export function formatViewsCount(views: string | number): string {
  if (views === undefined || views === null || views === "") return "10k+";
  if (typeof views === "string") {
    const trimmed = views.trim();
    // If already in 10.4k or 1.3M format (optional suffix like 'subscribers' or 'views' stripped)
    const cleaned = trimmed.replace(/\s*(subscribers|views|videos)\s*/gi, "");
    if (/^[0-9.]+[kK]$/.test(cleaned)) {
      return cleaned.toLowerCase();
    }
    if (/^[0-9.]+[mM]$/.test(cleaned)) {
      return cleaned.slice(0, -1) + "M";
    }
    const parsedNum = parseInt(cleaned.replace(/,/g, "").replace(/[^0-9]/g, ""), 10);
    if (isNaN(parsedNum) || parsedNum === 0) return trimmed;
    if (parsedNum >= 1000000) {
      return (parsedNum / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (parsedNum >= 1000) {
      return (parsedNum / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return parsedNum.toString();
  }

  const num = views;
  if (isNaN(num) || num === 0) return "10k+";
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export function estimateClicksFromViews(views: string | number): string {
  const num = typeof views === "number" ? views : parseInt(String(views).replace(/[^0-9]/g, ""), 10);
  if (isNaN(num) || num === 0) return "1.2k+";
  // Typical high-converting YouTube conversion rate on tech channels is ~3.5% - 5.5%
  const estimated = Math.max(50, Math.round(num * 0.04));
  if (estimated >= 1000000) {
    return (estimated / 1000000).toFixed(1).replace(/\.0$/, "") + "M+";
  }
  if (estimated >= 1000) {
    return (estimated / 1000).toFixed(1).replace(/\.0$/, "") + "k+";
  }
  return estimated + "+";
}
