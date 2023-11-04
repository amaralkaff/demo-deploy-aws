[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12632728&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# API Documentation

## Routes

### 1. POST Created Job /jobs

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Request Body:

```json
{
  "title": "Software Engineer",
  "description": "We are hiring a software engineer...",
  "imgUrl": "https://example.com/image.png",
  "jobType": "full time",
  "companyId": 1,
  "authorId": 2
}
```

Response (201 - Created):

```json
{
    "message": "Job created successfully",
    "data": {
        "id": 10,
        "title": "Software Engineer",
        "description": "We are hiring a software engineer...",
        "imgUrl": "https://example.com/image.png",
        "jobType": "full time",
        "companyId": 1,
        "authorId": 2,
        "updatedAt": "2023-10-30T15:27:21.097Z",
        "createdAt": "2023-10-30T15:27:21.097Z"
    }
}
```

Response (400 - Bad Request):

```json
{
  "message": "Invalid data type"
},
{
    "errors": [
        "Title cannot be empty",
        "Description cannot be empty",
        "Image URL cannot be empty",
        "Job type cannot be empty",
        "Company ID cannot be empty",
        "Author ID cannot be empty"
    ]
}
```

Response (500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 2. GET Readed Job /jobs

Request Body:

```json
{
    "massage": "Jobs found successfully",
    "data": [
        {
            "id": 4,
            "title": "Software Engineer",
            "description": "Develop software applications for clients.",
            "imgUrl": "https://example.com/software-engineer.jpg",
            "jobType": "full time",
            "companyId": 1,
            "authorId": 1,
            "Company": {
                "id": 1,
                "name": "Tech Innovators",
                "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "New York, NY",
                "email": "info@techinnovators.com",
                "description": "Tech Innovators is a leading technology company specializing in software development."
            }
        },
        {
            "id": 5,
            "title": "Marketing Specialist",
            "description": "Create and execute marketing campaigns.",
            "imgUrl": "https://example.com/marketing-specialist.jpg",
            "jobType": "part time",
            "companyId": 2,
            "authorId": 2,
            "Company": {
                "id": 2,
                "name": "Marketing Pros",
                "companyLogo": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "Los Angeles, CA",
                "email": "info@marketingpros.com",
                "description": "Marketing Pros is a marketing agency delivering top-notch solutions to clients."
            }
        },
        {
            "id": 7,
            "title": "asdasdads",
            "description": "asdasdsads",
            "imgUrl": "asdsadsasd",
            "jobType": "part time",
            "companyId": 1,
            "authorId": 1,
            "Company": {
                "id": 1,
                "name": "Tech Innovators",
                "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "New York, NY",
                "email": "info@techinnovators.com",
                "description": "Tech Innovators is a leading technology company specializing in software development."
            }
        },
        {
            "id": 8,
            "title": "asdasdaaaads",
            "description": "asdasdsads",
            "imgUrl": "asdsadsasd",
            "jobType": "part time",
            "companyId": 1,
            "authorId": 1,
            "Company": {
                "id": 1,
                "name": "Tech Innovators",
                "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "New York, NY",
                "email": "info@techinnovators.com",
                "description": "Tech Innovators is a leading technology company specializing in software development."
            }
        }
    ]
}
```

Response (500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 3. GET Readed Job By Id /jobs/:id

Request:

```json
GET /jobs/4
```

Response (Status 200 - OK):

```json
{
    "message": "Job found successfully",
    "data": {
        "id": 4,
        "title": "Software Engineer",
        "description": "Develop software applications for clients.",
        "imgUrl": "https://example.com/software-engineer.jpg",
        "jobType": "full time",
        "companyId": 1,
        "authorId": 1,
        "Company": {
            "id": 1,
            "name": "Tech Innovators",
            "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "location": "New York, NY",
            "email": "info@techinnovators.com",
            "description": "Tech Innovators is a leading technology company specializing in software development."
        }
    }
}
```

Response (Status 404 - Not Found):

```json
{
  "message": "Job not found"
}
```

 Response (Status 500 - Internal Server Error):
 
 ```json
{
  "message": "Internal server error"
}
```

### 4. PUT Updated Job /jobs/:id

Request:

```json
PUT /jobs/7
{
  "title": "Updated Software Engineer",
  "description": "We are updating the software engineer job...",
  "companyId": 2
}
```

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Response (Status 200 - OK):

```json
{
    "message": "Job updated successfully",
    "data": {
        "id": 7,
        "title": "Updated Software Engineer",
        "description": "We are updating the software engineer job...",
        "imgUrl": "asdsadsasd",
        "jobType": "part time",
        "companyId": 2,
        "authorId": 1,
        "createdAt": "2023-10-30T11:41:08.403Z",
        "updatedAt": "2023-10-30T15:35:25.976Z"
    }
}
```

Response (Status 400 - Bad Request):

```json
{
  "message": "Invalid data type"
},
{
    "errors": [
        "Description cannot be empty",
        "Image URL cannot be empty",
        "Job type cannot be empty",
        "Company ID cannot be empty",
        "Author ID cannot be empty"
    ]
}
```

Response (Status 404 - Not Found):

```json
{
  "message": "Job not found"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 5. DELETE Deleted Job /jobs/:id

Request:

```json
DELETE /jobs/7
```

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Response (Status 200 - OK):

```json
{
    "message": "Job deleted successfully"
}
```

Response (Status 404 - Not Found):

```json
{
  "message": "Job not found"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 6. POST Created Company /companies

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Request Body:

```json
{
  "name": "TechCo Inc.",
  "companyLogo": "https://example.com/logo.png",
  "location": "San Francisco, CA",
  "email": "contact@techco.com",
  "description": "A tech company specializing in..."
}
```

 Response (Status 201 - Created):
 
 ```json
 {
    "message": "Company created successfully",
    "data": {
        "id": 8,
        "name": "TechCo Inc.",
        "companyLogo": "https://example.com/logo.png",
        "location": "San Francisco, CA",
        "email": "contact@techco.com",
        "description": "A tech company specializing in...",
        "updatedAt": "2023-10-30T16:00:19.376Z",
        "createdAt": "2023-10-30T16:00:19.376Z"
    }
}
```

Response (Status 400 - Bad Request):

```json
{
  "message": "Invalid data type"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 7. GET Readed Company /companies

Request:

```json
GET /companies
```

Response (Status 200 - OK):

```json
{
    "massage": "Companies found successfully",
    "data": [
        {
            "id": 1,
            "name": "Tech Innovators",
            "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "location": "New York, NY",
            "email": "info@techinnovators.com",
            "description": "Tech Innovators is a leading technology company specializing in software development.",
            "Jobs": [
                {
                    "id": 4,
                    "title": "Software Engineer",
                    "description": "Develop software applications for clients.",
                    "imgUrl": "https://example.com/software-engineer.jpg",
                    "jobType": "full time",
                    "companyId": 1,
                    "authorId": 1
                },
                {
                    "id": 8,
                    "title": "asdasdaaaads",
                    "description": "asdasdsads",
                    "imgUrl": "asdsadsasd",
                    "jobType": "part time",
                    "companyId": 1,
                    "authorId": 1
                },
                {
                    "id": 9,
                    "title": "Software Engineer",
                    "description": "\"We are hiring a software engineer...",
                    "imgUrl": "https://example.com/image.png",
                    "jobType": "full time",
                    "companyId": 1,
                    "authorId": 2
                },
                {
                    "id": 10,
                    "title": "Software Engineer",
                    "description": "We are hiring a software engineer...",
                    "imgUrl": "https://example.com/image.png",
                    "jobType": "full time",
                    "companyId": 1,
                    "authorId": 2
                }
            ]
        },
        {
            "id": 2,
            "name": "Marketing Pros",
            "companyLogo": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "location": "Los Angeles, CA",
            "email": "info@marketingpros.com",
            "description": "Marketing Pros is a marketing agency delivering top-notch solutions to clients.",
            "Jobs": [
                {
                    "id": 5,
                    "title": "Marketing Specialist",
                    "description": "Create and execute marketing campaigns.",
                    "imgUrl": "https://example.com/marketing-specialist.jpg",
                    "jobType": "part time",
                    "companyId": 2,
                    "authorId": 2
                }
            ]
        },
        {
            "id": 8,
            "name": "TechCo Inc.",
            "companyLogo": "https://example.com/logo.png",
            "location": "San Francisco, CA",
            "email": "contact@techco.com",
            "description": "A tech company specializing in...",
            "Jobs": []
        },
        {
            "id": 6,
            "name": "Design Wizards",
            "companyLogo": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2564&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "location": "Chicago, IL",
            "email": "info@designpro.com",
            "description": "Design Wizards is a design agency specializing in branding and web design.",
            "Jobs": []
        },
        {
            "id": 4,
            "name": "Tech Innovators",
            "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "location": "New York, NY",
            "email": "info@techinnovators.com",
            "description": "Tech Innovators is a leading technology company specializing in software development.",
            "Jobs": []
        },
        {
            "id": 3,
            "name": "Design Wizards",
            "companyLogo": "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2564&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "location": "Chicago, IL",
            "email": "info@designpro.com",
            "description": "Design Wizards is a design agency specializing in branding and web design.",
            "Jobs": []
        },
        {
            "id": 7,
            "name": "asdasd",
            "companyLogo": "asdasdsadssdasd",
            "location": "asdsad",
            "email": "palpale1@gmail.com",
            "description": "asidhakjsdhk ajdhnkjahsdk kajhdfkjahk f",
            "Jobs": []
        }
    ]
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 8. PUT Updated Company /companies/:id

Request:

```json
PUT /companies/1
```

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Response (Status 200 - OK):

```json
{
  "message": "Company updated successfully",
  "data": {
    "name": "Updated TechCo Inc.",
    "companyLogo": "https://example.com/logo.png",
    "location": "Updated San Francisco, CA",
    "email": "updated@techco.com",
    "description": "A tech company specializing in..."
  }
}
```

Response (Status 404 - Not Found):

 ```json
{
  "message": "Company not found"
}
```

Response (Status 400 - Bad Request):

```json
{
  "message": "Invalid data type"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 9. DELETE Deleted Company /companies/:id

Request:

```json
DELETE /companies/3
```

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Response (Status 200 - OK):

```json
{
  "message": "Company deleted successfully"
}
```

Response (Status 404 - Not Found):

```json
{
  "message": "Company not found"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 10. GET Readed Jobs Public /public/jobs 

Request:

```json
GET /public/jobs
```

Response (Status 200 - OK):

```json
{
    "massage": "Jobs found successfully",
    "data": [
        {
            "id": 4,
            "title": "Software Engineer",
            "description": "Develop software applications for clients.",
            "imgUrl": "https://example.com/software-engineer.jpg",
            "jobType": "full time",
            "companyId": 1,
            "authorId": 1,
            "Company": {
                "id": 1,
                "name": "TechCo Inc.as",
                "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "https://example.com/logo.png",
                "email": "updated@techco.com",
                "description": "Tech Innovators is a leading technology company specializing in software development."
            }
        },
        {
            "id": 5,
            "title": "Marketing Specialist",
            "description": "Create and execute marketing campaigns.",
            "imgUrl": "https://example.com/marketing-specialist.jpg",
            "jobType": "part time",
            "companyId": 2,
            "authorId": 2,
            "Company": {
                "id": 2,
                "name": "Marketing Pros",
                "companyLogo": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "Los Angeles, CA",
                "email": "info@marketingpros.com",
                "description": "Marketing Pros is a marketing agency delivering top-notch solutions to clients."
            }
        },
        {
            "id": 8,
            "title": "asdasdaaaads",
            "description": "asdasdsads",
            "imgUrl": "asdsadsasd",
            "jobType": "part time",
            "companyId": 1,
            "authorId": 1,
            "Company": {
                "id": 1,
                "name": "TechCo Inc.as",
                "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "https://example.com/logo.png",
                "email": "updated@techco.com",
                "description": "Tech Innovators is a leading technology company specializing in software development."
            }
        },
        {
            "id": 9,
            "title": "Software Engineer",
            "description": "\"We are hiring a software engineer...",
            "imgUrl": "https://example.com/image.png",
            "jobType": "full time",
            "companyId": 1,
            "authorId": 2,
            "Company": {
                "id": 1,
                "name": "TechCo Inc.as",
                "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "https://example.com/logo.png",
                "email": "updated@techco.com",
                "description": "Tech Innovators is a leading technology company specializing in software development."
            }
        },
        {
            "id": 10,
            "title": "Software Engineer",
            "description": "We are hiring a software engineer...",
            "imgUrl": "https://example.com/image.png",
            "jobType": "full time",
            "companyId": 1,
            "authorId": 2,
            "Company": {
                "id": 1,
                "name": "TechCo Inc.as",
                "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "location": "https://example.com/logo.png",
                "email": "updated@techco.com",
                "description": "Tech Innovators is a leading technology company specializing in software development."
            }
        }
    ]
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 11. GET Readed Job By Id Public /public/jobs/:id

Request:

```json
GET /public/jobs/4
```

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Response (Status 200 - OK):

```json
{
    "message": "Job found successfully",
    "data": {
        "id": 4,
        "title": "Software Engineer",
        "description": "Develop software applications for clients.",
        "imgUrl": "https://example.com/software-engineer.jpg",
        "jobType": "full time",
        "companyId": 1,
        "authorId": 1,
        "Company": {
            "id": 1,
            "name": "TechCo Inc.as",
            "companyLogo": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=2531&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "location": "https://example.com/logo.png",
            "email": "updated@techco.com",
            "description": "Tech Innovators is a leading technology company specializing in software development."
        }
    }
}
```

Response (Status 404 - Not Found):

```json
{
  "message": "Job not found"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 12. POST Added User /add-user

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Request Body:

```json
{
  "email": "user8@example.com",
  "password": "securepassword18",
  "phoneNumber": "02384897489",
  "address": "jalan jalan saja",
  "username": "testing18"
}
```

Response (Status 201 - Created):

```json
{
    "data": {
        "id": 14,
        "email": "user8@example.com",
        "password": "$2a$10$IebjE8hBlskhrH.ZBS6eluQRLwy/f0Y962Cu.OFfIR2WY1cJ6GiR.",
        "phoneNumber": "02384897489",
        "address": "jalan jalan saja",
        "username": "testing18",
        "updatedAt": "2023-10-30T17:43:46.772Z",
        "createdAt": "2023-10-30T17:43:46.772Z",
        "role": "staff"
    }
}
```

Response (Status 401 - Unauthorized):

```json
{
  "message": "Invalid email or password"
}
```

Response (Status 400 - Bad Request):

```json
{
  "message": "Invalid data type"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```

### 13. POST Login User /login

Request Header:

```json
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjhAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTg3MTk4NDB9.tqFJFxVUFChHreghxmDEEz_vmxYKPwpqiYqMYYP-vlw
```

Request Body:

```json
{
  "email": "user3@example.com",
  "password": "securepassword13"
}
```

Response (Status 200 - OK):

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4"
}
```

Response (Status 401 - Unauthorized):

```json
{
  "message": "Invalid email or password"
}
```

Response (Status 400 - Bad Request):

```json
{
  "message": "Password and email cannot be empty"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}

```

### 14. PATCH Updated Image /jobs/:id

Request Header:

```json
bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiZW1haWwiOiJ1c2VyM0BleGFtcGxlLmNvbSIsImlhdCI6MTY5ODY4NTE3OX0.r1BrW2azkbd3ZdRopIX1kolaOO6CoW04ivITCVlxJE4>
```

Request body:

```json
{
  "file": "palms-icon-logo-vector-design-template_827767-3847.jpg"
}
```

Response (Status 200 - OK):

```json
{
    "message": "Image updated successfully",
    "data": {
        "id": 1,
        "title": "Software Engineer",
        "description": "Develop software applications for clients.",
        "imgUrl": "https://ik.imagekit.io/zxd7og7yx/palms-icon-logo-vector-design-template_827767-3847_hk9HiwnTD.jpg",
        "jobType": "full time",
        "companyId": 1,
        "authorId": 1,
        "createdAt": "2023-11-04T08:38:03.606Z",
        "updatedAt": "2023-11-04T08:38:44.020Z"
    }
}
```

Response (Status 404 - Not Found):

```json
{
  "message": "Job not found"
},
{
  "message": "Image not found"
}
```

Response (Status 400 - Bad Request):

```json
{
  "message": "Image file cannot be empty"
}
```

Response (Status 500 - Internal Server Error):

```json
{
  "message": "Internal server error"
}
```


































