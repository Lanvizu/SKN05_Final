import json
from typing import Dict
# from django.utils import timezone

def Initialize_env_variables(json_file: json, module_name: str):
    with open(json_file, "r") as f:
        config: Dict = json.load(f)

    for key, value in config.items():
        setattr(module_name, key, value)