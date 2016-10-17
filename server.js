var app = require('express')()
const gcloud = require('google-cloud')

const PROJECT_ID = 'cowork-group'
const KEY_FILE_PATH = 'keyfile.json'
const BUCKET_NAME = 'cowork-group'

const gcs = gcloud.storage({
  projectId: PROJECT_ID,
  keyFilename: KEY_FILE_PATH
})

const bucket = gcs.bucket(BUCKET_NAME)

app.get('/url', (req, res) => {
  const file = req.query.file
  if (!file) {
    res.code(400)
    res.send('include filename as \'file\' query param')
    return
  }
  bucket.file(file).getSignedUrl({
    action: 'write',
    expires: Date.now() + 6000000
  }, (error, signedUrl) => {
    if (error == null) {
      res.send(signedUrl)
    } else {
      res.code(400)
      res.send('error')
    }
  })
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(3000, function () {
  console.log('listening on port 3000!')
})
