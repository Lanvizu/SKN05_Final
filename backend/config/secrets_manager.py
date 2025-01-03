import os
import json

def get_secret_key(filename='secrets.json', key='SECRET_KEY'):
    script_dir = os.path.dirname(os.path.realpath(__file__))
    file_path = os.path.join(script_dir, filename)

    try:
        with open(file_path, 'r') as file:
            secrets = json.load(file)
        return secrets.get(key)
    except FileNotFoundError:
        print(f"The file {filename} was not found.")
        return None
    except json.JSONDecodeError:
        print(f"The file {filename} is not a valid JSON file.")
        return None