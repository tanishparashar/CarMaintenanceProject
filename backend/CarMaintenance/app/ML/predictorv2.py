import os
import pandas as pd
import random
from joblib import load
from datetime import datetime, timedelta
from joblib import dump
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error


def generate_and_save_data(num_records, filename):
    # Define parameters for generating synthetic data
    car_models_dict = {
        'Toyota': {'Camry': 1992, 'Corolla': 1966, 'Rav4': 1994, 'Prius': 1997, 'Highlander': 2000, 'Tacoma': 1995,
                   'Yaris': 1999, 'Sienna': 1997, 'Avalon': 1994, 'Supra': 1978},
        'Honda': {'Civic': 1972, 'Accord': 1976, 'CR-V': 1995, 'Pilot': 2002, 'Odyssey': 1994, 'Fit': 2001,
                  'HR-V': 1999, 'Ridgeline': 2005, 'Insight': 1999, 'Passport': 1994},
        'Ford': {'Mustang': 1964, 'F-150': 1948, 'Escape': 2000, 'Explorer': 1990, 'Edge': 2006, 'Focus': 1998,
                 'Fusion': 2005, 'Expedition': 1996, 'Ranger': 1983, 'Bronco': 1966},
        'Chevrolet': {'Cruze': 2008, 'Silverado': 1998, 'Equinox': 2004, 'Malibu': 1964, 'Traverse': 2008,
                      'Tahoe': 1992, 'Camaro': 1966, 'Suburban': 1935, 'Blazer': 1969, 'Trax': 2012},
        'BMW': {'3 Series': 1975, '5 Series': 1972, 'X3': 2003, 'X5': 1999, '7 Series': 1977, 'X1': 2009, 'X7': 2019,
                '4 Series': 2013, 'X6': 2008, '2 Series': 2014},
        'Mercedes-Benz': {'C-Class': 1993, 'E-Class': 1953, 'GLC': 2015, 'GLE': 1997, 'S-Class': 1972, 'GLA': 2013,
                          'A-Class': 1997, 'G-Class': 1979, 'CLS': 2004, 'SL': 1954},
        'Audi': {'A4': 1994, 'A6': 1994, 'Q5': 2008, 'Q7': 2005, 'A3': 1996, 'Q3': 2011, 'A5': 2007, 'Q8': 2018,
                 'A7': 2010, 'TT': 1998},
        'Nissan': {'Altima': 1992, 'Maxima': 1981, 'Rogue': 2007, 'Sentra': 1982, 'Murano': 2002, 'Pathfinder': 1986,
                   'Versa': 2006, 'Titan': 2003, 'Armada': 2003, 'Frontier': 1997},
        'Hyundai': {'Sonata': 1985, 'Elantra': 1990, 'Santa Fe': 2000, 'Tucson': 2004, 'Kona': 2017, 'Venue': 2019,
                    'Accent': 1994, 'Palisade': 2018, 'Veloster': 2011, 'Nexo': 2018, 'Creta': 2014},
        'Maruti Suzuki': {'Swift': 2004, 'Baleno': 1999, 'Dzire': 2008, 'Celerio': 2014, 'Wagon R': 1999,
                          'Vitara Brezza': 2016, 'Ertiga': 2012, 'S-Presso': 2019, 'Alto': 1979, 'Ignis': 2016,
                          'S-Cross': 2013, 'XL6': 2019},
        'Tata': {'Tiago': 2016, 'Nexon': 2017, 'Safari': 1998, 'Altroz': 2019, 'Harrier': 2019, 'Tigor': 2017,
                 'Hexa': 2017, 'Gravitas': 2020, 'Sierra': 1991, 'Punch': 2021, 'Nexon EV': 2020},
        'Mahindra': {'XUV500': 2011, 'Scorpio': 2002, 'Thar': 2010, 'Bolero': 2000, 'XUV300': 2019, 'Marazzo': 2018,
                     'Alturas G4': 2018, 'KUV100': 2016, 'TUV300': 2015, 'Verito': 2007, 'XUV700': 2021,
                     'eKUV100': 2019}
    }

    engine_types = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
    fuel_types = ['Gasoline', 'Diesel', 'Electric']

    # Generate random data for each column
    data = {
        'Car Make': [],
        'Car Model': [],
        'Car Year': [],
        'Engine Type': [],
        'Fuel Type': [],
        'Mileage': [],
        'Next Maintenance Date': [],
        'Remaining Engine Life': [],
        'Fuel Efficiency': [],
        'Component Wear and Tear': [],
        'Maintenance Costs': []
    }

    # Populate data with accurately mapped car makes, models, and years
    for _ in range(num_records):
        car_make = random.choice(list(car_models_dict.keys()))
        car_model = random.choice(list(car_models_dict[car_make].keys()))
        release_year = car_models_dict[car_make][car_model]
        car_year = random.randint(release_year, datetime.now().year)
        data['Car Make'].append(car_make)
        data['Car Model'].append(car_model)
        data['Car Year'].append(car_year)
        data['Engine Type'].append(random.choice(engine_types))
        data['Fuel Type'].append(random.choice(fuel_types))
        data['Mileage'].append(random.randint(100, 20000))
        data['Next Maintenance Date'].append(datetime.now() + timedelta(days=random.randint(1, 365)))
        data['Remaining Engine Life'].append(random.randint(100, 2000))
        data['Fuel Efficiency'].append(random.uniform(10, 50))
        data['Component Wear and Tear'].append(random.uniform(0, 100))
        data['Maintenance Costs'].append(random.uniform(50, 1000))

    # Convert Mileage to float
    data['Mileage'] = [float(x) for x in data['Mileage']]

    # Create DataFrame
    df = pd.DataFrame(data)

    # Save DataFrame to CSV
    df.to_csv(filename, index=False)


