export interface TronBlock {
    blockID: string;
    block_header: {
        raw_data: {
            number: number;
            timestamp: number;
            [key: string]: any;
        };
        [key: string]: any;
    };
    [key: string]: any;
}
