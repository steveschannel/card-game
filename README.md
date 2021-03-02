# Random Card Game

Welcome!

## Intro

This repository is the result of a challenge I did for Uplift, and it utilizes a stack of React with Apollo Client, working in tandem with Django using Graphene and Postgres, with docker.

![image](https://user-images.githubusercontent.com/31490008/109592665-9fa9d280-7add-11eb-8acd-f4a4bc26b5e7.png)

![image](https://user-images.githubusercontent.com/31490008/109592701-ad5f5800-7add-11eb-91ca-eb6d279eb305.png)

## Instructions

There is a docker-assist file that you can refer to for a complete list of commands. Pertinent commands to start the application are as follows:

./docker-assist build 

then

./docker-assist start

The server will run at port 5000 and you can query the graphQL interface at 5000/graphQL

You can then use the following command to start the frontend server.

yarn start

The server will run at port 3000 and you can log in with the sample test user noted below.

To down: ./docker-assist clean

## Sample test user

The database is created with a sample test user:

| Name     | Value          |
| -------- | -------------- |
| Username | test           |
| Email    | test@test.test |
| Password | uplifty        |

You can change these in the Django admin if you wish.
