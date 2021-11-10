import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { string, func } from 'prop-types';
export const useProductShortDescription = props => {
    const { url_key, getProductShortDescription } = props;
    const { error, loading, data } = useQuery(getProductShortDescription, {
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first',
        variables: {
            urlKey: url_key
        }
    });
    const shortDescription = useMemo(() => {
        if (!data || !data.products || !data.products.items) {
            return null;
        }
        const product = data.products.items.find(
            item => item.url_key === url_key
        );
        if (!product) {
            return null;
        }
        return product.short_description.html;
    }, [data, url_key]);
    return {
        data,
        shortDescription,
        error,
        loading
    };
};
useProductShortDescription.propTypes = {
    url_key: string.isRequired,
    getProductShortDescription: func.isRequired
};
