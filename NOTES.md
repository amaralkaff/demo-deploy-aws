# Catatan Week 1

> Tuliskan apapun yang kalian pelajari pada phase 2 week-1 di file ini.
>
> "Pemahaman yang baik berasal dari keinginan untuk terus belajar, dan catatan adalah langkah pertama menuju pengetahuan yang dalam."

<h1> Hanya Catatan</h1>
npm init -y
buat app.js
npm i imagekit express pg sequelize multer jsonwebtoken bcryptjs 
npm i -D nodemon sequelize-cli jest supertest dotenv
npx sequelize init
config test dan development
- add logging: false
package.json 
- (script "test": "jest --forceExit --detectOpenHandles -testTimeout=1000 --verbose")  
- untuk development ("db:dev": "sequelize-cli db:drop && sequelize-cli db:create && sequelize-cli db:seed:all") 
- untuk test ("db:test": "sequelize-cli --env=test db:drop && sequelize-cli --env=test db:create && sequelize-cli db:seed:all")
Contoh pembuatan
- Crendential 
--attributes
email: string, unique, required
password: string, min5, max16, required

- post 
--attributes
name: string
description: string
imageUrl: string
CredentialId: number

check migrasi untuk menambahkan reference

buat validasi di model 


buat untuk menghide password menggunakan bcrypt dan jwt di helpers
- buat require bcrypt, jwt dan SECRET_KEY
// bcrypt
createHash hashSync
compareHash compareSync
// jwt
(payload) sign
(token) verify
setelah itu exports

setelah itu mulai hooks di models
beforeCreate

langsung buat untuk route dan controllernya di app
- import
- variable
- middleware
- routing
- errHandler
- listener
req, res, next

mulai membuat controller di app
dan jangan lupa kalau ada validasi diisi

buat semua endpoint 

require multer dan buat POST /upload log req.file, req.body, req.file.originalname base64File 
mulai membuat authentication (authorization tempat membuat logicnya)