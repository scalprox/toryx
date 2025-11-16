import {defaultToryxConfig} from "../defaults/configs";

/**
 *  Main class of Toryx
 *  @internal
 */
class Toryx {
    private config: ToryxConfig;

    constructor() {
        this.config = defaultToryxConfig;
    }

    configure(config?: Partial<ToryxConfig>):void {
        this.config = {...this.config, ...config};
    }

    getConfig(): ToryxConfig {
        return this.config;
    }

    isDetailedLogsEnabled(){
        return this.config.detailedLogs
    }

    resetConfig(){
        this.config = defaultToryxConfig;
    }
}

const toryx = new Toryx();
export default toryx;