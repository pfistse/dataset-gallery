import json

from pbdl.loader import Dataloader
import pbdl.dataset

index = pbdl.dataset.index()

for d in index.keys():
    loader = Dataloader(
        d,
        sel_sim=[0],
        disable_progress=True,
    )
    dataset = loader.dataset

    index[d]["numSims"] = dataset.num_sims
    index[d]["numFrames"] = dataset.num_frames
    index[d]["numSpatialDim"] = dataset.num_spatial_dims

with open("./public/index.json", "w") as f:
    json.dump(index, f, indent=4)