def load_and_preprocess_data(filename):
    # Load the dataset
    df = pd.read_csv(filename)

    # Add a new column for 'Days Until Next Maintenance Date'
    df['Next Maintenance Date'] = pd.to_datetime(df['Next Maintenance Date'])
    df['Days Until Next Maintenance'] = (df['Next Maintenance Date'] - datetime.now()).dt.days

    # Split features and target variables
    X = df.drop(['Next Maintenance Date', 'Remaining Engine Life', 'Fuel Efficiency', 'Component Wear and Tear', 'Maintenance Costs', 'Days Until Next Maintenance'], axis=1)
    y = df[['Days Until Next Maintenance', 'Remaining Engine Life', 'Fuel Efficiency', 'Component Wear and Tear', 'Maintenance Costs']]

    return X, y


def train_and_save_models(X, y, models_dir):
    # Define preprocessing steps for categorical variables
    categorical_features = ['Car Make', 'Car Model', 'Engine Type', 'Fuel Type']
    categorical_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])

    # Create preprocessing pipeline
    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', categorical_transformer, categorical_features)
        ])

    # Define the regression models for each target variable
    models = {
        'Days Until Next Maintenance': RandomForestRegressor(random_state=42),
        'Remaining Engine Life': RandomForestRegressor(random_state=42),
        'Fuel Efficiency': RandomForestRegressor(random_state=42),
        'Component Wear and Tear': RandomForestRegressor(random_state=42),
        'Maintenance Costs': RandomForestRegressor(random_state=42)
    }

    # Create separate pipelines for each target variable
    pipelines = {}

    # Train/Test Split for each target variable
    for target_variable, model in models.items():
        X_train, X_test, y_train, y_test = train_test_split(X, y[target_variable], test_size=0.2, random_state=42)
        pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                                   ('model', model)])
        pipeline.fit(X_train, y_train)
        pipelines[target_variable] = (pipeline, X_test, y_test)

    # Make predictions and evaluate each model
    for target_variable, (pipeline, X_test, y_test) in pipelines.items():
        predictions = pipeline.predict(X_test)
        mae = mean_absolute_error(y_test, predictions)
        print('Target Variable:', target_variable)
        print('Mean Absolute Error:', mae)
        print()

    # Export each trained model
    # Save the model to a file
    if not os.path.exists(models_dir):
        os.makedirs(models_dir)

    for target_variable, (pipeline, _, _) in pipelines.items():
        # Save the model and the preprocessor to a file
        model_filename = os.path.join(models_dir, f'{target_variable}_model.pkl')
        preprocessor_filename = os.path.join(models_dir, f'{target_variable}_preprocessor.pkl')
        dump(pipeline.named_steps['model'], model_filename)
        dump(pipeline.named_steps['preprocessor'], preprocessor_filename)
        print(f'Saved {target_variable} model to {model_filename}')
        print(f'Saved {target_variable} preprocessor to {preprocessor_filename}')


def make_predictions(new_data, models_dir):
    # Convert new_data to DataFrame
    new_df = pd.DataFrame(new_data)

    # Load the saved models and preprocessors
    loaded_models = {}
    loaded_preprocessors = {}
    for target_variable in os.listdir(models_dir):
        if target_variable.endswith('_model.pkl'):
            model_filename = os.path.join(models_dir, target_variable)
            loaded_model = load(model_filename)
            loaded_models[target_variable.replace('_model.pkl', '')] = loaded_model
        elif target_variable.endswith('_preprocessor.pkl'):
            preprocessor_filename = os.path.join(models_dir, target_variable)
            loaded_preprocessor = load(preprocessor_filename)
            loaded_preprocessors[target_variable.replace('_preprocessor.pkl', '')] = loaded_preprocessor

    # Make predictions using the loaded models and preprocessors
    predictions = {}
    for target_variable, loaded_model in loaded_models.items():
        loaded_preprocessor = loaded_preprocessors[target_variable]
        preprocessed_data = loaded_preprocessor.transform(new_df)
        predictions[target_variable] = loaded_model.predict(preprocessed_data)

    return predictions


if __name__ == '__main__':
    # Generate synthetic data
    file_name = 'data.csv'
    generate_and_save_data(num_records=25000, filename=file_name)

    X, y = load_and_preprocess_data(file_name)

    model_dir = './models'
    # Train and save models
    train_and_save_models(X, y, model_dir)

    # Make predictions using the trained models
    new_data = {
        'Car Make': ['Toyota'],
        'Car Model': ['Camry'],
        'Car Year': [2015],
        'Engine Type': ['Petrol'],
        'Fuel Type': ['Gasoline'],
        'Mileage': [60000]
    }

    predictions = make_predictions(new_data, model_dir)
    print(predictions)
