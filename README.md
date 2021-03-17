# Pettysave Backend Internship Assessment

This test is for the role of Backend Engineering Intern at Pettysave.

## Task

Your task is to implement a very simple REST API that allows users to create and manage tasks.

## What We are Looking out For

- Version control with Git.
- Programming logic.
- Fair knowledge of building REST APIs.
- [Optional] Fair knowledge about writing tests.
- [Optional] Fair knowledge about writing API documentation.
- [Optional] Fair about deploying APIs to any platform of your choice.

### Required Features

1. User can sign up.
2. User can sign in.
3. User can create a task.
4. User can edit a task using its ID.
5. User can view all the tasks he/she have created.
6. User can view a task using its ID.
7. User can filter through tasks using task status.

### Entity Specification

- Users

```yaml
{
  id: uuid
  first_name: String
  last_name: String
  address: String
  email: String
  password: String
  created_at: datetime
  updated_at: datetime
  ...
}
```

- Tasks

```yaml
{
  id: uuid
  user_id: uuid
  title: String
  description: String
  status: enum ["pending", "in-progress", "completed"]
  created_at: datetime
  updated_at: datetime
  ...
}
```

### Tools

- Server side Framework: NodeJS/Express
- Linting Library: ESLint
- Style Guide: Airbnb
- [Optional] API Documentation: Swagger
- [Optional] Testing Framework: `mocha`
- [Optional] Deployment: Heroku

### Duration

Deadline for submission is contained in the email sent to you

## Submission

- Fork this repository.
- Attempt the test using the specifications above. You are at liberty to add some features you feel might be missing—Go wild😉!
- When you are done, submit a pull request.
