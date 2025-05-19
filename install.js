export const settings = {
  install: [
    { method: "shell.run", params: { message: "git clone --depth 1 https://github.com/sczhou/ProPainter.git propainter" } },
    { method: "shell.run", params: { message: "if [ -d propainter ]; then echo 'ProPainter directory created.'; else echo 'Error: ProPainter directory not found.'; fi" } },
    { method: "shell.run", params: { path: "propainter", message: "pip install -r requirements.txt" } },
    { method: "shell.run", params: { path: "propainter", message: "echo 'requirements.txt installation attempted.'" } },
    { method: "shell.run", params: { path: "propainter", message: "pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121" } },
    { method: "shell.run", params: { path: "propainter", message: "echo 'PyTorch installation attempted.'" } },
    { method: "hf.download", params: { path: "propainter/weights", _: ["ruffy369/propainter"], "local-dir": "hf" } },
    { method: "shell.run", params: { message: "if [ -f propainter/weights/hf/pytorch_model.bin ]; then echo 'pytorch_model.bin downloaded.'; else echo 'Error: pytorch_model.bin not found.'; fi" } },
    { method: "shell.run", params: { path: "propainter/weights/hf", message: "rename pytorch_model.bin propainter.pth" } },
    { method: "shell.run", params: { message: "if [ -f propainter/weights/hf/propainter.pth ]; then echo 'propainter.pth created.'; else echo 'Error: propainter.pth not found.'; fi" } },
    { method: "input", params: { title: "Installation complete", description: "ProPainter is ready—hit Start." } }
  ]
};
