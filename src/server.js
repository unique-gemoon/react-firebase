const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // här anger du var uppladdade filer ska sparas
const path = require('path');
const ffmpegPath = 'C:\\Program Files (x86)\\ffmpeg\\ffmpeg.exe';
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const { exec } = require('child_process');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.emit('connected', 'Anluten!');
});

app.post('/convert', upload.single('file'), async (req, res) => {
  const inputFile = req.file;
  const outputName = `${path.parse(inputFile.originalname).name}.mp4`;
  const outputPath = path.join(__dirname, 'converted', outputName);

  const command = ffmpeg(inputFile.path)
    .output(outputPath)
    .on('progress', function(progress) {
      console.log('Converting: ' + progress.percent + '% done');
      // använd progress.percent för att uppdatera din statusrad
    })
    .on('end', () => {
      const convertedFile = path.join(__dirname, 'converted', outputName);
    
      // Kontrollera om den omvandlade filen finns i mappen "converted"
      fs.access(convertedFile, (err) => {
        if (err) {
          console.log('Error accessing converted file:', err);
          return;
        }
    
        console.log('Conversion complete:', convertedFile);
    
        // Skicka io.emit-händelse med filens sökväg och namn
        io.emit("conversionComplete", { path: convertedFile });
    
        // Lägg till detta svar
        res.status(200).send({ message: 'Conversion complete', path: convertedFile });
      });
    })
      
    .on('error', (err) => {
      console.log('Error:', err);
      res.status(500).send(err.message);
    })
    .run();
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
