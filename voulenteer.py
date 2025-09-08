import mysql.connector

conn = mysql.connector.connect(
    host="localhost",
    user="user",
    password="#password",
    database="volunteer_connect"
)

cursor = conn.cursor()

volunteer_data = {
    "name": input("Enter your name: "),
    "location": input("Enter your location: "),
    "skills": input("Enter your skills: "),
    "phone": input("Enter your phone number: "),
    "email": input("Enter your email:")
}

insert_query = """
INSERT INTO volunteers (name, location, skills, phone, email)
VALUES (%s, %s, %s, %s, %s)
"""
cursor.execute(insert_query, (
    volunteer_data["name"],
    volunteer_data["location"],
    volunteer_data["skills"],
    volunteer_data["phone"],
    volunteer_data["email"]
))

conn.commit()
print("Volunteer registered successfully!")

cursor.close()
conn.close()

