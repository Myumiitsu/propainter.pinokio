export const settings = {
  run: [
    { method: "input", params: {
        title: "ProPainter – pick files",
        description: "Select your input video, mask, and output name.",
        fields: [
          { name: "video", type: "file", description: "Input video (mp4/mov)" },
          { name: "mask",  type: "file", description: "Mask video (white = remove)" },
          { name: "out",   type: "text", default: "result.mp4", description: "Output file" }
        ]
      }
    },
    { method: "shell.run", params: { message: "echo 'User inputs received:'" } },
    { method: "shell.run", params: { message: "echo Selected video: {{local.video}}" } },
    { method: "shell.run", params: { message: "echo Selected mask: {{local.mask}}" } },
    { method: "shell.run", params: { message: "echo Selected output name: {{local.out}}" } },
    { method: "shell.run", params: { message: "echo 'Checking prerequisites...'" } },
    { method: "shell.run", params: { path: "propainter", message: "if [ -d . ]; then echo 'Propainter directory context OK.'; else echo 'Error: Not in propainter directory.'; fi" } },
    { method: "shell.run", params: { path: "propainter", message: "if [ -f inference_propainter.py ]; then echo 'inference_propainter.py found.'; else echo 'Error: inference_propainter.py not found.'; fi" } },
    { method: "shell.run", params: { path: "propainter", message: "if [ -f ./weights/hf/propainter.pth ]; then echo 'Checkpoint propainter.pth found.'; else echo 'Error: Checkpoint propainter.pth not found.'; fi" } },
    { method: "shell.run", params: { message: "if [ -f \"{{local.video}}\" ]; then echo 'Video file exists.'; else echo 'Error: Video file {{local.video}} not found.'; fi" } },
    { method: "shell.run", params: { message: "if [ -f \"{{local.mask}}\" ]; then echo 'Mask file exists.'; else echo 'Error: Mask file {{local.mask}} not found.'; fi" } },
    { method: "shell.run", params: { path: "propainter", message: "echo 'Attempting to run ProPainter inference. See propainter_run.log for details...'" } },
    { method: "shell.run", params: {
        path: "propainter",
        message: "python inference_propainter.py --video {{local.video}} --mask {{local.mask}} --output {{local.out}} --ckpt ./weights/hf/propainter.pth > propainter_run.log 2>&1"
      }
    },
    { method: "shell.run", params: { path: "propainter", message: "if [ -f {{local.out}} ]; then echo 'Output file {{local.out}} created.'; else echo 'Error: Output file {{local.out}} not created. Check propainter_run.log.'; fi" } },
    { method: "browser.open", params: { uri: "{{local.out}}" } }
  ]
};
