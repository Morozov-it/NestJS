import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";

//точка входа и запуск приложения
async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    //настройка swagger (документация по REST API)
    const config = new DocumentBuilder()
        .setTitle('Advanced backend, NestJS')
        .setDescription('Documentation REST API')
        .setVersion('1.0')
        .addTag('Morozov-it')
        .build();
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    //использовать middleware для всех endpoints
    //app.useGlobalGuards(JwtAuthGuard)

    //использовать глобально валидатор
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
}
start()