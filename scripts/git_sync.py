# script to delete local git branches that no longer exist on the remote
# it fetches and prunes remotes, then deletes all local branches marked as "gone"

import subprocess

def run(command):
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    return result.stdout.strip()

if __name__ == "__main__":
    print("fetching and pruning remotes...")
    run("git fetch --prune")

    branches_info = run("git branch -vv").splitlines()
    gone_branches = []

    for line in branches_info:
        if ": gone]" in line:
            branch_name = line.split()[0].replace("*", "")
            gone_branches.append(branch_name)

    if gone_branches:
        print("deleting local branches no longer on remote:")
        for branch in gone_branches:
            print(f" - {branch}")
            run(f"git branch -D {branch}")
    else:
        print("no local branches to delete.")
