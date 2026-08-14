from pathlib import Path
import json
from datetime import datetime

ACTIVITY_FILE = Path("activity.json")


class ActivityService:

    @staticmethod
    def log(activity_type: str, message: str):

        if ACTIVITY_FILE.exists():
            with open(ACTIVITY_FILE, "r") as f:
                activities = json.load(f)
        else:
            activities = []

        activities.insert(0, {
            "type": activity_type,
            "message": message,
            "time": datetime.now().strftime("%d %b %Y %H:%M")
        })

        activities = activities[:20]

        with open(ACTIVITY_FILE, "w") as f:
            json.dump(activities, f, indent=4)

    @staticmethod
    def get():

        if ACTIVITY_FILE.exists():
            with open(ACTIVITY_FILE, "r") as f:
                return json.load(f)

        return []