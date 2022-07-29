# MVP Project - Wages for Care Work

## Setup

### Dependencies

- Run `yarn` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `yarn`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called facebook: `create database patriarchy`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=patriarchy
  DB_PASS=YOURPASSWORD
```

- Run `yarn migrate` in the project folder of this repository, in a new terminal window. This will create four tables called 'invoices', 'categories', 'statistic_data' and 'invoice_items' in your database.

- Make sure you understand how the tables are constructed. In your MySQL console, you can run `use patriarchy;` and then `describe [table];` to see the structure of the table.


### Development

- Run `yarn start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `yarn start` to start the client in development mode with hot reloading in port 3000.

## Databases
![Tables of database](/img/DB_schema.png)
### Overview
`categories`: this holds the categories that users can choose for their invoice (might be added more in the future)
- every category has an ID to be referenced in the `invoice_items` table

`statistic_data`: this will hold the statistic data that users input in the first form.
- because this data is only posted to the DB when submit on the "invoice form" is pressed, there will always be as many entries in the `statistic_data` table as in the `invoices` table and they have a 1-to-1 relationship, so invoices.id=1 === statistic_data.id = 1

`invoices`: this will hold the invoice data that users input in the second form (To, From, Date etc.)
- every invoice has an ID to be referenced in the `invoice_items` table and to get matched with `statistic_data` table

`invoice_items`: this will hold all the data (rate, hours, amount) for each category on the invoice (the invoice items)
- every entry refers to #1 the category(id) that this row is about and #2 the invoice(id) this entry is connected to

### Default data
- there are already 9 categories in `categories` and 1 user entry in the init_db.sql file, so 1 entry in `statistic_data`, 1 entry in `invoices` and 9 entries in `invoice_items` (because each invoice always has one entry for each category, if user didn't fill it out the values will be set to 0)

## Used technologies
- Frontend: React, React Router, Bootstrap 5
- Backend: Express.js, Node.js
- Database: MySQL

## How to use the app
### Create Invoice
- Click on `Create Invoice` in the Navbar
- Type in all the demographic data, radio buttons don't have default value but are required, so one option must be chosen
- When finished click `Continue`-Button
- Enter contact data in form, field in email input must match email format (so include @, see Bootstrap documentation for more details)
- Enter Rate, Hours, Amount for category items you want to include
- default value for hours (+ amount) is 0, so if you don't want to use one item either leave it on default value or unclick checkbox (will set to 0 and grey it out)
- Click `Submit`Button
### View created invoice
- clicking `Submit` brings you to invoice view
- BUG: if it doesn't show your invoice (but instead the one before) click reload and this will show your invoice (doesn't happen always)
### View statistics
- choose `General` or `Specify` to choose statistics view
- `General` will show number of invoices in DB, combined number of hours and amount averages (rate, hours, amount) for all categories
- in `Specify` you can filter invoices in DB by selecting checkboxes, at the moment only possible for Relationship style, click `Show` Button to display results
- BUG: you have to at least select two checkboxes, otherwise it doesn't work (because it uses SQL SELECT IN and at least needs two arguments), haven't had time to fix this

## Possible Feature Extensions
### Bug List
- the way the last Invoice is retrieved from the Database for the InvoiceDocView (maybe not include global variable in the invoice route), don't know why it's sometimes working and sometimes not
- filtering in specify statistics should also work with only one chosen clickbox (e.g. only "queer")
- after clicking "Show" in Specify statistics page checkboxes should be unchecked to give some feedback for the user (and also what should happen with the form when the results are shown, should it direct to an other view?)

### Feature Extensions
- User View: so users can create account, log in, then create invoices, so in their account they can view their old invoices, edit them, copy them
- Extended Specify Statistics Extension: use all the paramters from the Demographic Data form to filter invoices
- More useful display of results from Specify Statistics Query: right now it's showing all invoice entries that match these criteria underneath each other, maybe an average would be more useful? Or a card view?
- InvoiceDocView: only showing invoice items where hours (+ amount) > 0, right now it's showing all, also the ones user didn't fill in
- Default data for forms: using data from statistics page as default data in form (e.g. with a dropdown menu)

## Useful resources
- Query Parameters in Express: https://masteringjs.io/tutorials/express/query-parameters
- Similiar Website: https://www.billthepatriarchy.com/ 