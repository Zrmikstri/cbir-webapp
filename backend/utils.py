def base64URL_to_image(url):
    """
    Convert a base64URL to a PIL image
    """
    import base64
    from PIL import Image
    from io import BytesIO

    # Remove the "data:image/png;base64," part of the string
    url = url.split(",")[1]
    
    # Convert the base64URL to a base64 string
    base64_string = base64.b64decode(url)
    
    # Convert the base64 string to a PIL image
    image = Image.open(BytesIO(base64_string))

    return image

def image_to_base64URL(image):
    """
    Convert a PIL image to a base64URL
    """
    import base64
    from io import BytesIO

    # Convert the PIL image to a base64 string
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    base64_string = base64.b64encode(buffered.getvalue())

    # Convert the base64 string to a base64URL
    base64URL = base64_string.decode("utf-8")
    base64URL = "data:image/png;base64," + base64URL

    return base64URL

def blob_to_image(blob):
    """
    Convert a blob to a PIL image
    """
    from PIL import Image
    from io import BytesIO

    # Convert the blob to a PIL image
    image = Image.open(BytesIO(blob))

    return image

def image_to_blob(image):
    """
    Convert a PIL image to a blob
    """
    from io import BytesIO

    # Convert the PIL image to a blob
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    blob = buffered.getvalue()

    return blob