# Rails Nextjs Tailwind Starter

A starting point for your Ruby on Rails, PostgreSQL, Next.js, and Tailwind CSS project.

## Table of Contents 

- [Setup](#setup)
- [Contributing](#contributing)
- [License](#license)

## Setup

### Backend (Ruby on Rails) & Frontend (Next.js)

1. Clone the repository:

   ```bash
    git clone https://github.com/mdromi/rails-nextjs-starter
   ``` 
   or
   ```bash
    gh repo clone mdromi/rails-nextjs-starter
   ``` 
2. Navigate to the backend directory:
    ```bash
    cd rails-nextjs-starter
    ```
3. Install dependencies:
    ```bash
    bundle install
    ```
4.  Rename the `.env.example` file to `.env`
    ```bash
    mv .env.example .env
    ```
4.  Add your database information
    ```bash
    # FOR DATABASE
    DATABASE_NAME_DEVELOPMENT=your_app_name_development
    DATABASE_NAME_TEST=your_app_name_test
    DATABASE_NAME_PRODUCTION=your_app_name_productions
    DATABASE_USERNAME=your_database_username
    DATABASE_PASSWORD=your_database_password
    ```
5. Setup SMTP Server
    ```bash
    # SETTING UP SMTP SERVER
    GMAIL_USERNAME=your_gmail_username
    GMAIL_PASSWORD=your_gmail_password
    ```
4. Setup the database:
    ```bash
    rails db:create
    rails db:migrate
    ```
5. Install dependencies frontend
    ```bash
    cd frontend && yarn install && cd ..
    ```
6. Start the servers using the provided script:
    ```bash
    ./start-servers.sh
    ```
This script will start both the Rails backend server and the Next.js frontend server concurrently.

Access the frontend application at [http://localhost:5100](http://localhost:5100) in your web browser.

Access the backend API endpoints at [http://localhost:3001/api/v1](http://localhost:3001/api/v1).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
