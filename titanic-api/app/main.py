from fastapi import FastAPI
from routers import passenger
from db.database import engine
from db.models import Base
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

tags_metadata = [
    {
        "name": "passenger",
        "description": "Operations with titanic dataset.",
    }
]

app = FastAPI(openapi_tags=tags_metadata)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(passenger.router)

