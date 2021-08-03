
# ExamGen



## Indices

* [Authorization](#authorization)

* [Checking Service](#checking-service)

  * [Ping Request](#1-ping-request)

* [Questions](#questions)

  * [List all Questions](#1-list-all-questions)
  * [List full details of a Question](#2-list-full-details-of-a-question)
  * [Create a new Open Answer Question](#3-create-a-new-open-answer-question)
  * [Create a new Multi Answer Question](#4-create-a-new-multi-answer-question)
  * [Update a Question](#5-update-a-question)
  * [Delete a Question](#6-delete-a-question)
  * [Delete all Questions](#7-delete-all-questions)

* [Questions' Subject](#questions'-subject)

  * [List all Subjects](#1-list-all-subjects)
  * [List Questions by Subject](#2-list-questions-by-subject)
  * [Rename Subject](#3-rename-subject)
  * [Delete Subject](#4-delete-subject)

* [Questions' Category](#questions'-category)

  * [List all Categories of a Subject](#1-list-all-categories-of-a-subject)
  * [List Questions by Subject and Category](#2-list-questions-by-subject-and-category)
  * [Rename Subject's Category](#3-rename-subject's-category)
  * [Delete Category](#4-delete-category)

* [Exams](#exams)

  * [List all past Exams](#1-list-all-past-exams)
  * [List all past Exams by Subject](#2-list-all-past-exams-by-subject)
  * [List full details of a Exam](#3-list-full-details-of-a-exam)
  * [Generate PDF of a past Exam](#4-generate-pdf-of-a-past-exam)
  * [Generate a new Exam](#5-generate-a-new-exam)
  * [Delete a Exam](#6-delete-a-exam)
  * [Delete all Exams](#7-delete-all-exams)


--------


## Authorization

>_Every endpoint requires an API KEY. The API is set by the service's administrator on the .env file and must be sent with the "Authorization" header on the HTTP Request!_


## Checking Service



### 1. Ping Request



***Endpoint:***

```bash
Method: POST
Type: 
URL: localhost:5000/api/ping
```



***More example Requests/Responses:***


##### I. Example Request: Successful Ping



##### I. Example Response: Successful Ping
```js
{
    "status": "success",
    "result": "pong"
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Ping



##### II. Example Response: Failed Ping
```js
{
    "status": "error",
    "result": "The API KEY is invalid"
}
```


***Status Code:*** 403

<br>



## Questions



### 1. List all Questions



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/question
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": [
        {
            "_id": "60fed9ec1db0d90980dad073",
            "subject": "Web Programming",
            "category": "PHP",
            "title": "Is PHP a nice language?",
            "answerTypology": "multi"
        },
        {
            "_id": "60feda091db0d90980dad075",
            "subject": "Web Programming",
            "category": "JS",
            "title": "Is JS a nice language?",
            "answerTypology": "text"
        },
        {
            "_id": "60fedfbd1db0d90980dad07e",
            "subject": "Mobile Programming",
            "category": "Kotlin",
            "title": "Is Companion Object a nice feature?",
            "answerTypology": "text"
        },
        {
            "_id": "60fee0251db0d90980dad080",
            "subject": "Mobile Programming",
            "category": "Android",
            "title": "Which state is called once on a view life-cycle?",
            "answerTypology": "multi"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 2. List full details of a Question



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/question/:QuestionID
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID |  | The ID of the question you want to explore |



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID | 60fee0251db0d90980dad080 | The ID of the question you want to explore |



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": {
        "_id": "60fee0251db0d90980dad080",
        "subject": "Mobile Programming",
        "category": "Android",
        "title": "Which state is called once on a view life-cycle?",
        "answerTypology": "multi",
        "answers": [
            {
                "text": "onStop"
            },
            {
                "text": "onPause"
            },
            {
                "text": "onResume"
            },
            {
                "text": "onCreate"
            }
        ],
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Listing (400)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID | 12234 | The ID of the question you want to explore |



##### II. Example Response: Failed Listing (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Listing (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID | 60fee0251db0d90980dad079 | The ID of the question you want to explore |



##### III. Example Response: Failed Listing (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



### 3. Create a new Open Answer Question



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:5000/api/question/
```



***Body:***

```js        
{
  "subject": "Name of the related subject",
  "category": "Name of the related category",
  "title": "Question's title, the main question which usually ends with '?'",
  "optionalSubContent": "Optional field to add a sub context to the question",
  "answerTypology": "text"
}
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Creation



***Body:***

```js        
{
  "subject": "Advanced Mathematics",
  "category": "Complex Calculus",
  "title": "What is 4 plus 4?",
  "optionalSubContent": "Be careful, 'plus' means '+'!",
  "answerTypology": "text"
}
```



##### I. Example Response: Successfull Creation
```js
{
    "status": "success",
    "result": {
        "_id": "60fee5b01db0d90980dad087",
        "subject": "Advanced Mathematics",
        "category": "Complex Calculus",
        "title": "What is 4 plus 4?",
        "optionalSubContent": "Be careful, 'plus' means '+'!",
        "answerTypology": "text",
        "answers": [],
        "__v": 0
    }
}
```


***Status Code:*** 201

<br>



##### II. Example Request: Failed Creation (400)



***Body:***

```js        
{
  "subject": "Advanced Mathematics",
  "title": "What is 4 plus 4?",
  "optionalSubContent": "Be careful, 'plus' means '+'!"
}
```



##### II. Example Response: Failed Creation (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



### 4. Create a new Multi Answer Question



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:5000/api/question/
```



***Body:***

```js        
{
  "subject": "Name of the related subject",
  "category": "Name of the related category",
  "title": "Question's title, the main question which usually ends with '?'",
  "optionalSubContent": "Optional field to add a sub context to the question",
  "answerTypology": "multi",
  "answers": [
    {
      "text": "An answer"
    },
    ...
  ]
}
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Creation



***Body:***

```js        
{
  "subject": "Mobile Programming",
  "category": "Android",
  "title": "Which state is called once on a view life-cycle?",
  "optionalSubContent": "Remember the state switching of android applications!",
  "answerTypology": "multi",
  "answers": [
    {
      "text": "onStop"
    },
    {
      "text": "onPause"
    },
    {
      "text": "onResume"
    },
    {
      "text": "onCreate"
    }
  ]
}
```



##### I. Example Response: Successfull Creation
```js
{
  "status": "success",
  "result": {
    "_id": "60fee7ad1db0d90980dad089",
    "subject": "Mobile Programming",
    "category": "Android",
    "title": "Which state is called once on a view life-cycle?",
    "optionalSubContent": "Remember the state switching of android applications!",
    "answerTypology": "multi",
    "answers": [
      {
        "text": "onStop"
      },
      {
        "text": "onPause"
      },
      {
        "text": "onResume"
      },
      {
        "text": "onCreate"
      }
    ],
    "__v": 0
  }
}
```


***Status Code:*** 201

<br>



##### II. Example Request: Failed Creation (400)



***Body:***

```js        
{
  "category": "Android",
  "optionalSubContent": "Remember the state switching of android applications!",
  "answerTypology": "multi",
  "answers": [
    {
      "text": "onStop"
    },
    {
      "text": "onPause"
    },
    {
      "text": "onResume"
    },
    {
      "text": "onCreate"
    }
  ]
}
```



##### II. Example Response: Failed Creation (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



### 5. Update a Question



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:5000/api/question/:QuestionID
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID |  | The ID of the question you want to update |



***Body:***

```js        
{
  "subject": "New name of the related subject",
  "category": "New name of the related category",
  "title": "New question's title, the main question which usually ends with '?'",
  "optionalSubContent": "New optional field to add a sub context to the question",
  "answerTypology": "text"
  !!! OR !!!
  "answerTypology": "multi",
  "answers": [
    {
      "text": "An answer"
    },
    ...
  ]
}
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Update



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID | 60fee5b01db0d90980dad087 | The ID of the question you want to update |



***Body:***

```js        
{
  "subject": "Advanced Mathematics",
  "category": "Complex Calculus",
  "title": "What is 4 plus 4?",
  "optionalSubContent": "Be careful, 'plus' means '+'!",
  "answerTypology": "multi",
  "answers": [
      {
          "text": "2"
      },
      {
          "text": "8"
      },
      {
          "text": "16"
      }
  ]
}
```



##### I. Example Response: Successfull Update
```js
{
    "status": "success",
    "result": {
        "_id": "60fee5b01db0d90980dad087",
        "subject": "Advanced Mathematics",
        "category": "Complex Calculus",
        "title": "What is 4 plus 4?",
        "optionalSubContent": "Be careful, 'plus' means '+'!",
        "answerTypology": "multi",
        "answers": [
            {
                "text": "2"
            },
            {
                "text": "8"
            },
            {
                "text": "16"
            }
        ],
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Update (400)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID | 60fee5b01db0d90980dad087 | The ID of the question you want to update |



***Body:***

```js        
{
  "subject": "Advanced Mathematics",
  "title": "What is 4 plus 4?",
  "optionalSubContent": "Be careful, 'plus' means '+'!"
}
```



##### II. Example Response: Failed Update (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Update (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID | 60fee5b01db0d90980dad012 | The ID of the question you want to update |



***Body:***

```js        
{
  "subject": "Advanced Mathematics",
  "category": "Complex Calculus",
  "title": "What is 4 plus 4?",
  "optionalSubContent": "Be careful, 'plus' means '+'!",
  "answerTypology": "multi",
  "answers": [
      {
          "text": "2"
      },
      {
          "text": "8"
      },
      {
          "text": "16"
      }
  ]
}
```



##### III. Example Response: Failed Update (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 200

<br>



### 6. Delete a Question



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: localhost:5000/api/question/:QuestionID
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID |  | The ID of the question you want to delete |



***More example Requests/Responses:***


##### I. Example Request: Successfull Deletion



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID |  | The ID of the question you want to delete |



##### I. Example Response: Successfull Deletion
```js
{
    "status": "success",
    "result": {
        "_id": "60feda091db0d90980dad075",
        "subject": "Web Programming",
        "category": "JS",
        "title": "Is JS a nice language?",
        "answerTypology": "text",
        "answers": [],
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Deletion (400)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID | 1234 | The ID of the question you want to delete |



##### II. Example Response: Failed Deletion (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Deletion (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| QuestionID | 60fee0251db0d90980dad079 | The ID of the question you want to delete |



##### III. Example Response: Failed Deletion (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



### 7. Delete all Questions



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: localhost:5000/api/question/all
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Deletion



##### I. Example Response: Successfull Deletion
```js
{
    "status": "success",
    "result": {
        "deletions": 999
    }
}
```


***Status Code:*** 200

<br>



## Questions' Subject



### 1. List all Subjects



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/subject
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": [
        {
            "_id": "Web Development",
            "count": 21
        },
        {
            "_id": "Mobile Development",
            "count": 33
        },
        {
            "_id": "Networking",
            "count": 2
        },
        {
            "_id": "Internet Security",
            "count": 99
        }
    ]
}
```


***Status Code:*** 200

<br>



### 2. List Questions by Subject



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/subject/:SubjectName
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName |  | The name of the subject of the questions you want to list |



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject of the questions you want to list |



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": [
        {
            "_id": "60fed9ec1db0d90980dad073",
            "category": "PHP",
            "title": "Is PHP a nice language?",
            "answerTypology": "multi"
        },
        {
            "_id": "60feda091db0d90980dad075",
            "category": "JS",
            "title": "Is JS a nice language?",
            "answerTypology": "text"
        }
    ]
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Listing (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Studies | The name of the subject of the questions you want to list |



##### II. Example Response: Failed Listing (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



### 3. Rename Subject



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:5000/api/subject/:SubjectName
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName |  | The name of the subject that you want to change |



***Body:***

```js        
{
    "name": "NewName"
}
```



***More example Requests/Responses:***


##### I. Example Request: Successful Rename



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | BackEnd | The name of the subject that you want to change |



***Body:***

```js        
{
    "name": "BackEndDevelopment"
}
```



##### I. Example Response: Successful Rename
```js
{
    "status": "success",
    "result": {
        "updates": 6
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Rename (400)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject that you want to change |
| QuestionID | 60fee5b01db0d90980dad087 |  |



***Body:***

```js        
{
    "aaaa": "Mobile Programming"
}
```



##### II. Example Response: Failed Rename (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Rename (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | BackEnd | The name of the subject that you want to change |



***Body:***

```js        
{
    "name": "BackEndDevelopment"
}
```



##### III. Example Response: Failed Rename (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



##### IV. Example Request: Failed Rename (409)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | BackEnd | The name of the subject that you want to change |



***Body:***

```js        
{
    "name": "BackEndDevelopment"
}
```



##### IV. Example Response: Failed Rename (409)
```js
{
    "status": "error",
    "result": "Unable to rename due to an already existing resource!"
}
```


***Status Code:*** 409

<br>



### 4. Delete Subject



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: localhost:5000/api/subject/:SubjectName
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName |  | The name of the subject that you want to delete |



***More example Requests/Responses:***


##### I. Example Request: Successfull Deletion



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | BackEndDevelopment | The name of the subject that you want to delete |



##### I. Example Response: Successfull Deletion
```js
{
    "status": "success",
    "result": {
        "deletions": 6
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Deletion (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | BackEnd | The name of the subject that you want to change |



##### II. Example Response: Failed Deletion (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



## Questions' Category



### 1. List all Categories of a Subject



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/subject/:SubjectName/category
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName |  | The name of the subject you want to list categories |



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject you want to list categories |



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": [
        {
            "_id": "PHP",
            "count": 3
        },
        {
            "_id": "JS",
            "count": 2
        }
    ]
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Listing (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Studies | The name of the subject you want to list categories |



##### II. Example Response: Failed Listing (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



### 2. List Questions by Subject and Category



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/subject/:SubjectName/category/:CategoryName
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject of the questions you want to list |
| CategoryName | Haskell | The name of the category of the questions you want to list |



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject of the questions you want to list |
| CategoryName | PHP | The name of the category of the questions you want to list |



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": [
        {
            "_id": "60fed9ec1db0d90980dad073",
            "title": "Is PHP a nice language?",
            "answerTypology": "multi"
        }
    ]
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Listing (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName |  | The name of the subject of the questions you want to list |
| CategoryName |  | The name of the category of the questions you want to list |



##### II. Example Response: Failed Listing (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



### 3. Rename Subject's Category



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: localhost:5000/api/subject/:SubjectName/category/:CategoryName
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName |  | The name of the subject that you want to change |
| CategoryName |  | The name of the category that you want to change |



***Body:***

```js        
{
    "name": "NewName"
}
```



***More example Requests/Responses:***


##### I. Example Request: Successful Rename



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject that you want to change |
| CategoryName | JS | The name of the category that you want to change |



***Body:***

```js        
{
    "name": "JavaScript"
}
```



##### I. Example Response: Successful Rename
```js
{
    "status": "success",
    "result": {
        "updates": 12
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Rename (400)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject that you want to change |
| CategoryName | JS | The name of the category that you want to change |
| QuestionID | 60fee5b01db0d90980dad087 |  |



***Body:***

```js        
{
    "aaaa": "PHP"
}
```



##### II. Example Response: Failed Rename (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Rename (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Wev Pvogranning | The name of the subject that you want to change |
| CategoryName | PHA | The name of the category that you want to change |



***Body:***

```js        
{
    "name": "PHP HyperText Processor"
}
```



##### III. Example Response: Failed Rename (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



##### IV. Example Request: Failed Rename (409)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject that you want to change |
| CategoryName | PHP | The name of the category that you want to change |



***Body:***

```js        
{
    "name": "PHP HyperText Processor"
}
```



##### IV. Example Response: Failed Rename (409)
```js
{
    "status": "error",
    "result": "Unable to rename due to an already existing resource!"
}
```


***Status Code:*** 404

<br>



### 4. Delete Category



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: localhost:5000/api/subject/:SubjectName/category/:CategoryName
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName |  | The name of the subject that you want to change |
| CategoryName |  | The name of the category that you want to delete |



***More example Requests/Responses:***


##### I. Example Request: Successfull Deletion



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming | The name of the subject that you want to change |
| CategoryName | PHP | The name of the category that you want to delete |



##### I. Example Response: Successfull Deletion
```js
{
    "status": "success",
    "result": {
        "deletions": 1
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Deletion (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Wev Pvogranning | The name of the subject that you want to change |
| CategoryName | TS | The name of the category that you want to delete |



##### II. Example Response: Failed Deletion (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



## Exams



### 1. List all past Exams



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/exam/history
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": [
        {
            "_id": "60feb06f6d13712808909bf4",
            "subject": "BackEnd",
            "date": "2021-07-26T00:00:00.000Z",
            "title": "Compito 1"
        },
        {
            "_id": "60feedeeb4464105a014b628",
            "subject": "Mobile Programming",
            "date": "2021-07-26T00:00:00.000Z",
            "title": "Compito A"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 2. List all past Exams by Subject



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/exam/history/:SubjectName
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName |  | The name of the subject we are looking for |



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| SubjectName | Web Programming |  |



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": [
        {
            "_id": "60feedeeb4464105a014b628",
            "date": "2021-07-26T00:00:00.000Z",
            "title": "Compito A"
        }
    ]
}
```


***Status Code:*** 200

<br>



### 3. List full details of a Exam



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/exam/:ExamID
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID |  | The ID of the exam you want to explore |



***More example Requests/Responses:***


##### I. Example Request: Successfull Listing



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 60feedeeb4464105a014b628 | The ID of the exam you want to explore |



##### I. Example Response: Successfull Listing
```js
{
    "status": "success",
    "result": {
        "_id": "60fee0251db0d90980dad080",
        "subject": "Mobile Programming",
        "category": "Android",
        "title": "Which state is called once on a view life-cycle?",
        "answerTypology": "multi",
        "answers": [
            {
                "text": "onStop"
            },
            {
                "text": "onPause"
            },
            {
                "text": "onResume"
            },
            {
                "text": "onCreate"
            }
        ],
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Listing (400)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 12345 | The ID of the exam you want to explore |



##### II. Example Response: Failed Listing (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Listing (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 60feedeeb4464105a014b629 | The ID of the exam you want to explore |



##### III. Example Response: Failed Listing (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



### 4. Generate PDF of a past Exam



***Endpoint:***

```bash
Method: GET
Type: 
URL: localhost:5000/api/exam/:ExamID/file
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID |  | The ID of the exam you want to explore |



***More example Requests/Responses:***


##### I. Example Request: Successfull Generation



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 60feedeeb4464105a014b628 | The ID of the exam you want to explore |



##### I. Example Response: Successfull Generation
```js
PDF File
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Generation (400)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 12345 | The ID of the exam you want to explore |



##### II. Example Response: Failed Generation (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Generation (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 60feedeeb4464105a014b629 | The ID of the exam you want to explore |



##### III. Example Response: Failed Generation (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



##### IV. Example Request: Failed Generation  (500)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 60feedeeb4464105a014b628 | The ID of the exam you want to explore |



##### IV. Example Response: Failed Generation  (500)
```js
{
    "status": "error",
    "result": "Unable to process the pdf generation, server issue!"
}
```


***Status Code:*** 500

<br>



### 5. Generate a new Exam



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: localhost:5000/api/exam/generate
```



***Body:***

```js        
{
  "subject": "The name of the related subject. It should be one of the available ones.",
  "title": "A friendly and short title",
  "questions": [
    {
      "category": "The name of the related question pool collection. It should be one of the available ones.",
      "overallQta": "The overall quantity of questions that will be put inside the exam.",
      "multiQta": "The quantity of multi answer questions that will be selected. If -1 is set, overallQta will be a mix of the two types of questions, if a number is set, there will be add the exact number of multi answer questions and the rest will be open answers."
    },
    ...
  ]
}
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Generation


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



##### I. Example Response: Successfull Generation
```js
PDF File
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Generation (400)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



##### II. Example Response: Failed Generation (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Generation  (404)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



##### III. Example Response: Failed Generation  (404)
```js
{
    "status": "error",
    "result": "Your creation set is not possible with the current question database!"
}
```


***Status Code:*** 500

<br>



##### IV. Example Request: Failed Generation  (500)


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



##### IV. Example Response: Failed Generation  (500)
```js
{
    "status": "error",
    "result": "Unable to process the pdf generation, server issue!"
}
```


***Status Code:*** 500

<br>



### 6. Delete a Exam



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: localhost:5000/api/exam/:ExamID
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID |  | The ID of the exam you want to delete |



***More example Requests/Responses:***


##### I. Example Request: Successfull Deletion



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 60feedeeb4464105a014b628 | The ID of the exam you want to delete |



##### I. Example Response: Successfull Deletion
```js
{
  "status": "success",
  "result": {
    "_id": "60feedeeb4464105a014b628",
    "subject": "Mobile Programming",
    "date": "2021-07-26T00:00:00.000Z",
    "title": "Compito A",
    "questions": [
      {
        "_id": "60fedfbd1db0d90980dad07e",
        "subject": "Mobile Programming",
        "category": "Kotlin",
        "title": "Is Companion Object a nice feature?",
        "answerTypology": "text",
        "answers": []
      },
      {
        "_id": "60feeda1b4464105a014b61e",
        "subject": "Mobile Programming",
        "category": "Kotlin",
        "title": "Is Kotlin the same as Java?",
        "answerTypology": "text",
        "answers": []
      },
      {
        "_id": "60feed68b4464105a014b61c",
        "subject": "Mobile Programming",
        "category": "Android",
        "title": "Which state is called every time the view is displayed?",
        "optionalSubContent": "Remember the state switching of android applications!",
        "answerTypology": "text",
        "answers": []
      },
      {
        "_id": "60fee0251db0d90980dad080",
        "subject": "Mobile Programming",
        "category": "Android",
        "title": "Which state is called once on a view life-cycle?",
        "answerTypology": "multi",
        "answers": [
          {
            "text": "onStop"
          },
          {
            "text": "onPause"
          },
          {
            "text": "onResume"
          },
          {
            "text": "onCreate"
          }
        ]
      }
    ],
    "__v": 0
  }
}
```


***Status Code:*** 200

<br>



##### II. Example Request: Failed Deletion (400)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 12345 | The ID of the exam you want to delete |



##### II. Example Response: Failed Deletion (400)
```js
{
    "status": "error",
    "result": "Invalid request's parameters!"
}
```


***Status Code:*** 400

<br>



##### III. Example Request: Failed Deletion (404)



***Query:***

| Key | Value | Description |
| --- | ------|-------------|
| ExamID | 60feedeeb4464105a014b629 | The ID of the exam you want to delete |



##### III. Example Response: Failed Deletion (404)
```js
{
    "status": "error",
    "result": "Unknown resource"
}
```


***Status Code:*** 404

<br>



### 7. Delete all Exams



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: localhost:5000/api/exam/all
```



***More example Requests/Responses:***


##### I. Example Request: Successfull Deletion



##### I. Example Response: Successfull Deletion
```js
{
    "status": "success",
    "result": {
        "deletions": 52
    }
}
```


***Status Code:*** 200

<br>



---
[Back to top](#examgen)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-08-03 13:55:58 by [docgen](https://github.com/thedevsaddam/docgen)
