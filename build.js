import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'

const links = new URL('./links/', import.meta.url)
const dist = new URL('./dist/', import.meta.url)

const html = link => `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Kn.ish Redirect</title>
  <meta http-equiv="refresh" content="0; URL='${link}'" />
</head>
<body>
  <img style="position: fixed; top: 50%; left: 50%; margin-left: -165px; margin-top: -130px;" src="https://kni.sh/knish.jpg" alt="mmm">
</body>
</html>
`

async function gracefulmkdir(f) {
  try { await mkdir(f) } catch (e) {}
}

async function renderHTML(f) {
  const fileURL = new URL(f, links)
  const b = await readFile(fileURL)
  const d = new URL(`${f}/`, dist)
  const index = new URL('index.html', d)
  const renderedHTML = html(b.toString())
  await gracefulmkdir(d)
  await writeFile(index, renderedHTML)
}

const run = async () => {
  const files = await readdir(links)
  await gracefulmkdir(dist)
  const promises = []
  for (const f of files) {
    promises.push(renderHTML(f))
  }
  promises.push(writeFile(new URL('index.html', dist), html('https://github.com/mikeal/shortlink')))
  await Promise.all(promises)
  console.log('done')
}

run().catch(e => console.error(e))
