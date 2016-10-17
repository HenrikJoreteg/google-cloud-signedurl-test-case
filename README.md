# error test case

Just trying to put together an isolated test to show getting a signed url from a node server and uploading straight to Google Cloud storage from a browser with that signed url.

Seems this should be simple.

1. Download JSON keyfile from Google Cloud platform save it as `keyfile.json` in project root
2. Set `PROJECT_ID` and `BUCKET_NAME` variables at the top of server.js file
3. run `npm start`
4. open http://localhost:3000
5. select a file using the file input

You should see it being uploaded to that bucket. I keep getting 403'ed saying signature is wrong.
