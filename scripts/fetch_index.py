import pbdl.dataset
import json

index = pbdl.dataset.index()

with open("./public/index.json", "w") as f:
    json.dump(index, f, indent=4)
