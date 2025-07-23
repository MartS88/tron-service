// src/tron/tron.controller.ts

// Nest js
import {Controller, Get} from '@nestjs/common';

// Routes
import {TRON} from "src/tron/tron.routes";
import {TronService} from "src/tron/tron.service";
import {Sequelize} from "sequelize-typescript";

@Controller(TRON.CONTROLLER)
export class TronController {
    // private readonly COOKIE_MAX_AGE: number;

    constructor(
        private readonly tronService: TronService,
    ) {
        // this.COOKIE_MAX_AGE = Number(this.configService.get('COOKIE_MAX_AGE'));
    }

    @Get(TRON.ROUTES.CREATE_WALLET)
    async generateWallet() {
        await this.tronService.generateTronWallet()
    }

}
