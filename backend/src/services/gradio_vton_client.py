import os
import sys
import base64
import argparse
from gradio_client import Client

def save_base64_image(data_uri, output_path):
    """
    Save a base64 image URI to a file.
    """
    image_b64 = data_uri.split(",", 1)[1]
    with open(output_path, "wb") as f:
        f.write(base64.b64decode(image_b64))
    return output_path

def process_images(person_image_path, garment_image_path, hf_token=None):
    """
    Uses Hugging Face gradio_client to interact with the Areta360/VTON360 space.
    """
    print("[Python] Initializing Gradio client...", file=sys.stderr)
    client = Client("Areta360/VTON360", hf_token=hf_token)

    # Step 1: Send the person image
    print("[Python] Step 1: Uploading person image...", file=sys.stderr)
    step1_result = client.predict(
        image=person_image_path,
        fn_index=6
    )

    # Step 2: Send the garment and config
    print("[Python] Step 2: Uploading garment and generating result...", file=sys.stderr)
    step2_result = client.predict(
        person_editor=step1_result,
        garment=garment_image_path,
        cloth_type="upper",
        num_inference_steps=10,
        guidance_scale=0,
        seed=-1,
        show_type="result only",
        fn_index=0
    )

    # Step 3: Handle the result
    if isinstance(step2_result, str) and step2_result.startswith("data:image"):
        output_path = os.path.join(os.path.dirname(person_image_path), f"vton_result-{int(time.time())}.png")
        save_base64_image(step2_result, output_path)
        print(f"[Python] Image saved to: {output_path}", file=sys.stderr)
        return output_path
    else:
        raise Exception(f"Unexpected output from model: {type(step2_result)}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='VTON Client using gradio_client')
    parser.add_argument('person_image_path', type=str, help='Path to person image')
    parser.add_argument('garment_image_path', type=str, help='Path to garment image')
    parser.add_argument('--hf_token', type=str, help='Hugging Face API Token', default=None)

    args = parser.parse_args()
    print(f"[Python] Running with: person='{args.person_image_path}', garment='{args.garment_image_path}', token_provided={args.hf_token is not None}", file=sys.stderr)

    try:
        result_path = process_images(args.person_image_path, args.garment_image_path, args.hf_token)
        print(result_path)  # Output for Node.js or CLI
        sys.exit(0)
    except Exception as e:
        print(f"[Python] Error: {e}", file=sys.stderr)
        sys.exit(1)
