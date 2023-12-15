from fastapi import APIRouter, Response, status, Depends
from sqlalchemy.orm import Session
from db.models import Passenger
from db.schemas import PassengerBase as PassengerSchema
from fastapi.encoders import jsonable_encoder
from utils.utility import get_db
import pandas as pd
import traceback
import os

router = APIRouter(
    prefix="/passenger",
    tags=["passenger"],
)

@router.get('/', status_code=status.HTTP_201_CREATED)
async def fetch_insert_data(response: Response, db: Session = Depends(get_db)):
    """
        Create DB from titanic.csv
    """
    try:
        # Deleting Previous Data
        db.query(Passenger).delete()
        db.commit()
        
        # Add New Data
        file_name = 'train.csv'
        dir_path = os.path.dirname(os.path.dirname(__file__))
        file_path = os.path.join(dir_path, 'assets', file_name)
        dataframe = pd.read_csv(file_path)
        print(dataframe.columns)
        objects = []
        dict_ = dataframe.to_dict('records')
        for each_dict in dict_:
            objects.append(
                Passenger(
                    passengerid=each_dict.get('PassengerId'),
                    survived=each_dict.get('Survived', None),
                    pclass=each_dict.get('Pclass', None),
                    name=each_dict.get('Name', None),
                    sex=each_dict.get('Sex', None),
                    age=each_dict.get('Age', None),
                    sibsp=each_dict.get('SibSp', None),
                    parch=each_dict.get('Parch', None),
                    ticket=each_dict.get('Ticket', None),
                    fare=each_dict.get('Fare', None),
                    cabin=each_dict.get('Cabin', None),
                    embarked=each_dict.get('Embarked', None),
                )
            )
        db.add_all(objects)
        db.commit()
        return {'message': 'Data succesfully feeded from train.csv file'}
    except Exception:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        print(traceback.format_exc())
        return {'message': 'Error encountered!'}
        
@router.get('/get_all/', status_code=status.HTTP_201_CREATED)
async def get_all_passengers(response: Response, db: Session = Depends(get_db)):
    """
       Retrieve all passenger data from db.
    """
    try:
        # Deleting Previous Data
        all_passenger_data = db.query(Passenger).all()
        all_passenger_data_json = jsonable_encoder(all_passenger_data)
        return {'message': 'Data Retrieved!', 'data':all_passenger_data_json}
    except Exception:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        print(traceback.format_exc())
        return {'message': 'Error encountered!'}

@router.get('/get_each_column/{column_name}', status_code=status.HTTP_201_CREATED)
async def get_each_column(column_name, response: Response, db: Session = Depends(get_db)):
    """
       Retrieve all passenger data from db.
    """
    try:
        # Deleting Previous Data
        column_name = column_name.strip()
        try:
            passenger_data = db.query(Passenger).with_entities(
                Passenger.passengerid, Passenger.name, getattr(Passenger, column_name)
            ).all()
        except Exception:
            response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
            print(traceback.format_exc())
            return {'message': 'Error encountered! Invalid Column Name!'}
            
        json_data = []
        for (id, name, col) in passenger_data:
            json_data.append(
                {
                    'passengerid': id,
                    'name': name,
                    column_name: col
                }
            )
        return {'message': 'Data Retrieved!', 'data':json_data}
    except Exception:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        print(traceback.format_exc())
        return {'message': 'Error encountered!'}