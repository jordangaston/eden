export const PRICING_TIERS = [
  { tier: 'Small' as const, price: 5, cores: 1, ram: '2 GB', storage: '10 GB', bandwidth: '10 Mbps' },
  { tier: 'Medium' as const, price: 10, cores: 2, ram: '4 GB', storage: '25 GB', bandwidth: '25 Mbps', highlighted: true },
  { tier: 'Large' as const, price: 20, cores: 4, ram: '8 GB', storage: '50 GB', bandwidth: '50 Mbps' },
  { tier: 'XL' as const, price: 40, cores: 8, ram: '16 GB', storage: '100 GB', bandwidth: '100 Mbps' },
] as const

export type TierName = typeof PRICING_TIERS[number]['tier']

export const APP_LOGOS = [
  { name: 'OpenClaw', src: '/openclaw-logo.webp', height: 80 },
  { name: 'Claude Code', src: '/claude-logo.webp', height: 64 },
  { name: 'Codex', src: '/codex-logo.webp', height: 80 },
  { name: 'OpenCode', src: '/open-code-logo.svg', height: 40 },
  { name: 'Hermes', src: '/hermes-logo.webp', height: 108 },
  { name: 'NanoClaw', src: '/nanoclaw-logotype.svg', height: 80 },
  { name: 'Gemini', src: '/gemini-logo.webp', height: 99 },
  { name: 'LangChain', src: '/langchain-logo.svg', height: 48 },
  { name: 'Cline', src: '/cline-logo.webp', height: 48 },
] as const

export const USE_CASES = ['AI Agents', 'Development', 'CI/CD', 'Testing', 'Design', 'Other'] as const

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
] as const

export const FOOTER_COLUMNS = [
  { title: 'Product', links: ['Features', 'Pricing'] },
  { title: 'Company', links: ['About', 'Contact'] },
  { title: 'Community', links: ['GitHub', 'X', 'Discord'] },
] as const
