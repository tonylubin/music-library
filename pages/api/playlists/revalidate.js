export default async function handler(req, res) {

  try {
    await res.revalidate('/playlists')
    return res.json({ revalidated: true, msg: 'revalidated' })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }

};