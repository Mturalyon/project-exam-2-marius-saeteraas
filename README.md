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

This is where you list how to get the project started. It typically just includes telling a person to clone the repo and then to install the dependencies e.g.

1. Clone the repo:

```bash
git clone git@github.com:NoroffFEU/portfolio-1-example.git
```

2. Install the dependencies:

```
npm install
```

### Running

Here is where you detail how to run the app. It typically involves the commands you'd need to run to start the project e.g.

To run the app, run the following commands:

```bash
npm run start
```

## Contributing

Here you can detail any information you want to provide regarding contributing to the project. For big projects you will usually have a separate `CONTRIBUTING.md` and link to it, but for smaller projects you can simply include instructions here. These instructions can simply detail the process you want a person to take, such as to make sure to open a pull request so code can be reviewed.

## Contact

This is where you can leave your social links for people to contact you, such as a LinkedIn profile or Twitter link e.g.

[My Twitter page](www.twitter.com)

[My LinkedIn page](www.linkedin.com)

## License

You can link to your license file here if you're using one, or mention what license the codebase falls under. If you're unsure then you can simply delete this section.

## Acknowledgments

This is where you can add any acknowledgements if you'd like, such as to people who have helped you or any code snippets you'd like to mention. You can delete this section if you don't have any acknowledgements to make.
