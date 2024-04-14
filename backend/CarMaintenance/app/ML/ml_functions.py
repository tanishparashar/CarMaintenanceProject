from predictorv2 import make_predictions

models_dir = "./models"

new_data = {
    'Car Make': ['Toyota'],
    'Car Model': ['Camry'],
    'Car Year': [2015],
    'Engine Type': ['Petrol'],
    'Fuel Type': ['Gasoline'],
    'Mileage': [60000]
}



print(make_predictions(new_data, models_dir=models_dir))

