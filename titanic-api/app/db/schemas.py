from pydantic import BaseModel


class PassengerBase(BaseModel):
    passengerid: int
    survived : int
    pclass : int
    name : str
    sex : str
    age : int
    sibsp : int
    parch : int
    ticket : str
    fare : str
    cabin : str
    embarked : str
    
    class Config:
        orm_mode = True

