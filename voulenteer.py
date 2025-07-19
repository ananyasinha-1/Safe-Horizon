import mysql.connector

# Connect to MySQL database
conn = mysql.connector.connect(
    host="localhost",
    user="user",
    password="lion@23cs",
    database="volunteer_connect"
)

cursor = conn.cursor()

# Sample volunteer data (replace with form inputs)
volunteer_data = {
    "name": input("Enter your name: "),
    "location": input("Enter your location: "),
    "skills": input("Enter your skills: "),
    "phone": input("Enter your phone number: "),
    "email": input("Enter your email:")
}
# Insert volunteer into database
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
