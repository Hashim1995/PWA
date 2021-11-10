// file: src/components/ProductShortDescription/productShortDescription.gql.js
import { gql } from '@apollo/client';
export const GET_PRODUCT_SHORT_DESCRIPTION = gql`
    query getProductShortDescription($urlKey: String!) {
        products(filter: { url_key: { eq: $urlKey } }) {
            items {
                id
                url_key
                short_description {
                    html
                }
            }
        }
    }
`;
