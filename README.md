

// เริ่มต้น
npm init -y 

// ติดตั้ง Express เพื่อจัดการ HTTP Request
npm i express
// lodash เอาไว้ gen ตัว uniq ID
npm i lodash
// cors เพื่อให้ client & server สื่อสารกันได้ cors สามารถ block ไม่ให้ client request มาหา server ได้
npm i cors
// create folder name is routes เพื่อ ทำการ map ระหว่าง URL กับ controllers
// create folder name is controllers เพื่อทำ todolist ต่างๆ


// Typescript
npm i -D typescript @types/express @types/node


// Sequelize like to prisma
npm i sequelize mysql2
npm i sequelize-cli -g
sequelize-cli init:config

// create database
 sequelize-cli db:create


 // create model folder
 sequelize-cli init:models

 // ติดตั้ง bcryptjs passport-jwt jsonwebtoken
 npm i bcryptjs passport-jwt jsonwebtoken


// ช่วยจัดการ env
 npm i dotenv



 // multer ช่วยจัดการไฟล์ รูปภาพ
 npm i multer

 // install path 
 npm i path