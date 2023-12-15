interface Passenger {
    passengerid: number
    survived: number
    pclass: number
    name: string
    sex: string
    age: number
    sibsp: number
    parch: number
    ticket: string
    fare: string
    cabin: string
    embarked: string
    [key: string]: string | number;
}

export default Passenger;