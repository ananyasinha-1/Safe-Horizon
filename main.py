import json
import random
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
import nltk
from nltk.stem.lancaster import LancasterStemmer
import numpy as np
import pickle
import os

stemmer = LancasterStemmer()

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

# Load data
with open("intents.json") as file:
    data = json.load(file)

# Load model data
with open("data.pickle", "rb") as f:
    words, labels, training, output = pickle.load(f)

# Load trained model
import tflearn
import tensorflow as tf
tf.compat.v1.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)
model.load("model.tflearn")

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]
    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(w.lower()) for w in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return np.array(bag)

def get_response(user_input):
    results = model.predict([bag_of_words(user_input, words)])
    results_index = np.argmax(results)
    tag = labels[results_index]

    if results[results_index] > 0.7:
        for intent in data["intents"]:
            if intent["tag"] == tag:
                return random.choice(intent["responses"])
    else:
        return "I didn't get that. Try again."

@app.get("/", response_class=HTMLResponse)
async def serve_index():
    with open("static/index.html") as f:
        return f.read()

@app.post("/chat")
async def chat_endpoint(request: Request):
    body = await request.json()
    message = body.get("message")
    response = get_response(message)
    return JSONResponse(content={"reply": response})
