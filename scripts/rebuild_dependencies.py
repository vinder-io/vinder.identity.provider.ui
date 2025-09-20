# script to clean node_modules, lock files and reinstall dependencies.

import subprocess
import os
import shutil

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__)) + "/.."
REMOVE_PATHS = [
    "node_modules", "package-lock.json",
    "pnpm-lock.yaml", "yarn.lock", "dist",
]

def run(command, cwd=None):
    subprocess.run(command, shell=True, check=True, cwd=cwd)

if __name__ == "__main__":
    os.chdir(PROJECT_ROOT)

    print("removing node_modules, lock files and build folders...")
    for path in REMOVE_PATHS:
        full_path = os.path.join(PROJECT_ROOT, path)

        if os.path.exists(full_path):
            if os.path.isdir(full_path):
                shutil.rmtree(full_path)
                print(f"removed folder: {path}")

            else:
                os.remove(full_path)
                print(f"removed file: {path}")

    print("reinstalling dependencies...")
    run("npm install")

    print("done! your project environment is clean and dependencies reinstalled.")
