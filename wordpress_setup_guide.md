# WordPress Headless Setup Guide (LeadLiq)

This guide outlines exactly how to set up your WordPress backend to match the Headless React frontend I've prepared.

## 1. Environment Configuration
On your frontend, rename `.env.example` to `.env` and update the `VITE_WP_API_URL`:
```bash
VITE_WP_API_URL=https://your-new-wordpress-site.com
```

## 2. Recommended Plugins
- **Advanced Custom Fields (ACF)**: Required for the structured data.
- **Custom Post Type UI**: To easily create 'Pricing' and 'Case Study' types.
- **WP REST API**: Built-in, but ensure it's not disabled.

## 3. Data Schema (ACF Blueprint)

### Custom Post Type: `pricing`
Create a field group assigned to the `pricing` post type with these exact field names:

| Field Label | Field Name | Field Type | Key Notes |
| :--- | :--- | :--- | :--- |
| Price | `price` | Text | e.g., "$1,000" |
| Cadence | `cadence` | Text | e.g., "/mo" |
| Description | `description` | Textarea | Short plan summary |
| Features | `features` | Repeater | || -> Feature Text | `feature_text` | Text | Single feature line |
| CTA Text | `cta_text` | Text | e.g., "Get Started" |
| Is Featured | `is_featured` | True/False | Toggles the "Popular" highlight |

---

### Custom Post Type: `case-study`
Create a field group assigned to the `case-study` post type:

| Field Label | Field Name | Field Type | Key Notes |
| :--- | :--- | :--- | :--- |
| Industry | `industry` | Text | e.g., "Real Estate" |
| Metric | `metric` | Text | e.g., "4x" |
| Metric Label | `metric_label` | Text | e.g., "ROI Growth" |
| Headline | `headline` | Text | Catchy headline |
| Tags | `tags` | Text | Comma separated (e.g., "AI, Web, CRM") |
| Challenge | `challenge` | Textarea | The problem description |
| Solution | `solution` | Repeater | |
| -> Solution Item | `solution_item` | Text | Built item description |
| Outcomes | `outcomes` | Repeater | |
| -> Value | `value` | Text | e.g., "-42%" |
| -> Label | `label` | Text | e.g., "Acquisition Cost" |
| Duration | `duration` | Text | e.g., "3 weeks" |
| Stack | `stack` | Text | Comma separated (e.g., "React, WP") |
| Quote | `quote` | Textarea | Client testimonial |
| Author | `author` | Text | Client name/role |

> [!TIP]
> **Featured Image**: Use the standard WordPress "Featured Image" meta for the Case Study thumbnail.

## 4. Why this works
The frontend is now "Headless Ready." It will attempt to fetch data from your WordPress site. If it fails (or before you've set it up), it will automatically fall back to the beautiful hardcoded data I've already polished.
| 
