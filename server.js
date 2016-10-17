const PROJECT_ID = 'lofty-hall-146709'
const BUCKET_NAME = 'lofty-hall-146709.appspot.com'
const KEY_FILE_PATH = 'keyfile.json'



var app = require('express')()
const gcloud = require('google-cloud')

const gcs = gcloud.storage({
  projectId: PROJECT_ID,
  keyFilename: KEY_FILE_PATH
})

const bucket = gcs.bucket(BUCKET_NAME)

app.get('/url', (req, res) => {
  const file = req.query.file
  const type = req.query.type
  if (!file) {
    res.code(400)
    res.send('include filename as \'file\' query param')
    return
  }
  if (!type) {
    res.code(400)
    res.send('include content-type as \'type\' query param')
    return
  }
  bucket.file(file).getSignedUrl({
    action: 'write',
    expires: Date.now() + 6000000,
    contentType: type
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
