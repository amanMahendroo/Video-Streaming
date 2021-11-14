const express = require("express")
const fs = require("fs")
const app = express()
const expressLayouts = require('express-ejs-layouts')
const favicon = require('serve-favicon')

// app.listen(8000, console.log("Server started on port 8000"))

app.use(favicon(__dirname + '/logo.ico'))

app.use(express.static(__dirname + '/public'))

app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use('/', require('./routes/main'))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get("/video", function(req, res) {
    const range = req.headers.range
    if (!range) {
        res.status(400).send("Requires range header")
    }
    const videoPath = "sample-5s.mp4" // videoPath
    const videoSize = fs.statSync(videoPath).size

    // Parse range
    const chunk = 1e6
    const start = Number(range.replace(/\D/g, ""))
    const end = Math.min(start + chunk, videoSize - 1);
    const contentLength = end - start + 1
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    }

    res.writeHead(206, headers)
    const videoStream = fs.createReadStream(videoPath, {start, end})
    videoStream.pipe(res)
})

app.listen(8000, function() {
    console.log("listening on port 8000")
})