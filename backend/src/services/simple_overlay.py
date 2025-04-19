"""
Simple image overlay script for basic garment try-on.

This is a simple fallback solution that doesn't use AI, just regular image compositing.

Requirements:
- Python 3.6+
- PIL/Pillow library: pip install pillow
"""

import sys
import os
from PIL import Image
import argparse

def overlay_images(person_image_path, garment_image_path, output_path=None):
    """
    A simple function to overlay a garment image on a person image.
    This is a basic fallback solution that doesn't use AI.
    
    Args:
        person_image_path (str): Path to the person image file
        garment_image_path (str): Path to the garment image file
        output_path (str, optional): Path to save the result. If None, a path will be generated.
    
    Returns:
        str: Path to the output composite image
    """
    try:
        print(f"Python: Loading person image: {person_image_path}", file=sys.stderr)
        person_img = Image.open(person_image_path).convert("RGBA")
        
        print(f"Python: Loading garment image: {garment_image_path}", file=sys.stderr)
        garment_img = Image.open(garment_image_path).convert("RGBA")
        
        # Resize garment to fit on the person (approximately torso area)
        person_width, person_height = person_img.size
        garment_width, garment_height = garment_img.size
        
        # Calculate a reasonable size for the garment (about 60% of person width)
        target_width = int(person_width * 0.6)
        # Maintain aspect ratio
        target_height = int(garment_height * (target_width / garment_width))
        
        # Resize garment
        garment_img = garment_img.resize((target_width, target_height), Image.Resampling.LANCZOS)
        
        # Calculate position to paste garment (center horizontally, upper third vertically)
        paste_x = (person_width - target_width) // 2
        paste_y = person_height // 3  # Place in upper third of person image
        
        # Create a new image with the same size as person
        result_img = Image.new("RGBA", person_img.size, (0, 0, 0, 0))
        
        # Paste person image first (as background)
        result_img.paste(person_img, (0, 0), person_img)
        
        # Paste garment on top
        result_img.paste(garment_img, (paste_x, paste_y), garment_img)
        
        # Generate output path if not provided
        if output_path is None:
            dir_path = os.path.dirname(person_image_path)
            output_path = os.path.join(dir_path, f"overlay_result_{os.path.basename(person_image_path)}")
        
        # Save the result
        print(f"Python: Saving result to: {output_path}", file=sys.stderr)
        result_img.save(output_path, format="PNG")
        
        return output_path
        
    except Exception as e:
        print(f"Python Error in overlay_images: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        raise

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Simple Image Overlay')
    parser.add_argument('person_image_path', type=str, help='Path to the person image file')
    parser.add_argument('garment_image_path', type=str, help='Path to the garment image file')
    parser.add_argument('--output_path', type=str, help='Path to save the result', default=None)
    
    args = parser.parse_args()
    
    try:
        result_path = overlay_images(args.person_image_path, args.garment_image_path, args.output_path)
        # Print only the result path to stdout (for capturing by Node.js)
        print(result_path)
    except Exception:
        sys.exit(1) 