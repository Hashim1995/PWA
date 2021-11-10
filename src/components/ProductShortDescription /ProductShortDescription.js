import React, { Fragment } from 'react';
import { useProductShortDescription } from '@theme/talons/ProdutShortDescription/useProductShortDescription';
import { GET_PRODUCT_SHORT_DESCRIPTION } from './productShortDescription.gql';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import RichText from '@magento/venia-ui/lib/components/RichText';
import { string } from 'prop-types';
const ProductShortDescription = props => {
    const { url_key } = props;
    const talonProps = useProductShortDescription({
        url_key,
        getProductShortDescription: GET_PRODUCT_SHORT_DESCRIPTION
    });
    const { error, loading, shortDescription } = talonProps;
    if (error && !shortDescription) {
        return null;
    }
    if (loading) {
        return fullPageLoadingIndicator;
    }
    return (
        <Fragment>
            <RichText content={shortDescription} />
        </Fragment>
    );
};
ProductShortDescription.propTypes = {
    url_key: string.isRequired
};
export default ProductShortDescription;
