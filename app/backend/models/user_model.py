#this will be our user models
from datetime import datetime, timedelta, timezone



class User:
    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password = password
        
    def save_to_db(self, user_collection):
        user_data = {
            "email": self.email,
            "password": self.password,
            "name": self.name
        }
        
        result = user_collection.insert_one(user_data)
        print(f"successfully saved to db: {result}")
        
    @staticmethod
    def find_by_email(email, user_collection): #find email
        return user_collection.find_one({"email": email})
    