import { execSync } from "child_process";

try {
  console.log("🔍 Checking FFmpeg installation...");
  execSync("ffmpeg -version", { stdio: "inherit" });
  console.log("✅ FFmpeg is already installed.");
} catch {
  console.log("⬇️ Installing FFmpeg...");
  execSync("apt-get update -y && apt-get install ffmpeg -y", { stdio: "inherit" });
  console.log("✅ FFmpeg installed successfully.");
}
