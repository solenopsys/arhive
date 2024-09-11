import {ItemsConvertor} from './items-convertor';

describe('ItemsConvertor', () => {
    it('should create an instance', () => {
        expect(new ItemsConvertor()).toBeTruthy();
    });

    it('correct conversion', () => {
        const data = {
            results: [{
                uid: '0x299e6',
                resources: [
                    {uid: '0x9c58', 'rom.resource': 'garage frame'},
                    {uid: '0x3f804', 'rom.resource': 'Тест ресурс'},
                    {uid: '0x3f805', 'rom.resource': 'тест ресурс 2'},
                    {uid: '0x3f80f', 'rom.resource': 'тест ресурс 4'},
                    {uid: '0x3f80a', 'rom.resource': 'sdfsd'}],
                processes: [
                    {uid: '0x15f92', 'rom.process': 'Список поставщиков'},
                    {uid: '0x3f7f2', 'rom.process': 'запуск печати'},
                    {uid: '0x3f7f3', 'rom.process': 'сборка мотора'},
                    {uid: '0x3f7f4', 'rom.process': 'тестовый процесс'},
                    {
                        uid: '0x3f7f5', 'rom.process': 'bla bla',
                        inResources: [{uid: '0x3f80f', 'inResources|count': 2}],
                        outResources: [{uid: '0x3f80a', 'outResources|count': 3}]
                    },
                    {uid: '0x3f7f6', 'rom.process': 'bla bla2'},
                    {uid: '0x3f7f8', 'rom.process': 'bla bla333'},
                    {uid: '0x3f7f9', 'rom.process': 'dsfdsdsdfsd'}
                ]
            }]
        };
        const conv = new ItemsConvertor();
        const res = conv.fromServerConvert(data);

        expect(res.processes.length).toEqual(8);
        expect(res.processes[4].out[0].count).toEqual(3);
        expect(res.processes[4].in[0].count).toEqual(2);


        expect(res.resources.length).toEqual(5);

        expect(res.resources[3].out[0].count).toEqual(2);
        expect(res.resources[4].in[0].count).toEqual(3);
    });
});
