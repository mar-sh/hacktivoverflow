# hacktivoverflow

## endpoints
---
### Entry
---
POST /register (user register)
```
req: {
  body: {
    username: String,
    email: String,
    password: String,
  }
}

success: 
res: {
  status: 201,
  accessToken: jwt,
  currentUser: {
    userId: ObjectId,
    email: user email,
    username: username
  }
}

error:
res: {
  status: 400,
  message: Validation Errors
}
```
POST /login (user login)
```
req: {
  body: {
    email: String,
    password: String,
  }
}

success: 
res: {
  status: 201,
  accessToken: jwt,
  currentUser: {
    userId: ObjectId,
    email: user email,
    username: username
  }
}

error:
res: {
  status: 400,
  message: Wrong username/password
}

```
---
### Questions
---

POST /questions (Create a new question)
```
req: {
  body: {
    title: String,
    tags: Array of String,
    body: String,
  },
  headers: {
    Authorization: accessToken(jwt)
  }
}

res: {
  status: 201
  question: {
      _id: ObjectId,
      slug : String,
      votes : 0,
      answers : [],
      upvotes : [],
      downvotes : [],
      tags : [],
      editable : true,
      userId : ObjectId,
      title : String,
      body : String(html),
      createdAt : ISODate,
      updatedAt : ISODate,
    }
}
```

GET /questions (Get full list of questions)
```
req: {}

res: {
  status: 200
  questions: [
    question: {
      _id: ObjectId,
      slug : String,
      votes : 0,
      answers : [],
      upvotes : [],
      downvotes : [],
      tags : [],
      editable : true,
      userId : ObjectId,
      title : String,
      body : String(html),
      createdAt : ISODate,
      updatedAt : ISODate,
    },

    question: {
      _id: ObjectId,
      slug : String,
      votes : 0,
      answers : [],
      upvotes : [],
      downvotes : [],
      tags : [],
      editable : true,
      userId : ObjectId,
      title : String,
      body : String(html),
      createdAt : ISODate,
      updatedAt : ISODate,
    },
    ...
  ]
}
```
GET /questions/users (Get list of user's questions)
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  },
  res: {
  status: 200
  questions: [
    question: {
      _id: ObjectId,
      slug : String,
      votes : 0,
      answers : [],
      upvotes : [],
      downvotes : [],
      tags : [],
      editable : true,
      userId : ObjectId,
      title : String,
      body : String(html),
      createdAt : ISODate,
      updatedAt : ISODate,
    },

    question: {
      _id: ObjectId,
      slug : String,
      votes : 0,
      answers : [],
      upvotes : [],
      downvotes : [],
      tags : [],
      editable : true,
      userId : ObjectId,
      title : String,
      body : String(html),
      createdAt : ISODate,
      updatedAt : ISODate,
    },
    ...
  ]
}
```
GET /questions/:id (get a question by id)
```
req: {}

res: {
  status: 200
  question: {
      _id: ObjectId,
      slug : String,
      votes : 0,
      answers : [{}],
      upvotes : [],
      downvotes : [],
      tags : [],
      editable : true,
      userId : ObjectId,
      title : String,
      body : String(html),
      createdAt : ISODate,
      updatedAt : ISODate,
    }
}

```
PUT /questions/:id (edit question) 
```
req: {
  body: {
    title: String,
    tags: Array of String,
    body: String,
  },
  headers: {
    Authorization: accessToken(jwt)
  }
}

res: {
  status: 201
  updated: {
      _id: ObjectId,
      slug : String,
      votes : 0,
      answers : [
      {
        _id : ObjectId,
        votes : 0,
        upvotes : [],
        downvotes : [],
        editable : true,
        userId : ObjectId,
        threadId : ObjectId,
        body : String,
        createdAt : ISODate,
        updatedAt : ISODate,
        ...
        }
      ]
      upvotes : [],
      downvotes : [],
      tags : [],
      editable : true,
      userId : ObjectId,
      title : String,
      body : String(html),
      createdAt : ISODate,
      updatedAt : ISODate,
    }
}
```
PATCH /questions/:id (remove a question by modifying its editable status to false(not delete))
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  }
}

res: {
  status: 201
  question: {
      _id: ObjectId,
      slug : String,
      votes : votes,
      answers : [
        {
          _id : ObjectId,
          votes : 0,
          upvotes : [],
          downvotes : [],
          editable : true,
          userId : ObjectId,
          threadId : ObjectId,
          body : String,
          createdAt : ISODate,
          updatedAt : ISODate,
          ...
        }
      ],
      upvotes : [],
      downvotes : [],
      tags : [],
      editable : false,
      userId : ObjectId,
      title : Removed,
      body : This post was removed,
      createdAt : ISODate,
      updatedAt : ISODate,
    }
}
```
DELETE /questions/:id (delete a question)
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  }
}

res: {}

```
---
### Answer
---
POST /answers (Create an answer for a question)
```
req: {
  headers: {
    body: String,
    Authorization: accessToken(jwt)
  }
},

res: {
  status: 201
  answer: {
    _id : ObjectId,
    votes : 0,
    upvotes : [],
    downvotes : [],
    editable : true,
    userId : ObjectId,
    threadId : ObjectId,
    body : String,
    createdAt : ISODate,
    updatedAt : ISODate,
  }
    
}
```
PUT /answers/:id (edit answer)
```
req: {
  headers: {
    body: String,
    Authorization: accessToken(jwt)
  }
},

res: {
  status: 200
  answer: {
    _id : ObjectId,
    votes : 0,
    upvotes : [],
    downvotes : [],
    editable : true,
    userId : ObjectId,
    threadId : ObjectId,
    body : String,
    createdAt : ISODate,
    updatedAt : ISODate,
  }
    
}
```
---
### Action
---
GET /tags (get all tags) 

```
req: {}

res: {
  tags: Array of String,
}
```

POST actions/upload (upload image wysiwyg)
``` 
req: {
    file: type image, base64
  }
}
res: {
  location: url to cloud bucket
}
```

GET /actions/user/tags (Get authenticated user watched tags)
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  }
}

res: {
  tags: Array of string
}
```
POST /actions/add/tags
```
req: {
  tag: String
  headers: Authorization,
}
res: {
  watchedTags: Array og string
}
```
DELETE /actions/remove/tags
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  }
}

res: {
  watchedTags: modified
}
```
PATCH /actions/upvote/question/:questionId
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  }
}
res: {
  question:{
    modified votes
  }
}
```
PATCH /actions/downvote/question/:questionId
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  }
}
res: {
  question:{
    modified votes
  }
}
```
PATCH /actions/upvote/answer/:answerId
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  }
}
res: {
  answer:{
    modified votes
  }
}
```
PATCH /actions/upvote/answer/:answerId
```
req: {
  headers: {
    Authorization: accessToken(jwt)
  }
}
res: {
  answer:{
    modified votes
  }
}
```
