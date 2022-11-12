from fastapi import Response, FastAPI, Request  
import requests
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates

templates = Jinja2Templates(directory="build")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_headers=["*"],
)

#This backend only exists for this function:
@app.get("/searchcaster")
def searchcaster(merkle_root: str):
    link_url = "https://searchcaster.xyz/api/search?merkleRoot=" + merkle_root
    try:
        req = requests.get(
            url=link_url,
            allow_redirects=True,
            timeout=5,
        )
        return req.json()
    except:
        return {}
        

# Handles serving of app
@app.get("/")
def serve_app(request: Request, response: Response):
    response.headers["Cache-Control"] = "s-maxage=3600"
    return templates.TemplateResponse("index.html", {"request": request})


# Fronted Mounting (Prod/staging fail without them)
app.mount("", StaticFiles(directory="./build"), name="frontend")
app.mount("/static", StaticFiles(directory="./build/static"), name="static")

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8080)