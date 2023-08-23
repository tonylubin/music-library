# Music Player Library

#### Getting started
```npm run dev```

### Problem

how to make vinyl analogue music collection made available to interact with, in a digital way.

### Solution

Created a full stack web app music player inspired by online streaming players like mixcloud/spotify to organise and upload music, play tracks and create playlists.

## Tech

- Next JS (13)
- React
- Tailwind CSS
- react icons
- audiomotion-analyzer
- React hook form
- yup resolver - form validation
- react toastify - toast notification
- NextCloudinary & Cloudinary- image upload cloud server
- SQL database - MySql

## Functionality

1. library tracks organised via music genres

2. search functionality via artist or track name using  Next router with url search query/term

3. navigation using NextJS  `<Link>` component and `useRouter()`

4. able to add tracks to a favourites lists

5. make playlists - add/remove tracks

6. Form - add music to database library with form validation.

    - enter track info using multi-step form
    - upload track vinyl cover image using cloudinary upload widget
    - uploading audio

7. music player - created using `<audio>` element with play, pause and seek functions. Visual progress bar song duration and using 'audioMotion-analyzer' to show eq function of playing audio


