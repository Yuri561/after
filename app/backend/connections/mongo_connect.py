# lets add a test user to our mongodb using python

from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime

# load env vars
load_dotenv()

# get connection string
uri = os.getenv("MONGO_CONNECT")

if not uri:
    raise RuntimeError("MONGO_CONNECT env var is not set or .env not loaded")

# create client
client = MongoClient(uri, serverSelectionTimeoutMS=5000)

try:
    # test connection
    client.server_info()
    print("MongoDB connected")
    # access db
    after_db = client["after"]
    # access collection 
    user_collection = after_db["user_creation"]

except Exception as e:
    print("Mongo operation failed:", type(e).__name__, str(e))
    raise
