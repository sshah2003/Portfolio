# Sohil Shah — Portfolio

An interactive portfolio styled as a **DC Metro map**. Each station is a stop in my
story — The Washington Post, George Mason, skills, and my featured project
[ClassMate](https://classmate-lemon.vercel.app/) — connected by the Orange, Blue, and
Silver lines running through a shared trunk, just like the real WMATA system. A train
rides the rails between stations; tap any stop, use the ◀ ▶ controls, or the arrow keys.

Built with React 18 + Vite and Framer Motion driving an SVG map: arclength-based
path-following for the train, a spring camera with wheel/drag/pinch gestures, hash
deep-links (`#/station/classmate`), and full reduced-motion support.

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```
