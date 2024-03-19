"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dataSource_config_1 = require("./dataSource.config");
const datasource = new typeorm_1.DataSource((0, dataSource_config_1.getConfig)());
datasource.initialize();
exports.default = datasource;
//# sourceMappingURL=migration.config.js.map