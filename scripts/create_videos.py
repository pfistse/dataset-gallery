import pbdl.tools.preview as preview
import pbdl.dataset
import os

datasets = pbdl.dataset.index()

os.makedirs("./public/preview", exist_ok=True)

for d in datasets.keys():
    for f in range(len(datasets[d]["fields"])):
        path = f"./public/preview/{d}_{f}.mp4"
        if os.path.exists(path):
            continue

        try:
            preview.create_preview_video(d, path, sec=10, channels=(f,))
            print(f"Created preview video for dataset {d}")
        except Exception as e:
            print(f"Failed to create preview video for dataset {d}: {str(e)}")
