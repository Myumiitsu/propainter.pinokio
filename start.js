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
    { method: "shell.run", params: {
        path: "propainter",
        message: "python inference_propainter.py --video {{local.video}} --mask {{local.mask}} --output {{local.out}} --ckpt ./weights/hf/propainter.pth"
      }
    },
    { method: "browser.open", params: { uri: "{{local.out}}" } }
  ]
};
