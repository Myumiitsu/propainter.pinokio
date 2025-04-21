export const settings = {
  install: [
    { method: "shell.run", params: { message: "git clone --depth 1 https://github.com/sczhou/ProPainter.git propainter" } },
    { method: "shell.run", params: { path: "propainter", message: "pip install -r requirements.txt" } },
    { method: "shell.run", params: { path: "propainter", message: "pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121" } },
    { method: "hf.download", params: { path: "propainter/weights", _: ["ruffy369/propainter"], "local-dir": "hf" } },
    { method: "shell.run", params: { path: "propainter/weights/hf", message: "rename pytorch_model.bin propainter.pth" } },
    { method: "input", params: { title: "Installation complete", description: "ProPainter is ready—hit Start." } }
  ]
};
