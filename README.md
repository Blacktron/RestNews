# News

### Prerequisites
1. Download and install Node.js (LTS version preferably) from [here](https://nodejs.org/en/download)
2. Verify the installation is completed by executing the following commands after restarting the computer. You should see version numbers for both.
   - **node -v**
   - **npm -v** 
3. Download and install Docker from [here](https://docs.docker.com/get-docker/)
4. Download the files from the repository (or clone it). If you downloaded the archive - unpack it in a selected directory.

### How to run the application locally
1. Open a Terminal or Command Prompt in Windows
2. Navigate to the directory where you placed the files from the repository
3. Execute command **docker compose up --build**
4. Once you see the message *Server is running on port 3000* you can access the application through a browser (or Postman for example)
   with the following URL: **http://localhost:3000/v1/news**

### How to sort the news
You can sort the news by date and/or title. To do that, you have to add **sort=date** or **sort=title** query parameter to the **/v1/news** endpoint.
Example URL: **http://localhost:3000/v1/news?sort=title**
Additionally, you can sort by both date and title.
Example URL: **http://localhost:3000/v1/news?sort=date,title**
Results can be sorting in ascending or descending by providing **orderBy** query parameter. The value of the parameter can be 
**desc**, **descending**, **asc**, **ascending** in both lowercase and uppercase.

Note: the entities are sorted in ascending by default

### How to filter the news
You can filter the news by date and/or title. To do that, you have to add **filter=date** or **filter=title** query parameter.
To filter by date you can provide the **startDate** and **endDate** query parameters. If only **startDate** is provided, the
results will be filtered from date on. When you provide both **startDate** and **endDate** the result will be filtered and show
news with dates between the mention criteria. The date must be in the format YYYY-DD-MM.
Example URL: **http://localhost:3000/v1/news?filter=date&startDate=2024-08-12&endDate=2024-08-14** This will output all
news with date between 2024-08-12 and 2024-08-14. If only **endDate** is provided an error message will be displayed
asking to provide **startDate** as well.
To filter by title you need to provide the **searchTitle** query parameter in addition to **filter=title**.
Example URL: **http://localhost:3000/v1/news?filter=title&searchTitle=testing**
Additionally, you can filter by both date and title.
Example URL: **http://localhost:3000/v1/news?filter=date,title&startDate=2024-08-12&endDate=2024-08-14&searchTitle=testing**

### How to add news
To add a new news to the database, you need to make a POST request to the **http://localhost:3000/v1/news** endpoint by providing
the date, title, short description, and text in the request body. This can be done by using Postman for example.
```
{
    "date": "2024-08-14",
    "title": "Docker",
    "shortDescription": "Adding new entry",
    "text": "Testing from docker"
}
```

### How to update news
To update a news entity, you need to make a PUT request to the **http://localhost:3000/v1/news** endpoint by providing
the date, title, short description, and text in the request body. This can be done by using Postman for example.
```
{
    "date": "2024-08-14",
    "title": "Docker",
    "shortDescription": "Adding new entry",
    "text": "Testing from docker"
}
```
