import camelcaseKeys from 'camelcase-keys';

export const convertToCamelCase = (data: any) => {
    return camelcaseKeys(data, {deep: true});
}