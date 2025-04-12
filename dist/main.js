"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const helmet_1 = require("helmet");
const nestjs_pino_1 = require("nestjs-pino");
const exception_filters_1 = require("./core/filters/exception-filters");
const all_exception_filters_1 = require("./core/filters/all-exception-filters");
async function bootstrap() {
    process.on('uncaughtException', (err) => {
        console.error('Uncaught Exception:', err);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const API_DEFAULT_PORT = Number(process.env.PORT ?? 3000);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('RyPay')
        .setDescription('RyPay Endpoints')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, stopAtFirstError: true }));
    app.useGlobalFilters(new exception_filters_1.ValidationExceptionFilter(), new all_exception_filters_1.AllExceptionsFilter());
    app.enableCors();
    app.use((0, express_1.json)({ limit: '50mb' }));
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use((0, helmet_1.default)());
    const logger = app.get(nestjs_pino_1.Logger);
    app.useLogger(logger);
    await app.listen(API_DEFAULT_PORT).then(() => {
        logger.log('server started');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map