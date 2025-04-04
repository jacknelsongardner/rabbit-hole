
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

def get_all(attribute, containing, driver):
    elements = driver.find_elements(By.XPATH, f"//*[@{attribute}[contains(., '{containing}')]]")
    return list(elements)  # Ensure it returns a list of selenium objects

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

def filter_elements(elements, attribute, containing):
    filtered_elements = []
    for element in elements:
        try:
            if element.get_attribute(attribute) and containing in element.get_attribute(attribute):
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
if __name__ == "__main__":
    url = "https://www.target.com/s?searchTerm=avocadoes&tref=typeahead|term|avocadoes"  # Replace with the website of your choice
    
    driver = start_driver(url)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

    time.sleep(5)  # Wait for the page to load

    try:
        # Example: Get all elements with a specific attribute containing a value
        elements = get_all("class", "sc-4fd1fd45-0", driver)
        print(f"Found {len(elements)} elements with the specified attribute.")

        for element in elements:

            # Get parent of the element
            children = get_all_descendants(element)

            price_container = filter_elements(children, "class", "sc-67b4d80d-3")

            price_info = price_container[0].text if price_container else "No price found"
            print("Price info:", price_info)

            item_name_container = filter_elements(children, "class", "styles_ndsTruncate__GRSDE")

            item_name_info = item_name_container[0].text if item_name_container else "No item name found"
            print("Name info:", item_name_info)

    finally:
        driver.quit()


