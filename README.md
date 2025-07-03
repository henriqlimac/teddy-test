# TeddyTest

This project was created as part of a front-end technical evaluation for a Mid-Level Angular Developer. It demonstrates the use of modern Angular practices, component architecture, and integration with external APIs.

## Project Overview

The objective of this project is to showcase the implementation of a clean and maintainable front-end architecture using Angular. It focuses on modular design, state management, responsive styling, and efficient data handling.

## Features

- Modular front-end built with **Angular**
- Global state management using **NgRx**
- Consumption of remote APIs with proper error handling
- Component-level **unit testing**
- Styling with **TailwindCSS** utility-first framework
- Semantic and scalable CSS structure using the **BEM** methodology
- Consistent use of modern Angular best practices

## Folder Structure

   ```bash
    teddy-test/
    │
    ├── public/                         # Static public assets
    ├── src/                            # Application source code
    │   ├── app/                        # Root Angular app module
    │   │   ├── core/                   # Core module: services, guards, models
    │   │   ├── features/               # Feature modules (e.g., customers, login)
    │   │   └── shared/                 # Shared module: reusable components, store
    │   │
    ├── angular.json                    # Angular workspace configuration
    ├── package.json                    # Project dependencies and scripts
    ├── tsconfig.json                   # TypeScript configuration
    └── README.md                       # Project documentation
   ```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/henriqlimac/teddy-test.git
   cd teddy-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the application locally:

   ```bash
   ng serve
   ```

   Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload on code changes.

## Building for Production

To build the application for production run:

```bash
ng build --configuration production
```

The compiled files will be located in the `dist/` directory.

## Deployment

### Docker

To containerize and run the application using Docker:

1. Build the Docker image:

   ```bash
   docker build -t teddy-test .
   ```

2. Run the Docker container:

   ```bash
   docker run -d -p 80:80 teddy-test
   ```

## Vercel

The application is also deployed and publicly accessible [here](https://teddy-test-six.vercel.app/).

## Objectives

- Achieve a **well-structured and maintainable codebase** following the best practices.
- Apply **component-driven development** using reusable and testable Angular components.
- Ensure **scalability** and **readability** through effective state management and separation of concerns.
- Practice professional front-end development workflows and **testing strategies**.

## Resources

- [Angular Documentation](https://angular.dev/)
- [NgRx Documentation](https://ngrx.io/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [API consumed - Swagger Docs](https://boasorte.teddybackoffice.com.br/docs#/)
