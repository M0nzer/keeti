

# Keeti Server 

## about 
Server For Keeti Built By Monzer Omer (Node.js Back-end Developer) Currently I have about one year experience with node.js and about two with JavaScript 


> **Notes That I'm Responsible For Any Treads In This Server.** 
> **The Security Level In This Server Is 0%.**


**Connect With Me:**

**Social Media :**
@monzersmiledev

**Phone Number:**
+249121601505

**Email:**
nezonru87@yahoo.com


## Documentation

## 1. Authentication Router
**GET   `/keeti/auth?username=&password=&token=`**

Queries:

> `username` (phone number)
> 
>  `password`
>  
>   `token` (a valid token)

## 2. Select Where Router
**GET `/keeti/sw?que=&field[]='phone+='&value[]=&token=`**

Queries:

>   `token` (a valid token)
>   
>   `field` **MUST** be an `array`  Also you **MUST** but the SQL operator with the field e.g: ` ['name = ']`

**Note:**
You can do the same thing in the values
>   
>   `value` **MUST** be an `array`
>   
>   `que` which is the first part of the query e.g: `SELECT * FROM SET_users` the rest of the query build using the fields and values you sent to the server

 - the server loop in the arrays to build the query 

## 3. Insert Into Router

**POST `/keeti/is?que=&value[]=&token=`**
Queries:

>   `token` (a valid token)
>   
>   `value` **MUST** be an `array`  Also you **MUST** but the SQL operator with the field
>   
>   `que` which is the first part of the query e.g: `INSERT INTO SET_users (id , name)` the rest of the query build using the fields and values you sent to the server
 - the server loop in the arrays to build the query 

## 4. Delete Router

**DELETE `/keeti/dq?que=&field[]='phone+='&value[]=&token=`**

Queries:

>   `token` (a valid token)
>   
>   `field` **MUST** be an `array`  Also you **MUST** but the SQL operator with the field
>
>   `value` **MUST** be an `array`  Also you **MUST** but the SQL operator with the field
>   
>   `que` which is the first part of the query e.g: `DELETE FROM SET_users` the rest of the query build using the fields and values you sent to the server

 - the server loop in the arrays to build the query 

## 5. Update Router

**PUT `/keeti/uq?que=&field[]='phone+='&value[]=&condf[]=&condv[]=&token=`**

Queries:

>   `token` (a valid token)
>   
>   `field` **MUST** be an `array`  Also you **MUST** but the SQL operator with the field
>
>   `value` **MUST** be an `array`  Also you **MUST** but the SQL operator with the field
>   
>   `que` which is the first part of the query e.g: `UPDATE SET_users SET` the rest of the query build using the fields and values you sent to the server
>
>`condf` condition field  **MUST** be an `array`
>
>`condv` condition value  **MUST** be an `array`

 - the server loop in the arrays to build the query 

## 6.Upload Router

**POST `/keeti/upload?path=&token=`**

Queries:

>   `token` (a valid token)
>
> `path`  **MUST** be one of the next paths

Paths:

 1. `'../keeti/keeti/static/images/'`
 2. `'../keeti/keeti/static/files/'`
 3. `'../keeti/keeti/static/videos/'`

- Those are valid path in the server

## 7. Static Router

**GET `/keeti/Static/filename`**

a *Public Router* available for everyone Don't need Any Authentication to access it allows you to request one of the static files in static directory

