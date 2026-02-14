from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import os

# 🔽 Explicit FFmpeg path
os.environ["PATH"] += os.pathsep + r"C:\ffmpeg-8.0.1-full_build\bin"

app = Flask(__name__)
CORS(app)

print("Loading Whisper model...")
model = whisper.load_model("tiny")  # tiny = faster + less RAM
print("Model loaded.")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    try:
        if "audio" not in request.files:
            return jsonify({"error": "No audio file received"}), 400

        file = request.files["audio"]
        file_path = "audio.webm"
        file.save(file_path)

        print("Audio saved:", file_path)

        result = model.transcribe(file_path)
        os.remove(file_path)

        print("Transcription done.")

        return jsonify({"text": result["text"]})

    except Exception as e:
        print("ERROR:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
