from jan import *
from scraping import *

def youtube_search(search, age, topic):

    print("Got request to search for videos")

    query_appropriate = True
    query_distracted = False

    videos = []

    print("Getting videos")
    # Parse the response from the JAN API
    videos = get_videos_by_search(search, 3)
    print("Got videos: " + str(videos))

    # Check if the search is appropriate for the user's age
    if age < 18: 
        if not result_appropriate(age, search):
            videos = []
            query_appropriate = False

    print("Search apropriate: " + str(query_appropriate))

    if query_offtrack(topic, search):
        query_distracted = True
    print("Query distracted: " + str(query_distracted))


    # Filter videos based on age appropriateness and relevance to topic
    print(videos)
    for video in videos:
        if result_appropriate(age, video["name"]) or not result_match(search, video["name"]):
            videos.remove(video)
            print("Filtered out video: " + video["name"])
        else : 
            print("Kept video: " + video["name"])

    # Convert the response to JSON
    print("Videos JSON: " + str(videos))

    return videos, query_appropriate, query_distracted

if __name__ == "__main__":
    youtube_search("python vs c++", 18, "programming", True)
