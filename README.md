username: marius.turalyon@outlook.com password: megaklump123

# Holidaze
Project Exam 2

![screencapture-project-exam-2-marius-saeteraas-netlify-app-2022-06-11-18_10_00](https://user-images.githubusercontent.com/71336754/173196116-16e42a46-5980-4845-ac25-33a30ed049e5.png)


This project is about creating a booking website for tourists in the area of Bergen. Where there would a user side and an administrative side. We were supposed to chose between using React or NextJS to build it on.

## Description

On the user side you will be able to browse through the availible accommodations. Furthermore, you can click it and see extensive information about the accommodation. You will also be given an option to book, if you find the item to your liking. If the user decides to book, they will be redirected to an enquiry page, where extensive information will have to be provided through a form with validations. On booking, the data will be sent to a database and can be accessed and responded to by the admin side of the website. User can also send messages through a contact form.

The admin can login using the correct credentials which is provided on top of this readme.md file. On login, a jwt will be generated and stored in the localstorage. Using this jwt, the admin will be directed to the admin page, and additional options will be provided in the navigation menu. Here the admin can view messages and enquiries. They can also create/ edit or delete accommodations. Lastly, the admin have an option to logout. Clearing the localstorage and directed to the main page. The admin section in the navigation will also be cleared.

User Pages:

- Home
- All Accommodations
- Specific Accommodation
- Contact
- Enquiry
- Login

Admin Pages:

- Admin
- All Enquiries
- All Messages
- Enquiry Specific
- Message Specific
- Manage All Accommodations
- Manage Accommodation
- Create Accommodation

## Built With

- [React.js](https://reactjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Sass](https://sass-lang.com/)
- [Axios](https://axios-http.com/docs/intro)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup Validation](https://www.npmjs.com/package/yup)
- [FortAwesome](https://fortawesome.com/)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com:Mturalyon/project-exam-2-marius-saeteraas.git
```

2. Install the dependencies:

```
npm install
```

### Running

To run the app, run the following commands:

```bash
npm run start
```

It will appear in your browser on  http://localhost:3000.

## Contact

[My LinkedIn page](https://www.linkedin.com/in/marius-s%C3%A6teraas-4395151b4/)

## Acknowledgments

I'd like to acknowledge and express gratitude towards the following names, for
voluntarily testing my website after launch:

- Oliver Grudt Berre
- Silje Hestnes
- Anne Strømsnes
- James Zhi Rong
- Trym Andre Sæteraas
