
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.chrome.service import Service

from time import sleep
from selenium.webdriver.common.by import By

from pymongo import *

import requests
import time

import urllib.parse

def get_all(attribute, containing, driver):
    elements = driver.find_elements(By.XPATH, f"//*[@{attribute}[contains(., '{containing}')]]")
    return list(elements)  # Ensure it returns a list of selenium objects

from selenium.webdriver.common.by import By

def get_all_by_tag_and_text(driver, tag='*', attribute=None, containing=None, text=None):
    conditions = []

    if attribute and containing:
        conditions.append(f"contains(@{attribute}, '{containing}')")
    
    if text:
        conditions.append(f"contains(text(), '{text}')")

    xpath_conditions = ' and '.join(conditions)
    xpath = f"//{tag}[{xpath_conditions}]" if conditions else f"//{tag}"
    
    elements = driver.find_elements(By.XPATH, xpath)
    return list(elements)


def get_parent(element, driver):
    parent = element.find_element(By.XPATH, "./..")
    return parent  # Ensure it returns a selenium object

def get_children(element):
    children = element.find_elements(By.XPATH, "./*")
    return list(children)  # Ensure it returns a list of selenium objects

def get_all_descendants(element):
    descendants = []
    children = element.find_elements(By.XPATH, "./*")
    for child in children:
        descendants.append(child)
        descendants.extend(get_all_descendants(child))  # Recursively get all descendants
    return descendants

def filter_elements(elements, tag=None, attribute=None, containing=None):

    filtered_elements = []
    for element in elements:
        try:
            tag_matches = tag is None or element.tag_name.lower() == tag.lower()
            attr_matches = (
                attribute is None or (
                    element.get_attribute(attribute) and containing in element.get_attribute(attribute)
                )
            )
            if tag_matches and attr_matches:
                filtered_elements.append(element)
        except Exception as e:
            print(f"Error processing element: {e}")
    return filtered_elements

def start_driver(url):
    options = Options()
    #options.add_argument("--headless")  # Run in headless mode
    options.add_argument("--disable-gpu")
    options.add_argument("--no-sandbox")
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    return driver

# Example usage

def get_videos_by_search(query, max_results=2):
    url = f"https://www.youtube.com/results?search_query={query}"  # Replace with the website of your choice
    
    output = []

    driver = start_driver(url)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    time.sleep(4)  # Wait for the page to load

    try:
        # Example: Get all elements with a specific attribute containing a value
        videos = get_all_by_tag_and_text(driver, tag='ytd-video-renderer', attribute='class', containing='style-scope ytd-item-section-renderer', text=None)
        
        print(f"Found {len(videos)} elements with the specified attribute.")


        count = 0
        for video in videos:

            # Get parent of the element
            children = get_all_descendants(video)


            video_name = filter_elements(children, "yt-formatted-string", "class", "style-scope ytd-video-renderer")
            name = video_name[0].text if video_name else "No name found"

            video_descrip = filter_elements(children, "yt-formatted-string", "class", "metadata-snippet-text style-scope ytd-video-renderer")
            descrip = video_descrip[0].text if video_descrip else "No description found"

            video_url = filter_elements(children, "a", "id", "video-title")

            def extract_video_id(url_path):

                # Parse the query string from the URL
                parsed = urllib.parse.urlparse(url_path)
                query_params = urllib.parse.parse_qs(parsed.query)
                
                # If given just the path (e.g. /watch?v=...), manually extract the query part
                if not parsed.query and '?' in url_path:
                    query_string = url_path.split('?', 1)[1]
                    query_params = urllib.parse.parse_qs(query_string)
                
                # Get the video ID
                video_id = query_params.get('v', [None])[0]
                return video_id
            
            id = extract_video_id(video_url[0].get_attribute("href"))
            url = "https://inv.nadeko.net/embed/" + id
            img = f"https://i.ytimg.com/vi_webp/{id}/maxresdefault.webp"

            video = { 
                "name": name,
                "description": descrip,
                "url": url,
                "img": img,

            }

            output.append(video)

            # debugging for the first 5 elements
            count += 1
            if count == max_results:
                break
    finally:
        driver.quit()
        return output

if __name__ == "__main__":
    # Example usage
    videos = get_videos_by_search("best ai programs for time saving", 3)
    
    # Print videos found
    print(videos)