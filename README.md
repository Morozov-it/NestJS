### npm
npm install --save @nestjs/sequelize sequelize sequelize-typescript
npm install --save-dev @types/sequelize
npm install --save pg pg-hstore
npm i @nestjs/config
npm i @nestjs/swagger swagger-ui-express
npm i @nestjs/jwt bcryptjs
npm i class-validator class-transformer

# nest generate
Для запуска nest generate:
    -запустить в cmd (от имени администратора);
    -команда powershell;
    -команда Set-ExecutionPolicy RemoteSigned.

#docker
Для запуска контейнера:
    - изменить в файле .development.env POSTGRES_HOST=postgres
    - docker-compose build
    - docker-compose up