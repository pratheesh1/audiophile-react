# Audiophile

## An eCommerce Platform for audio products.

This project is called `Audiophile` and is a simple eCommerce platform for selling audio products. The project is aimed at individual vendors who want to sell their products online and customers who want to shop for these products specifically. While many general eCommerce platforms exist, there are no major platforms that cater specifically for audio products and is designed with these kinds of products in mind.

This project solves these pain points by providing a simple, yet powerful, eCommerce platform for audio products, which is accessible to both the vendor and the customer, and is designed to be easy to use and maintain.

## Index

1. [Project Design](#1-project-design)
2. [Deployment](#2-deployment)
3. [Website Features and Navigation](#3-website-features-and-navigation)
4. [Technologies Used](#4-technologies-used)
5. [Design](#5-design)
6. [Testing](#6-testing)
7. [Acknowledgements](#7-acknowledgements)

## 1. Project Design

There are two parts to this project. The product listing and order management is done with server-side rendered routes for which the code can be found in this repository. The front-end eCommerce platform is built with React.js, the source code and details of which can be found [here](https://github.com/pratheesh1/audiophile-react).

An initial thinking process and brainstorming document was created to help the team in the development of the project. The document can be found [here](https://docs.google.com/presentation/d/1WySc4aT7RTCMPersbQStq_BWSSCVUVimFh-vDrcteoU/edit?usp=sharing).

## 2. Deployment

This project is deployed on Netlify. The website can be accessed at the following link:

[https://vibrant-yalow-dab148.netlify.app/](https://vibrant-yalow-dab148.netlify.app/)

## 3. Website Features and Navigation

## 4. Technologies Used

## 5. Design

### 5.1 UI/UX

The UI/UX design for this project was done with ease of use in mind. The design process for the website are as follows:

#### 5.1.1 User Interface

User interface is designed to be intuitive and easy to use. The user can easily navigate through the website to add new products, view all listings, and view all orders. Most components are self-explanatory and easy to use.

#### 5.2.2 User Experience

Although the website makes prolific use of tables, most components except the tables are mobile-friendly. The website do not expect heavy traffic from mobile devices. All tables om mobile devices are set to scroll to provide a better user experience.

The project uses tailwindcss to create a responsive design. The website is designed to be used on a desktop, laptop, and tablet. Tailwindcss default font family is already a good fit for this website and hence not modified.
The default tailwind font family can be found in the documentation [here](https://tailwindcss.com/docs/font-family).

| Class      | Property                                                                                                                                                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| font-sans  | font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; |
| font-serif | font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;                                                                                                                                                     |
| font-mono  | font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;                                                                                                              |

The color palette for this website is designed to be light and vibrant and provide a fluid user experience. Prominent colours vary between light and dark modes. Major colors used are the following:

```
#25caac, #3f3f46, #22c55e, #d4d4d8, #27272a,  #dbeafe
```

## 6. Testing

There are no unit or integration tests for this project. E2E tests are done with [cypress](https://www.cypress.io/). A full E2E test is written for this project except for integration with stripe checkout api which cypress do not support as of now. This manual test is written for this use case.

### 6.1 Automated Tests

The following google drive folder contains a recording of the test run:

[https://drive.google.com/drive/folders/1IQQjBPDw45aud4HZ3s9hKUDvM-SvxtVI?usp=sharing](https://drive.google.com/drive/folders/1IQQjBPDw45aud4HZ3s9hKUDvM-SvxtVI?usp=sharing)

Pre-requisite for running the tests:

- The backend api is up and running.
- Update the api details in src/api/link.js
- Update the server details in the `cypress.json` file.
- In the cypress/fixtures folder, there are the following files:
  - credentials.json: contains the credentials for the user that will be used for the tests. (The user account must already be in the database)

To run the tests, run the following command in the terminal from the root directory of the project:

```

npm install
npm run test

```

The recording of the tests maybe used as a reference to duplicate a test run.

### 6.2 Manual Tests

Manual test for integration with stripe checkout api is written in the following file:

## 7. Acknowledgements

- All the images used in this project are from [unsplash.com](https://unsplash.com/), placeholders are used for the missing images from [placeholder.com](https://placeholder.com/) and brand logs are from [clearbit.com](https://clearbit.com/logo).
- All code snippets and templates used in this project are attributed in the source code where applicable.
