# React + Vite + Django

## This is a sample webshop where users are able to sell, buy and update products.

## Dependencies

To get this project working you will need to install the frontend dependencies from ./frontend/package.json and the backend dependencies from ./sellersmarket/requirements.txt

## Running it

Depending on if the application is set to development or production (It will be set to production in the final version) it will vary how you setup the environment.

### Production

Make sure the DEBUG option inside django's ´settings.py´ file is set to False. Simply just navigate into ´./sellermarket´ and run ´python manage.py runserver´.

#### Build frontend (prod)

To build the frontend (which I hopefully will have done before this is turned in) you can navigate to the ´./frontend´ directory and run ´npm run build´ and vite will serve you the new files in the dist directory. However, you will also now need to navigate back to the root (´../´) folder and enter the ´./sellermarket´ directory where we will run `python manage.py collectstatic´ to add the files to django's staticfile structure.

##### The app is now ready to be used (in production)

### Development

This is what is used when developing the app. Make sure the DEBUG option in django's ´settings.py´ file is set to True.

#### Run vite and django (dev)

We will need two command windows running separetly.

The first one will serve the vite application so you will have to navigate to the ´./frontend´ directory where we will run npm run dev and start a development server on localhost:3010.

The second will run the django application. Navigate to the ´./sellersmarket´ directory and run ´python manage.py runserver´

##### Voilà you have a development environment
