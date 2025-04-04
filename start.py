import subprocess
import traceback
import sys
import shutil
import json

debug_mode = True

# Creating network dockers will communicate over
with open('dockers.json', 'r') as file:
    docker_configs = json.load(file)
    network_name = docker_configs.get("network", "default-network") # creating with fallback to default-network

network_command = f"docker network create {network_name}"

# To run commands in a way compatible with DOCKER
def run_encoded_command(command, timeout=300):  # Increased timeout to 5 minutes for Docker commands
    try:
        # Use subprocess.Popen to capture output with explicit encoding
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True, encoding="utf-8")
        stdout, stderr = process.communicate(timeout=timeout)  # Set a timeout to avoid hanging

        # Return the output and return code
        return_code = process.returncode

        if return_code != 0:
            # If there's an error, print the error and return the result as a tuple
            print("Error:", stderr)
            return stderr, return_code
        else:
            return stdout, return_code

    except subprocess.TimeoutExpired:
        process.kill()  # Ensure process is killed after timeout
        stdout, stderr = process.communicate()
        print("Process timed out!")
        return stderr, 1
    except Exception as e:
        print("Exception occurred:", e)
        return str(e), 1  # Return the exception message and a non-zero return code

# Starts a docker image 
def start_docker_image(location, running_name, image_name, host_port, container_port):
    results = []
    commands = []

    try:
        # Delete the docker container if it is already running/compiled
        print(f"Removing {running_name} if already present.")
        new_command = f'docker rm -f {running_name}'  # Force remove any running container
        commands.append(new_command)

        result = run_encoded_command(new_command)
        results.append(result)

        # If there was an error in removing the container, stop further execution
        if result[1] != 0:
            print("Error removing container. Aborting further operations.")
            return results  # Exit early if there's a failure

        # Check if the image exists locally
        print(f"Checking if image {image_name} exists locally.")
        new_command = f'docker images -q {image_name}'  # Check if the image exists
        result = run_encoded_command(new_command)
        results.append(result)

        # If the image exists, remove it first
        if result[0].strip() != "":  # If the image exists
            print(f"Removing existing image {image_name}.")
            new_command = f'docker rmi -f {image_name}'  # Force remove the image
            commands.append(new_command)

            result = run_encoded_command(new_command)
            results.append(result)
            # If there was an error in removing the image, stop further execution
            if result[1] != 0:
                print("Error removing image. Aborting further operations.")
                return results  # Exit early if there's a failure
        
        # If the image does not exist, build the Docker image
        print(f"Building Docker image {image_name}.")
        new_command = f'docker build -t {image_name} ./{location}'  # Build directly from the given location
        commands.append(new_command)

        result = run_encoded_command(new_command)
        results.append(result)
        # If there was an error in building the Docker image, stop further execution
        if result[1] != 0:
            print("Error building Docker image. Aborting further operations.")
            return results  # Exit early if there's a failure

        # Start the docker container
        print(f"Running Docker container {running_name}.")
        new_command = (
            f'docker run -d --name {running_name} '
            f'--network {network_name} '  # Add to the specified Docker network
            f'-p {host_port}:{container_port} {image_name}'  # Port mapping ensures localhost accessibility
        )
        commands.append(new_command)

        result = run_encoded_command(new_command)
        results.append(result)

    except Exception as e:
        traceback.print_exc()
        print("Error:", e)
        if debug_mode:
            sys.exit()

    finally:
        print(f"\nFinal results from running {running_name}:")

        # Print the output of the command
        print("Input:", commands[-1], "\n")
        print("Output:", results[-1][0])
        print("Exit code:", results[-1][1])

    return results[-1]  # Return the last result




def run_all():
    # Instantiating network 
    print("Creating docker network")
    run_encoded_command(network_command)
    # Load docker configurations from dockers.json
    with open('dockers.json', 'r') as file:
        docker_configs = json.load(file)

    # Iterate over each docker configuration and start the docker image

    dockers = docker_configs["dockers"]
    if len(dockers) == 0:
        print("No dockers found in dockers.json")
    else:
        print("Running all dockers in dockers.json")
        for docker in dockers:
            print(f"Starting {docker['running_name']}")
            start_docker_image(
                docker["location"],
                docker["running_name"],
                docker["image_name"],
                docker["host_port"],
                docker["container_port"]
            )

def run_docker_by_name(docker_name):
    # Load docker configurations from dockers.json
    with open('dockers.json', 'r') as file:
        docker_configs = json.load(file)

    # Search for the docker configuration with the specified name
    for docker in docker_configs["dockers"]:
        if docker["running_name"] == docker_name:
            print(f"Starting {docker['running_name']}")
            return start_docker_image(
                docker["location"],
                docker["running_name"],
                docker["image_name"],
                docker["host_port"],
                docker["container_port"]
            )
    
    print(f"Docker with name {docker_name} not found in dockers.json")
    return None


if __name__ == "__main__":
    # Instantiating network 
    print("Creating docker network")
    run_encoded_command(network_command)
    
    args = sys.argv[1:]

    if len(args) > 0:

        docker_name = args[0]
        print(f"Starting docker: {docker_name}")

        # Running the specified docker by name, if it exists
        run_docker_by_name(docker_name)

    else:
        # Run the main default startup sequence
        run_all()
    
