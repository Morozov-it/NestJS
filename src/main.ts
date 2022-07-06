import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";


//точка входа и запуск приложения
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}
start()