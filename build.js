import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const links = join(__dirname, 'links')
const dist = join(__dirname, 'dist')

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

const mkdir = async f => {
  try { await fs.mkdir(f) } catch (e) {}
}

const run = async () => {
  const files = await fs.readdir(links)
  await mkdir(dist)
  const promises = []
  for (const f of files) {
    promises.push(fs.readFile(join(links, f)).then(b => {
      const d = join(dist, f)
      return mkdir(d).then(() => fs.writeFile(join(d, 'index.html'), html(b.toString())))
    }))
  }
  promises.push(fs.writeFile(join(dist, 'index.html'), html('https://github.com/mikeal/shortlink')))
  await Promise.all(promises)
  console.log('done')
}

run()
