import numpy as np
import matplotlib.pyplot as plt
import cv2
import os

from pbdl.loader import Dataloader
import pbdl.dataset


def create_preview_video(
    dataset,
    path,
    channels,
    fps=30,
    sec=(2, 10),
    res_width=512,  # keep width-height ratio
    cmap=plt.get_cmap("twilight"),
):

    loader = Dataloader(
        dataset,
        sel_sims=[0],
        disable_progress=True,
    )

    sim = loader.get_sim_raw(0)

    if len(sim) >= fps * sec[0]:
        # enough frames for long video
        frames = sim[: min(len(sim), fps * sec[1])]

    elif len(sim) >= 2:
        # only few frames
        fps = len(sim) / 4  # stretch to 4 sec
        frames = sim

    # add a second spatial dimension
    if loader.dataset.num_spatial_dim == 1:
        frames_ext = np.expand_dims(frames, axis=3)
        frames_ext = np.repeat(frames_ext, frames.shape[-1] // 2, axis=3)
        frames = frames_ext

    if len(channels) > 1:
        # take vector norm of vector field
        frames = np.sqrt(np.sum(frames[:, channels, ...] ** 2, axis=2))
    else:
        # select single channel
        frames = frames[:, channels[0], ...]

    height = frames.shape[1]
    width = frames.shape[2]

    high_res_size = (res_width, int((height / width) * res_width))

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    video = cv2.VideoWriter("tmp.mp4", fourcc, float(fps), high_res_size)

    # normalize
    min, max = frames.min(), frames.max()
    frames = (frames - min) / (max - min)
    frames = cmap(frames)
    frames = (frames[:, :, :, :3] * 255).astype(np.uint8)

    for frame_count in range(len(frames)):
        high_res_frame = cv2.resize(
            frames[frame_count],
            high_res_size,
            interpolation=cv2.INTER_NEAREST,
        )

        video.write(high_res_frame)

    video.release()

    # convert to browser compatible video codec
    os.system(f"ffmpeg -y -i tmp.mp4 -vcodec libx264 -f mp4 {path}")
    os.remove("tmp.mp4")


index = pbdl.dataset.index()

os.makedirs("./public/preview", exist_ok=True)

for d in index.keys():
    for f in range(len(index[d]["Fields"])):
        path = f"./public/preview/{d}_{f}.mp4"
        if os.path.exists(path):
            continue

        try:
            create_preview_video(d, path, channels=(f,))
            print(f"Created preview video for dataset {d}")
        except Exception as e:
            print(f"Failed to create preview video for dataset {d}: {str(e)}")
