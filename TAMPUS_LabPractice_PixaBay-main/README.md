# Levi's Quotes Department

## Student Information

Name: Levi Nathanael Tampus  
Course: BSIT-4  
Activity: Quote search site (DummyJSON) · TTPD-coded design

## How DummyJSON is wired

DummyJSON has no quote search URL. The site uses one list call, then searches in the browser.

1. Open `index.html` in a local server (`npx serve` or Live Server).
2. On load, `app.js` fetches `https://dummyjson.com/quotes?limit=0`.
3. The response is `{ quotes: [{ id, quote, author }, ...] }` (about 100 rows).
4. Typing a word and clicking **File search** filters `quote` + `author` (case-insensitive).
5. Clicking a **mood code** chip filters by that mood's keywords and stamps matching cards (`LQD-FTN`, `LQD-TBD`, …).
6. Each visible quote is classified against the keyword lists and gets a department stamp. **Copy department card** copies code + quote + author.

Catalog: [DummyJSON Quotes docs](https://dummyjson.com/docs/quotes)
