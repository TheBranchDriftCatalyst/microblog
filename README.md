## About this project

Tech Stack:
    - swagger??
    - integrated docs???
    - Docker
    - Django NINJA
    - pytest
      - (less verbose than unittest tbh)
      - bonus frontend tests
      - tailwind

- Requirements
  - Django Ninja ( MVC framework)
  - [ ] Readme.md
  - [ ] devX
- Models
  - [ ]  Create Databases>UML section
    - [ ]  Models to achieve functionality
      - User → Blog Post
      - User → Authentication
      - [ ] Users can register and log in.
      - [ ] Blog posts should include a title, content, author (linked to User), and timestamp.
  - User Stories
    - Users can (using JWT or token-based auth):
      - [ ] register
      - [ ] login
- Bonus
  - [ ] Cloud Deployment
  - [ ] User Profile Page
  - [ ] Basic Testing

- API
  - Register USER
  - Login User
  - CRUD Blog Posts
  - user profile (bonus)

- Pages
  - [ ] Registration Page
  - [ ] Login Page
  - [ ] User Profile Page (BONUS)
    - [ ] view list of blog posts
    - [ ] 
  - Blog CRUD Page (bonus)

## Dev Setup

```sh
poetry install
# to promote the shell to the virt env or poetry run <command>
poetry shell
```

Task file for automated tasks
  - Database Tasks


## Database

```mermaid
classDiagram
    class User {
        +int id
        +string username
        +string first_name
        +string last_name
        +string email
        +CRUD_ACTIONS()
    }

    class BlogPost {
        +int id
        +string title
        +string content
        +datetime created_at
        +datetime updated_at
        +int author_id
        +CRUD_ACTIONS()
    }

    class UserCredentials {
        +int id
        +string password_hash
        +int user_id
    }

    User "1" -- "0..*" BlogPost: has_many
    User "1" -- "1" UserCredentials: has_one

    BlogPost : +canUpdate(User) bool
    BlogPost : +canDelete(User) bool

```

## My Process

- 1 Decompose the Exercise document into Github REPO readme.md
  - This allows two things.
    - 1: creation of a implementation plan, necessary models and technology stack.
    - 2: Better Dev experience for final product with a useful readme.yaml
  - At implementation phase i wont have to think about what to implment jsut how to implement and can crush tasks.
- Look into unknown tech requirements and understand the scope of what it can handle (orm, api, crud, etc, api docs and best opractices.) i.e., 
  - 2 Create a UML diagram of the database
  - Ideally, generate schema FROM models as well
  - MVP

Possible Questions
- Why two main folders?
  - Can release UI updates separate from the API updates. (or why not serve the react app through the django app)
  - Will have to configure COORS :(