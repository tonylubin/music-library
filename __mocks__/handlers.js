import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/api/playlists/manage", async ({ request }) => {
    const data = await request.json();
    const playlistNames = ["summer vibes", "winter mix"];
    if (!playlistNames.includes(data)) {
      return HttpResponse.json(
        { msg: "Playlist was created" },
        { status: 200 }
      );
    } else {
      return HttpResponse.json(
        { msg: "Playlist with that name already exists" },
        { status: 400 }
      );
    }
  }),

  http.delete("/api/playlists/manage", async ({ request }) => {
    // mock playlist data
    const playlists = ['summer mix', 'winter mix'];
    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url);
    // Read query param - tableName
    const playlistName = url.searchParams.get('tableName');

    if(playlists.includes(playlistName)) {
      return HttpResponse.json(
        { msg: "Playlist was successfully deleted" },
        { status: 200 }
      );
    }

  }),

  http.post('/api/tracks', async ({request}) => {
    const {title, artist} = await request.json();
    return HttpResponse.json(
      {title, artist},
      { status: 200 }
    );
  }),

  http.post('/api/favourites', async () => {
    return HttpResponse.json(
      {status: 200},
      {msg: "Track added to your favourites list."}
    )
  }),

  http.delete('/api/favourites/:id', async ({params}) => {
    const {id} = params;
    return HttpResponse.json(
      {msg: `Track, with id: ${id}, was removed from your favourites list`}
    )
  }),
];
