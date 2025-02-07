import requests

def try_on_clothes(person_image_path, cloth_image_path):
    """
    Sends a request to the virtual try-on API and returns the output image URL.
    
    :param person_image_path: Path to the person's image file.
    :param cloth_image_path: Path to the cloth's image file.
    :return: URL of the processed image or an error message.
    """
    url = "https://virtual-try-on2.p.rapidapi.com/clothes-virtual-tryon"

    headers = {
        "x-rapidapi-key": "",#add your api key
        "x-rapidapi-host": "virtual-try-on2.p.rapidapi.com"
    }

    try:
        with open(person_image_path, "rb") as person_img, open(cloth_image_path, "rb") as cloth_img:
            files = {
                "personImage": person_img,
                "clothImage": cloth_img
            }
            response = requests.post(url, files=files, headers=headers)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success"):
                return data["response"]["ouput_path_img"]
            else:
                return f"API Error: {data.get('message', 'Unknown error')}"
        else:
            return f"Request failed with status code {response.status_code}: {response.text}"

    except Exception as e:
        return f"Error: {str(e)}"
