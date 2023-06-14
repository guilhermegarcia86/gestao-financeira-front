import axios, { AxiosResponse } from 'axios';
import { CountriesResponse } from '../types/countries-response';
import { Country } from '../types/Country';
import { Budget } from '../types/budget';

export const fetchBudgets = async (): Promise<Budget[]> => {
    const { data } = await axios.get('http://localhost:8080/budgets')

    return data;
}

export const fetchCountries = async (
    nameFilter: string,
    independentFilter: string,
    page: number,
    limit: number
): Promise<CountriesResponse> => {
    try {
        const independent = independentFilter === 'true' || independentFilter === '' ? true : false
        const queryParams = getCountryQueryParams(nameFilter, independent, page, limit);
        const response: AxiosResponse<Country[]> = await axios.get(`http://localhost:8080/countries${queryParams}`);
        const { data, headers } = response;
        const totalCountHeader = headers['x-total-count'];
        const totalCount = parseInt(totalCountHeader, 10);
        return {
            data,
            totalCount
        };
    } catch (error) {
        console.error('Error fetching countries:', error);
        return {} as CountriesResponse;
    }
};

const getCountryQueryParams = (
    nameFilter: string,
    independentFilter: boolean | null,
    page: number,
    limit: number
): string => {
    const queryParams = [];

    if (nameFilter) {
        queryParams.push(`name.common=${encodeURIComponent(nameFilter)}`);
    }

    if (independentFilter !== null) {
        queryParams.push(`independent=${independentFilter}`);
    }

    queryParams.push(`_page=${page}`);
    queryParams.push(`_limit=${limit}`);

    return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
};

export const editCountry = async (id: number, country: Country) => {
    await axios.put(`http://localhost:8080/countries/${id}`, country);
};

export const deleteCountry = async (id: number) => {
    await axios.delete(`http://localhost:8080/countries/${id}`);
};