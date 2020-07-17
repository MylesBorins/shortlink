# shortlink

> omg this actually works

## What is this?

Did you know that there is an HTML meta tag that you can use to redirect traffic

```html
<meta http-equiv="refresh" content="0; URL='$URL'" />
```

It turns out you can build an entire URL shortening service on top of this
with just Cloud Storage, HTML, a CDN, and a tiny bit of rsync.

## Setup

### Backend infrastructure

To get this working you need to have a GCS bucket setup that is serving HTTP content publically

You can find [a tutorial](https://cloud.google.com/storage/docs/hosting-static-website) on setting this up on the GCP website.

I have [cloudflare](https://www.cloudflare.com/) setup in front of the bucket as a global CDN and to enable SSL via HTTPS.

I should write a blog about this at some point, open an issue if you need some pointers.

### gcloud sdk

This shortlink script uses `gsutil rsync` to upload your shortlinks to gcs. You can get gsutil by [installing the gcloud sdk](https://cloud.google.com/sdk/install). After installing the sdk run `gcooud init` to get everything setup properly. You are going to want to provision the CLI to use the project you created the GCS bucket in.

### install shortlink

To install shortlink run the install script

```bash
$ ./install <BUCKET_URL> [INSTALL_LOCATION]
```

* BUCKET\_URL is the URL for your bucket not including `gs:` or any slashes
  - example: `./install kni.sh`
* INSTALL\_LOCATION is the location on disc to install the shell script
  - default is `$HOME/.bin`
  - example: `./install kni.sh $HOME/.also_bin`

After install you will need to add `$HOME/.bin`, or your custom install location, to your path.

## Usage

```bash
$ shortlink <URL> [NAME]
```

* URL is the path you want to shortlink to redirect to
  - example: `$ shortlink https://myles.dev`
  - result: https://kni.sh/d13e6660
* NAME is a custom name for the shortlink
  - example: `$ shortlink https://github.com/mylesborins/shortlink shortlink`
  - result: https://kni.sh/shortlink

## License

MIT
