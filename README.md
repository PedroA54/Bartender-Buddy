# Bartender Buddy

## Table of Contents

- [Introduction](#Introduction)
- [Features](#features)
- [Installation](#Installation)
- [API](#api)
- [License](#license)

## Introduction

With just a few clicks, you can explore an extensive library of ingredients and cocktails. Whether you prefer something sweet, sour, or savory, Bartender Buddy empowers you to try something new based on your favorite cocktail ingredient.

## Features

- Choose from a wide range of unique ingredients from a dropdown menu.
- Generates Cocktails based on ingredient selected.
- Access to detailed drink information such as name, image, ingredient, and recipe.
- Users can save their favorite Cocktails under 'Save To Favorites'

## Installation

Bartender Buddy must be downloaded and ran on your local device.

### Open Bartender Buddy

Navigate to the main repo of Bartender Buddy. Navigate to the upper righthand side and click on Fork. Choose your preferred settings and confirm by clicking 'Create Fork'. Within your own forked repo click on 'Code' > 'Local' > 'SSH' > Copy the SSH link to your clipboard.

Next, open up your terminal. Navigate to a folder where you would like to store Bartender Buddy and run the following.

1. Clone the repository:

    ``` 
    git clone <SSH Link>
    ```
2. Navigate to the project directory:
    ``` 
    cd <Repo Name>
    ```

### Start a live server on your device

1. 
    ```
    npm install -g live-server
    ```
2. 
    ```
    live-server .
    ```

You are now able to use Bartender Buddy and will be able choose from a wide list of ingredients, Cocktails of your prefernce, and favorite drinks.

## Api

Bartender Buddy uses TheCocktailDB API to access Photo's, Ingredients, recipe, and drinks names. TheCocktailDB is a free easy to use public API. 
API information here: [TheCocktailDB](https://www.thecocktaildb.com/api.php)

## License 

This project is licensed under the MIT License.