# Order Tracking Screen

A mobile-first order tracking screen built with Next.js and Tailwind CSS. It shows delivery progress at a glance and handles four situations: on the way, delayed, delivered but not received, and tracking not available yet. Use the "Preview state" tabs at the top to switch between them.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000. No backend is needed; all data is mock data in `src/data/orders.js`.

## Structure

- `src/data/orders.js`: mock orders and the four delivery steps
- `src/components/StatusHero.js`: status, progress bar, ETA and alert
- `src/components/Timeline.js`: vertical delivery timeline
- `src/components/OrderDetails.js`: collapsible order summary
- `src/components/SupportSheets.js`: contact support and report issue sheets