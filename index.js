import { spawn } from "child_process";
import express from "express";
import ffmpeg from "fluent-ffmpeg";

const STREAM_KEY = process.env.STREAM_KEY;
const PORT = process.env.PORT || 3000;
const VIDEO_FILE = "./video.mp4";
const YT_URL = `rtmp://a.rtmp.youtube.com/live2/${STREAM_KEY}`;

const app = express();
app.get("/", (_, res) => res.send("✅ Streamer is alive and running 24/7!"));
app.listen(PORT, () => console.log(`🌐 Web server running on port ${PORT}`));

function startStream() {
  console.log("🎬 Starting YouTube 24/7 stream...");
  const ffmpegProcess = spawn("ffmpeg", [
    "-re",
    "-stream_loop", "-1",
    "-i", VIDEO_FILE,
    "-c:v", "libx264",
    "-preset", "veryfast",
    "-b:v", "2500k",
    "-c:a", "aac",
    "-b:a", "128k",
    "-f", "flv",
    YT_URL
  ]);
  ffmpegProcess.stderr.on("data", d => console.error(`FFmpeg: ${d}`));
  ffmpegProcess.on("close", c => {
    console.error(`❌ FFmpeg exited (${c}). Restarting in 10 s...`);
    setTimeout(startStream, 10000);
  });
}
startStream();
