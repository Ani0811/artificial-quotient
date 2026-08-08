import { getKnex } from "@/lib/db";

export async function getRawSponsorCaseStudies() {
  const k = getKnex();
  const res: any = await k.raw("SELECT * FROM sponsor_case_studies ORDER BY display_order ASC");
  const rows = res[0] || [];

  return rows.map((r: any) => ({
    id: r.id,
    partnerName: r.partner_name,
    campaignType: r.campaign_type,
    quote: r.quote,
    quoteFont: r.quote_font,
    stat1Label: r.stat1_label,
    stat1Value: r.stat1_value,
    stat2Label: r.stat2_label,
    stat2Value: r.stat2_value,
    description: r.description,
    deliverables: r.deliverables,
    ytUrl: r.yt_url,
    roiBreakdown: r.roi_breakdown,
    publishDate: r.publish_date,
    logoUrl: r.logo_url,
  }));
}

export async function syncRawSponsorCaseStudies(items: any[]) {
  const k = getKnex();
  await k.raw("TRUNCATE TABLE sponsor_case_studies;");

  if (items && Array.isArray(items) && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await k.raw(
        `INSERT INTO sponsor_case_studies
          (id, partner_name, campaign_type, quote, quote_font, stat1_label, stat1_value, stat2_label, stat2_value, description, deliverables, yt_url, roi_breakdown, publish_date, logo_url, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          String(item.id || `cs-${i + 1}`),
          item.partnerName,
          item.campaignType,
          item.quote,
          item.quoteFont || "Caveat",
          item.stat1Label,
          item.stat1Value,
          item.stat2Label,
          item.stat2Value,
          item.description || "",
          item.deliverables || "",
          item.ytUrl || "",
          item.roiBreakdown || "",
          item.publishDate || "",
          item.logoUrl || "",
          i,
        ]
      );
    }
  }
}
