Stitch artwork goes here.

Drop image files into this folder and the app uses them automatically — no code
changes needed. Use transparent-background PNG (or WebP). Square-ish images work
best. Only use artwork you have the right to use.

Option A — one image for everything (simplest):
    stitch.png        ← used for every pose

Option B — a different image per pose (optional, nicer):
    idle.png  happy.png  excited.png  sad.png  thinking.png
    wave.png  dance.png  celebrate.png  reading.png  writing.png
  Any pose without its own file falls back to stitch.png, then to the
  built-in drawing.

After adding a file here: restart the dev server (it picks up new assets), and
copy this folder into the GitHub folder too so it deploys.
