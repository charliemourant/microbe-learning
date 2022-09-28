import fetch from 'jest-fetch-mock';
import { getData, postData, patchData, putData, deleteData, handleResponse } from '../../src/utils/request';
import { mockData } from '../../__mocks__/mockData';

describe('Expect api service', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('to handle getData', async () => {
        fetch.mockResponse(JSON.stringify(mockData));
        const res = await getData('/data');

        expect(res).toEqual(mockData);
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it('to handle postData', async () => {
        fetch.mockResponse(JSON.stringify(mockData));
        const res = await postData('/data', mockData);

        expect(res).toEqual(mockData);
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it('to handle patchData', async () => {
        fetch.mockResponse(JSON.stringify(mockData));
        const res = await patchData('/data/id', mockData);

        expect(res).toEqual(mockData);
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it('to handle putData', async () => {
        fetch.mockResponse(JSON.stringify(mockData));
        const res = await putData('/data/id', mockData);

        expect(res).toEqual(mockData);
        expect(fetch.mock.calls.length).toEqual(1);
    });
    it('to handle deleteData', async () => {
        fetch.mockResponse(JSON.stringify(mockData));
        const res = await deleteData('/data/id');

        expect(res).toEqual(mockData);
        expect(fetch.mock.calls.length).toEqual(1);
    });

    it('to process a successful OK status', async () => {
        fetch.mockResponse(JSON.stringify('response'));
        const res = await fetch('/data').then(handleResponse);
        expect(res).toStrictEqual('response');
    });

    it('to throw on a non OK response', async () => {
        fetch.mockReject(new Error('foo'));
        try {
            await fetch('/data').then(handleResponse);
        } catch (error) {
            expect(error.message).toBe('foo');
        }
    });
});
