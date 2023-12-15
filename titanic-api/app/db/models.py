from sqlalchemy import Boolean, Column, Integer, String

from .database import Base


class Passenger(Base):
    __tablename__ = "Titanic"
        
    passengerid = Column(Integer, primary_key=True, index=True)
    survived = Column(Integer)
    pclass = Column(String)
    name = Column(String)
    sex = Column(String)
    age = Column(Integer)
    sibsp = Column(Integer)
    parch = Column(Integer)
    ticket = Column(String)
    fare = Column(String)
    cabin = Column(String)
    embarked = Column(String)