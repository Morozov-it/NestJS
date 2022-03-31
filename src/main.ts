import { NestFactory } from "@nestjs/core";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create()

    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))

}
start()