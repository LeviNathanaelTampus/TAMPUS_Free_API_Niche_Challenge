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

# Previous lab: Pixabay API Practice

# TAMPUS_LabPractice_PixaBay

## Student Information

Name: Levi Nathanael Tampus  
Course: BSIT-4  
Activity: Pixabay API Practice Lab

# Challenge 1: Rocket Launch (Video)

## Request URL

curl "https://pixabay.com/api/videos/?key=YOUR_API_KEY&q=rocket+launch&category=science&editors_choice=true&per_page=3"

## Request Screenshot

<img width="627" height="163" alt="image" src="https://github.com/user-attachments/assets/27a0db9b-089a-4985-8f27-0942bd0c3d0e" />

## Response Screenshot

<img width="1081" height="240" alt="image" src="https://github.com/user-attachments/assets/4a63fa7f-1fc6-495f-b3f6-88188da1f1d4" />

# Challenge 2: Basketball (Video)

## Request URL

curl "https://pixabay.com/api/videos/?key=YOUR_API_KEY&q=basketball&category=sports&order=latest&per_page=3"

## Request Screenshot

<img width="1080" height="104" alt="image" src="https://github.com/user-attachments/assets/ea0616ee-b4c7-4557-a6d7-f2b71439c17a" />

## Response Screenshot
<img width="1081" height="235" alt="image" src="https://github.com/user-attachments/assets/a4cbb1eb-9319-4ab8-b838-505157563e78" />


# Challenge 3: Forest (Video)

## Request URL

curl "https://pixabay.com/api/videos/?key=YOUR_API_KEY&q=forest&category=backgrounds&editors_choice=true&order=latest&per_page=3"

## Query Parameters

key=YOUR_API_KEY
q=forest
category=backgrounds
editors_choice=true
order=latest
per_page=3

## Request Screenshot

<img width="1091" height="138" alt="image" src="https://github.com/user-attachments/assets/1d81c76f-1bc5-4b4a-8b2b-f5512835d1a5" />

## Response Screenshot

<img width="1081" height="243" alt="image" src="https://github.com/user-attachments/assets/f351437e-9dc7-44ae-bcdc-2356242464e9" />


# Challenge 4: Road Forest (Photo)

## Request URL

curl "https://pixabay.com/api/videos/?key=YOUR_API_KEY&q=basketball&category=sports&order=latest&per_page=3"

## Request Screenshot

<img width="1087" height="105" alt="image" src="https://github.com/user-attachments/assets/6117c169-8393-4838-a588-2793b5e464ae" />


## Response Screenshot

<img width="1092" height="202" alt="image" src="https://github.com/user-attachments/assets/c8a726bb-c12e-492d-97e0-98962dd99bb6" />
